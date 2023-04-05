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
  const [refLevel, setRefLevel] = useState();

  let acc = useSelector((state) => state.connect?.connection);
  console.log(acc);
  const ReferralLevel = async () => {
    try {
    } catch (e) {}
  };
  useEffect(() => {});

  const data = [
    {
      icon: PolygonIcon,
      level: "Level 1",
      value: 4,
    },
    {
      icon: PolygonIcon,
      level: "Level 2",
      value: 10,
    },
    {
      icon: PolygonIcon,
      level: "Level 3",
      value: 50,
    },
    {
      icon: PolygonIcon,
      level: "Level 4",
      value: 100,
    },
    {
      icon: PolygonIcon,
      level: "Level 5",
      value: 0,
    },
    {
      icon: PolygonIcon,
      level: "Level 6",
      value: 0,
    },
    {
      icon: PolygonIcon,
      level: "Level 7",
      value: 0,
    },
    {
      icon: PolygonIcon,
      level: "Level 8",
      value: 0,
    },
    {
      icon: PolygonIcon,
      level: "Level 9",
      value: 0,
    },
    {
      icon: PolygonIcon,
      level: "Level 10",
      value: 0,
    },
    {
      icon: PolygonIcon,
      level: "Level 11",
      value: 0,
    },
    {
      icon: PolygonIcon,
      level: "Total",
      value: 164,
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
          <div className="col-md-5  ">
            <div className="row ">
              <div className="col-md-12 table-background">
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
                        Withdraw USDT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 table-background mt-4">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Commission;
