import React, { useEffect, useState } from "react";
import "./commission.css";
import "../../App.css";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import PolygonIcon from "../../assets/images/Polygon.svg";
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import { useTranslation } from "react-i18next";


import { contractAddress, contractAddressAbi } from "../utils/contractaddress";
import {connectionAction} from "../../Redux/connection/actions"
function Commission() {
  const { t, i18n } = useTranslation();
  const [refLevel, setRefLevel] = useState([]);
  const [commissionInfo, setCommissionInfo] = useState([0, 0]);
  const [isLoading, setIsLoading] = useState(false);

  const {acc} = useSelector((state) => state.connect);
  const dispatch = useDispatch()
  const connectWallet = () => {
      dispatch(connectionAction());
    };
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
        for (let level = 1; level <= 10; level++) {
          let count = await contract.methods.userCount(acc, level).call();
          
          let arr = []
          for(let i = 1; i <= count; i++ ){
            let obj = {}
            let refferralAddress = await contract.methods.userReferral(acc, level, i).call();
            let totalUSDACESpent = await contract.methods.totalUSDACESpent(refferralAddress).call();
            totalUSDACESpent = Number(web3.utils.fromWei(totalUSDACESpent)).toLocaleString()
            let totalUSDTSpent = await contract.methods.totalUSDTSpent(refferralAddress).call();
            totalUSDTSpent = Number(web3.utils.fromWei(totalUSDTSpent)).toLocaleString()

            obj.refferralAddress = refferralAddress;
            obj.totalUSDACESpent = totalUSDACESpent;
            obj.totalUSDTSpent = totalUSDTSpent;
            arr.push(obj)
          }
          counts.push(arr);
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
        let { 0: usdt, 1: usdac } = await contract.methods.TotalClaimed(acc).call();
        let arr = []
        arr.push(Number(web3.utils.fromWei(usdt)).toLocaleString());
        arr.push(Number(web3.utils.fromWei(usdac)).toLocaleString())
        setCommissionInfo(arr)
      }
    } catch (e) {
      console.log(e);
    }
  };

  const userWithdraw = async () => {
    const web3 = window.web3;
    try {
      console.log(commissionInfo[0] === 0);
      if (acc === "No Wallet") {
        console.log("No Wallet");
      } else if (acc === "Wrong Network") {
        console.log("Wrong Wallet");
      } else if (acc === "Connect Wallet") {
        toast.info(t("connectWallet"));
      } else {
        let contract = new web3.eth.Contract(
          contractAddressAbi,
          contractAddress
        );
        let commission;
        if (
          (commissionInfo[0] == 0 ) &&(commissionInfo[1] == 0)) {
          toast.info("Your Commission is 0");
        } else {
          let maxWithdrwa = await contract.methods.maxWithdrwa(acc).call();
          maxWithdrwa = Number(web3.utils.fromWei(maxWithdrwa))
          let { 0: usdt} = await contract.methods.TotalClaimed(acc).call();
          let totalUSDTCommission = await contract.methods.totalUSDTCommission(acc).call();
          totalUSDTCommission = Number(web3.utils.fromWei(totalUSDTCommission))
          let total = totalUSDTCommission + Number(web3.utils.fromWei(usdt))
          if(total <= maxWithdrwa){
            commission = await contract.methods
              .claimedCommission()
              .send({ from: acc });
              commissionDetail()
              connectWallet()
          }else{
            toast.error("your commission limit have exceded")
          }
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


  return (
    <div className="background_Pic mt-5">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="ETA_Heading text-center">{t("commission")}</div>
          <div className="col-md-10 mt-3 ">
            <div className="row d-flex justify-content-center">
              <div className="col-md-12 referral-box  text-center p-2">
                {t("referral")}
              </div>
              {refLevel?.map((level, index) => {
                return (
                  <>
                  <Accordion flush>
      <Accordion.Item eventKey={index}>
        <Accordion.Header className="text-center">{ i18n.language  == "en" ?  `${t("level")} ${index+1}` : `${index+1} ${t("level")}` }</Accordion.Header>
        <Accordion.Body className="">
          <div className="table-reponsive">
        <Table className="table " responsive="sm">
      <thead>
        <tr className="text-center">
          <th>{t("referralAddress")}</th>
          <th>Spend USDT</th>
          <th>Spend REGACE</th>
        </tr>
      </thead>
      <tbody>
      {
        level.length > 0 ? level.map((item)=>{
          return <tr className="text-center">
            <td className="text-dark">{item.refferralAddress}</td>
            <td className="text-dark">{item.totalUSDTSpent}</td>
            <td className="text-dark">{item.totalUSDACESpent}</td>
          </tr>
        })
        :
        <tr>
          <td className="text-dark" colSpan={3}>No Referral Found</td>
        </tr>
      }
      </tbody>
    </Table>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
                  </>
                );
              })}
            </div>
          </div>
          <div className="row d-flex justify-content-center">
          <div className="col-md-10 mt-3">
            <div className="row ">
              <div className="col-md-12 table-background">
                <div className="row d-flex justify-content-center mt-4 mb-4">
                  <div className="col-md-10 col-10 box-backgorund mb-3">
                    <div className="d-flex justify-content-between">
                      <div className="p-2 text-unit">USDT</div>
                      <div className="p-2 text-value  ">
                        {commissionInfo[0]} 
                      </div>
                    </div>
                  </div>
                  <div className="col-md-10 col-10 box-backgorund mb-3">
                    <div className="d-flex justify-content-between">
                      <div className="p-2 text-unit">USDACE</div>
                      <div className="p-2 text-value  ">
                        {commissionInfo[1]} 
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
                        {t("withdrawCommission")}
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
    </div>
  );
}
export default Commission;
