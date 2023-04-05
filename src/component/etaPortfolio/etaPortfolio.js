import React, { useEffect, useState } from "react";
import "./etaPortfolio.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { contractAddress, contractAddressAbi } from "../utils/contractaddress";
import { usdtTokenAdd, usdtTokenAbi } from "../utils/contractUsdtToken";
import {
  usdaceTokenAdd,
  usdaceTokenAddAbi,
} from "../utils/contractUsdaceToken";
import { contractTokenAdd, contractTokenAddAbi } from "../utils/contractToken";
import Web3 from "web3";
const web3Supply = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");
function EtaPortfolio() {
  const [roundNumber, setRoundNumber] = useState(0);
  const [spentUsd, setSpentUsd] = useState(0);
  const [receivedUsdt, setReceivedUsdt] = useState(0);
  let acc = useSelector((state) => state.connect?.connection);
  const usdSpend = async () => {
    const web3 = window.web3;
    try {
      if (acc == "No Wallet") {
        console.log("No Wallet");
      } else if (acc == "Wrong Network") {
        console.log("Wrong Wallet");
      } else if (acc == "Connect Wallet") {
        // toast.info("Connect Wallet");
        console.log("Connect Wallet");
      } else {
        let contract = new web3.eth.Contract(
          contractAddressAbi,
          contractAddress
        );
        let totalUsd = await contract.methods.TotalUSDSpent(acc).call();
        totalUsd = web3.utils.fromWei(totalUsd);
        console.log(totalUsd);
        setSpentUsd(totalUsd);
      }
    } catch (e) {
      console.log("Error While Buying Tokens", e);
    }
  };
  const usdtReceived = async () => {
    const web3 = window.web3;
    try {
      if (acc == "No Wallet") {
        console.log("No Wallet");
      } else if (acc == "Wrong Network") {
        console.log("Wrong Wallet");
      } else if (acc == "Connect Wallet") {
        // toast.info("Connect Wallet");
        console.log("Connect Wallet");
      } else {
        let contract = new web3.eth.Contract(
          contractAddressAbi,
          contractAddress
        );
        let totalusdtReceived = await contract.methods
          .TotalUSDTreceived(acc)
          .call();
        totalusdtReceived = web3.utils.fromWei(totalusdtReceived);
        console.log(totalusdtReceived);
        setReceivedUsdt(totalusdtReceived);
      }
    } catch (e) {
      console.log("Error While Buying Tokens", e);
    }
  };
  const getData = async () => {
    try {
      let contract = new web3Supply.eth.Contract(
        contractAddressAbi,
        contractAddress
      );
      let roundNo = await contract.methods.round().call();

      setRoundNumber(roundNo);
    } catch (e) {
      console.log("Error While Buying Tokens", e);
    }
  };
  useEffect(() => {
    usdSpend();
    usdtReceived();
  }, []);
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-12">
          <div className="ETA_Heading text-center">ETA Portfolio</div>
        </div>
      </div>
      <div className="row d-flex justify-content-between">
        <div className="col-md-3 col-12 table-background mobile-space">
          <div className=" text-ETA text-uppercase text-center p-2">
            My ETA Portfolio
          </div>
        </div>
        <div className="col-md-3 col-12 table-background mobile-space">
          <div className=" text-ETA text-uppercase text-center p-2">
            Current Round: <spam className="text-white">{roundNumber}</spam>
          </div>
        </div>
      </div>
      <div className="row d-flex justify-content-between mt-3">
        <div className="col-md-3 col-12 col-12 table-background mobile-space ">
          <div className=" text-value text-uppercase text-center p-2">
            Total ETA Purchased : 1100
          </div>
        </div>
        <div className="col-md-3 col-12 table-background mobile-space">
          <div className=" text-value text-uppercase text-center p-2">
            Total USD Spent : ${spentUsd}
          </div>
        </div>
        <div className="col-md-3 col-12 table-background mobile-space">
          <div className=" text-value text-uppercase text-center p-2">
            Total USDT Received : ${receivedUsdt}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EtaPortfolio;
