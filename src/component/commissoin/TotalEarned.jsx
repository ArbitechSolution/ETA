import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { contractAddress, contractAddressAbi } from "../utils/contractaddress";
import Table from "react-bootstrap/Table";
import { useTranslation } from "react-i18next";

const TotalEarned = () => {
  const { t, i18n } = useTranslation();
  const [commissionHistory, setCommissionHistory] = useState([
    {
      txid: "0",
      usdtValue: "0",
      usdaceValue: "0",
    },
  ]);
  const [totalCommEarn, setTotalCommEarn] = useState(0);
  const { acc } = useSelector((state) => state.connect);

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
            .totalUSDTCommission(acc)
            .call();
          const commissionHistoryUSACE = await contract.methods
            .totalUSDACECommission(acc)
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
              <div className=" mt-3 mb-3">
                <Table className="table text-center" responsive="sm">
                  <thead>
                    <tr>
                      {/* <th scope="col">{t("address")}</th> */}
                      <th scope="col">{t("USDT")}</th>
                      <th scope="col">{t("USDACE")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commissionHistory.map((data, index) => {
                      return (
                        <tr key={index}>
                          {/* <td>{acc}</td> */}
                          <td>${data.usdtValue}</td>
                          <td>${data.usdaceValue}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalEarned;
