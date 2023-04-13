import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { contractAddress, contractAddressAbi } from "../utils/contractaddress";
import { usdtTokenAdd, usdtTokenAbi } from "../utils/contractUsdtToken";
import {
  usdaceTokenAdd,
  usdaceTokenAddAbi,
} from "../utils/contractUsdaceToken";
import { contractTokenAdd, contractTokenAddAbi } from "../utils/contractToken";
function TotalCommission() {
  // const [totalEarn, setTotalEarn] = useState(0);
  const [wHistory, setwHistory] = useState([]);
  let acc = useSelector((state) => state.connect?.connection);
  console.log(acc);

  // const totalCommissionEarn = async () => {
  //   const web3 = window.web3;
  //   try {
  //     if (acc == "No Wallet") {
  //       console.log("No Wallet");
  //     } else if (acc == "Wrong Network") {
  //       console.log("Wrong Wallet");
  //     } else if (acc == "Connect Wallet") {
  //       // toast.info("Connect Wallet");
  //       console.log("Connect Wallet");
  //     } else {
  //       let contract = new web3.eth.Contract(
  //         contractAddressAbi,
  //         contractAddress
  //       );
  //       let totalCommEarn = await contract.methods.totalEarned().call();
  //       setTotalEarn(totalCommEarn);
  //       console.log(totalEarn);
  //     }
  //   } catch (e) {
  //     console.log("Error", e);
  //   }
  // };
  const WithdrawHistory = async () => {
    const web3 = window.web3;
    try {
      if (acc === "No Wallet") {
        console.log("No Wallet");
      } else if (acc === "Wrong Network") {
        console.log("Wrong Wallet");
      } else if (acc === "Connect Wallet") {
        console.log("Connect Wallet");
      } else {
        // setIsLoading(true);
        let contract = new web3.eth.Contract(
          contractAddressAbi,
          contractAddress
        );
        let count = await contract.methods.w_count(acc).call();
        for (let i = 0; i <= count; i++) {
          let usdt = await contract.methods
            .withdrawHistoryOfUSDT(acc, i)
            .call();
          console.log("USDT", usdt[i]);
          let usAce = await contract.methods
            .withdrawHistoryOfUSDACE(acc, i)
            .call();
          console.log("USDACE", usAce[i]);
        }
        // setRefLevel(counts);
        setwHistory(count);
        console.log("History", count);
        // setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
      // setIsLoading(false);
    }
  };
  useEffect(() => {
    // totalCommissionEarn();
    WithdrawHistory();
  }, [acc]);
  return (
    <div className="mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12 box-backgorund">
            <div className="d-flex justify-content-between">
              <div className="p-2 text-unit">Total Commission Earned:</div>
              <div className="p-2 text-value  ">525 USDT</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TotalCommission;
