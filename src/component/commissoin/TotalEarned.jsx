import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { contractAddress, contractAddressAbi } from "../utils/contractaddress";

const TotalEarned = () => {
  const [commissionHistory, setCommissionHistory] = useState([
    {
      txid: "0",
      usdtValue: "0",
      usdaceValue: "0",
    },
  ]);
  const [totalCommEarn, setTotalCommEarn] = useState(0);
  const acc = useSelector((state) => state.connect?.connection);

  useEffect(() => {
    const getTotalCommEarn = async () => {
      try {
        const web3 = window.web3;
        if (acc == "No Wallet") {
          console.log("No Wallet");
        } else if (acc == "Wrong Network") {
          console.log("Wrong Wallet");
        } else if (acc == "Connect Wallet") {
          console.log("Connect Wallet");
        } else {
          const contract = new web3.eth.Contract(
            contractAddressAbi,
            contractAddress
          );
          const commissionHistoryUSDT = await contract.methods
            .TotalUSDTEarned(acc)
            .call();
          const commissionHistoryUSACE = await contract.methods
            .TotalUSDACEEarned(acc)
            .call();
          const history = Object.keys(commissionHistory).map((key, index) => ({
            txid: key,
            usdtValue: web3.utils.fromWei(commissionHistoryUSDT, "ether"),
            usdaceValue: web3.utils.fromWei(commissionHistoryUSACE, "ether"),
          }));
          setCommissionHistory(history);
          console.log("Commission history:", history);
        }
      } catch (e) {
        console.log("Error", e);
      }
    };
    getTotalCommEarn();
  }, [acc]);
  return (
    <div>
      <div className="background_Pic mt-2">
        <div className="container">
          <div className="row">
            <div className="col-md-12 table-background">
              <div className="table-responsive mt-3 mb-3">
                <table className="table text-center">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Account</th>
                      <th scope="col">USDT Earned</th>
                      <th scope="col">USDACE Earned</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commissionHistory.map((data, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{acc}</td>
                          <td>${data.usdtValue}</td>
                          <td>${data.usdaceValue}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalEarned;
