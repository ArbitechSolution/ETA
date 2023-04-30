import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { contractAddress, contractAddressAbi } from "../utils/contractaddress";
import { usdtTokenAdd, usdtTokenAbi } from "../utils/contractUsdtToken";
import {
  usdaceTokenAdd,
  usdaceTokenAddAbi,
} from "../utils/contractUsdaceToken";
import { contractTokenAdd, contractTokenAddAbi } from "../utils/contractToken";
import { useTranslation } from "react-i18next";

function CommissionTable() {
  const { t, i18n } = useTranslation();
  const [wHistory, setwHistory] = useState([]);
  const [widthrawData, setWidthrawData] = useState([]);
  const [totalUSDTEarn, setTotalUSDTEarn] = useState(0);
  const [commissionHistory, setCommissionHistory] = useState([]);
  let {acc} = useSelector((state) => state.connect);

  // Total commission EARNED
  const totalCommissionEarn = async () => {
    const web3 = window.web3;
    try {
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
        const commissionHistory = await contract.methods
          .TotalUSDTEarned(acc)
          .call();
        setCommissionHistory(commissionHistory);
        console.log("Commission history:", commissionHistory);
      }
    } catch (e) {
      console.log("Error", e);
    }
  };

  const WithdrawHistory = async () => {
    try {
      if (acc === "No Wallet") {
        console.log("No Wallet");
      } else if (acc === "Wrong Network") {
        console.log("Wrong Wallet");
      } else if (acc === "Connect Wallet") {
        console.log("Connect Wallet");
      } else {
        const web3 = window.web3;
        let contract = new web3.eth.Contract(
          contractAddressAbi,
          contractAddress
        );
        let count = await contract.methods.w_count(acc).call();
        console.log("Count=", count);
        let widthrawDetails= [];

        for (let i = 0; i < count; i++) {
          let obj = {}
          let usdt = await contract.methods
            .withdrawHistoryOfUSDT(acc, i)
            .call();
          console.log("USDT=", usdt);
          let usAce = await contract.methods
            .withdrawHistoryOfUSDACE(acc, i)
            .call();
            let time = await contract.methods
            .withdrawHistoryTime(acc, i)
            .call();
            obj.usdt = Number(web3.utils.fromWei(usdt))
            obj.usAce = Number(web3.utils.fromWei(usAce));
            // obj.date = new Date(time *1000).toLocaleDateString()
            obj.txId = acc;
            widthrawDetails.push(obj)
          }
        setWidthrawData(widthrawDetails);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    WithdrawHistory();
    totalCommissionEarn();
  }, [acc]);
  // const totalEarnedData = totalUSDTEarn.map((item, index) => ({
  //   no: index + 1,
  //   txid: `${acc}`,
  //   type: item.type[index],
  //   amount: item.index,
  // }));
  



  return (
    <div className="background_Pic mt-2">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-4 table-background">
            <div className="text-history mt-2">{t("withdrawHistory")}</div>
            <div className="table-responsive mt-3 mb-3">
              <table className="table text-center  ">
                <thead className="">
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">USDT</th>
                    <th scope="col">USDACE</th>
                    <th scope="col">{t("txid")}</th>
                  </tr>
                </thead>
                <tbody>
                  {widthrawData.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td scope="row">{index+1}</td>
                        <td>${data.usdt}</td>
                        <td>${data.usAce}</td>
                        <td>{data.txId.substring(0, 3) + "..." + data.txId.substring(data.txId.length - 3)}</td>
                        {/* <td>{data.txId}</td> */}
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
  );
}

export default CommissionTable;
