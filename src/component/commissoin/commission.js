import React, { useEffect, useState } from "react";
import "./commission.css";
import "../../App.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import PolygonIcon from "../../assets/images/Polygon.svg";
import { contractAddress, contractAddressAbi } from "../utils/contractaddress";
import { usdtTokenAdd, usdtTokenAbi } from "../utils/contractUsdtToken";
import {
  usdaceTokenAdd,
  usdaceTokenAddAbi,
} from "../utils/contractUsdaceToken";
import { contractTokenAdd, contractTokenAddAbi } from "../utils/contractToken";

function Commission() {
  const [refLevel, setRefLevel] = useState([]);
  const [commissionInfo, setCommissionInfo] = useState([0, 0]);
  const [isLoading, setIsLoading] = useState(false);

  const acc = useSelector((state) => state.connect?.connection);

  const ReferralLevel = async () => {
    const web3 = window.web3;
    try {
      if (acc === "No Wallet") {
        console.log("No Wallet");
      } else if (acc === "Wrong Network") {
        console.log("Wrong Wallet");
      } else if (acc === "Connect Wallet") {
        console.log("Connect Wallet");
      } else {
        setIsLoading(true);
        let contract = new web3.eth.Contract(
          contractAddressAbi,
          contractAddress
        );
        let counts = [];
        for (let level = 1; level <= 11; level++) {
          let count = await contract.methods.userCount(acc, level).call();
          // console.log(typeof level);
          counts.push(count);
        }
        setRefLevel(counts);
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };
  const commissionDetail = async () => {
    const web3 = window.web3;
    try {
      if (acc === "No Wallet") {
        console.log("No Wallet");
      } else if (acc === "Wrong Network") {
        console.log("Wrong Wallet");
      } else if (acc === "Connect Wallet") {
        console.log("Connect Wallet");
      } else {
        let contract = new web3.eth.Contract(
          contractAddressAbi,
          contractAddress
        );
        let commission = await contract.methods.commissionInfo(acc).call();
        console.log(JSON.stringify(commission));
        const usdtCommission = web3.utils.fromWei(
          String(commission.USDT_Commission)
        );
        const usdAceCommission = web3.utils.fromWei(
          String(commission.USDACE_Commission)
        );
        const commissionInfo = [
          String(commission[0]),
          String(commission[1]),
          usdtCommission,
          usdAceCommission,
        ];
        console.log(commissionInfo);
        setCommissionInfo(commission);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const userWithdraw = async () => {
    const web3 = window.web3;
    try {
      if (acc === "No Wallet") {
        console.log("No Wallet");
      } else if (acc === "Wrong Network") {
        console.log("Wrong Wallet");
      } else if (acc === "Connect Wallet") {
        toast.info("Connect wallet");
      } else {
        let contract = new web3.eth.Contract(
          contractAddressAbi,
          contractAddress
        );

        // console.log("Commission", commission);
        let commission;
        if (
          (commissionInfo[0] === "0" || commissionInfo[0] === "NAN") &&
          (commissionInfo[1] === "0" || commissionInfo[1] === "NAN")
        ) {
          toast.info("Your Commission is 0");
        } else {
          commission = await contract.methods
            .claimedCommission()
            .send({ from: acc });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    ReferralLevel();
    commissionDetail();
    // userWithdraw();
  }, [acc]);

  const data = [
    {
      icon: PolygonIcon,
      level: "Level 1",
      value: refLevel[0] || 0,
    },
    {
      icon: PolygonIcon,
      level: "Level 2",
      value: refLevel[1] || 0,
    },
    {
      icon: PolygonIcon,
      level: "Level 3",
      value: refLevel[2] || 0,
    },
    {
      icon: PolygonIcon,
      level: "Level 4",
      value: refLevel[3] || 0,
    },
    {
      icon: PolygonIcon,
      level: "Level 5",
      value: refLevel[4] || 0,
    },
    {
      icon: PolygonIcon,
      level: "Level 6",
      value: refLevel[5] || 0,
    },
    {
      icon: PolygonIcon,
      level: "Level 7",
      value: refLevel[6] || 0,
    },
    {
      icon: PolygonIcon,
      level: "Level 8",
      value: refLevel[7] || 0,
    },
    {
      icon: PolygonIcon,
      level: "Level 9",
      value: refLevel[8] || 0,
    },
    {
      icon: PolygonIcon,
      level: "Level 10",
      value: refLevel[9] || 0,
    },
    {
      icon: PolygonIcon,
      level: "Level 11",
      value: refLevel[10] || 0,
    },
    {
      icon: PolygonIcon,
      level: "Total",
      value: refLevel.reduce((total, count) => total + Number(count), 0),
    },
  ];
  return (
    <div className="background_Pic mt-5">
      <div className="container">
        <div className="row d-flex justify-content-between align-items-center">
          <div className="ETA_Heading text-center">Commission</div>
          <div className="col-md-5 mt-3 ">
            <div className="row d-flex justify-content-between">
              <div className="col-md-12 referral-box text-uppercase text-center p-2">
                referral
              </div>
              {data.map((level) => {
                return (
                  <>
                    <div className="col-md-5 referral-box mt-2">
                      <div className="d-flex justify-content-between align-items-center text-justify">
                        <div className="ms-0 Polygon-icon">
                          <img src={level.icon} className="img-fluid" alt="" />
                        </div>
                        <div className="text-level">{level.level}</div>
                        <div className="text-value">{level.value}</div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="col-md-5 mt-3">
            <div className="row ">
              <div className="col-md-12 table-background">
                <div className="row d-flex justify-content-center mt-4 mb-4">
                  <div className="col-md-10 col-10 box-backgorund mb-3">
                    <div className="d-flex justify-content-between">
                      <div className="p-2 text-unit">Units:</div>
                      <div className="p-2 text-value  ">
                        {commissionInfo[0] / 10 ** 18} USDT
                      </div>
                    </div>
                  </div>
                  <div className="col-md-10 col-10 box-backgorund mb-3">
                    <div className="d-flex justify-content-between">
                      <div className="p-2 text-unit">Units:</div>
                      <div className="p-2 text-value  ">
                        {commissionInfo[1] / 10 ** 18} USDACE
                      </div>
                    </div>
                  </div>
                  <div className="col-md-10 col-10">
                    <div className="d-grid gap-2 mt-3">
                      <button
                        className="btn btn-wallet"
                        type="button"
                        onClick={() => {
                          userWithdraw();
                        }}
                      >
                        Withdraw USDT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="col-md-12 table-background mt-4">
                <div className="row d-flex justify-content-center mt-4 mb-4">
                  <div className="col-md-10 col-10 box-backgorund">
                    <div className="d-flex justify-content-between">
                      <div className="p-2 text-unit">Units:</div>
                      <div className="p-2 text-value  ">525 USDT</div>
                    </div>
                  </div>
                  <div className="col-md-10 col-10">
                    <div className="d-grid gap-2 mt-3">
                      <button className="btn btn-wallet" type="button">
                        Withdraw USDACE
                      </button>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Commission;
