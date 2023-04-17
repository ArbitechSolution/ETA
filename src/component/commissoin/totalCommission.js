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
  const [totalEarn, setTotalEarn] = useState([]);
  let acc = useSelector((state) => state.connect?.connection);
  // console.log(acc);

  const totalCommissionEarn = async () => {
    // const web3 = window.web3;
    // try {
    //   if (acc == "No Wallet") {
    //     console.log("No Wallet");
    //   } else if (acc == "Wrong Network") {
    //     console.log("Wrong Wallet");
    //   } else if (acc == "Connect Wallet") {
    //     console.log("Connect Wallet");
    //   } else {
    //     let contract = new web3.eth.Contract(
    //       contractAddressAbi,
    //       contractAddress
    //     );
    //     let totalCommEarn = await contract.methods.totalEarned(acc).call();
    //     setTotalEarn(totalCommEarn);
    //     console.log("total earned:", totalCommEarn);
    //   }
    // } catch (e) {
    //   console.log("Error", e);
    // }
  };

  // useEffect(() => {
  //   totalCommissionEarn();
  // }, [acc]);
  return (
    <div className="mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12 box-backgorund">
            <div className="d-flex justify-content-center">
              <div className="p-2 text-unit">Total Commission Earned</div>
              {/* <div className="p-2 text-value  ">{totalEarn[0]} USDT</div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TotalCommission;
