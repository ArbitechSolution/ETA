import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { contractAddress, contractAddressAbi } from "../utils/contractaddress";
import { usdtTokenAdd, usdtTokenAbi } from "../utils/contractUsdtToken";
import {
  usdaceTokenAdd,
  usdaceTokenAddAbi,
} from "../utils/contractUsdaceToken";
import { contractTokenAdd, contractTokenAddAbi } from "../utils/contractToken";

function CommissionTable() {
  const [wHistory, setwHistory] = useState([]);
  const [widthrawData, setWidthrawData] = useState([]);
  const [totalUSDTEarn, setTotalUSDTEarn] = useState(0);
  const [commissionHistory, setCommissionHistory] = useState([]);
  let acc = useSelector((state) => state.connect?.connection);

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
        let count = await contract.methods.w_count(acc).call();
        console.log("Count=", count);
        let widthrawData1 = [];
        let widthrawData2 = [];

        for (let i = 0; i < count; i++) {
          let usdt = await contract.methods
            .withdrawHistoryOfUSDT(acc, i)
            .call();
          console.log("USDT=", usdt);
          let usAce = await contract.methods
            .withdrawHistoryOfUSDACE(acc, i)
            .call();
          console.log("USDAC=", usAce);
          widthrawData1.push({ type: "usdt", ...usdt });
          widthrawData2.push({ type: "usAce", ...usAce });
        }
        let widthrawD = widthrawData1.concat(widthrawData2);
        console.log("WidthrawD", widthrawD);
        // let abc = setWidthrawData(widthrawData1);
        // console.log("abctotal=", abc[0]);
        setWidthrawData(widthrawD, () => {
          console.log("widthrawData=", widthrawData);
        });
        console.log("widthrawData=", widthrawData);
        setwHistory(count);
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
  const historyData = widthrawData.map((item, index) => ({
    no: index + 1,
    txid: `${acc}`,
    type: item.type[index],
    amount: item.index,
  }));

  const data = [
    {
      no: 1,
      txid: "546145dasdsa",
      usdt: 200.0,
      usdace: 800.0,
    },
    {
      no: 2,
      txid: "546145dasdsa",
      usdt: 200.0,
      usdace: 800.0,
    },
    {
      no: 3,
      txid: "546145dasdsa",
      usdt: 200.0,
      usdace: 800.0,
    },
    {
      no: 4,
      txid: "546145dasdsa",
      usdt: 200.0,
      usdace: 800.0,
    },
    {
      no: 5,
      txid: "546145dasdsa",
      usdt: 200.0,
      usdace: 800.0,
    },
    {
      no: 6,
      txid: "546145dasdsa",
      usdt: 200.0,
      usdace: 800.0,
    },
    {
      no: 7,
      txid: "546145dasdsa",
      usdt: 200.0,
      usdace: 800.0,
    },
    {
      no: 8,
      txid: "546145dasdsa",
      usdt: 200.0,
      usdace: 800.0,
    },
    {
      no: 9,
      txid: "546145dasdsa",
      usdt: 200.0,
      usdace: 800.0,
    },
    {
      no: 10,
      txid: "546145dasdsa",
      usdt: 200.0,
      usdace: 800.0,
    },
  ];
  // const historyData = [
  //   {
  //     no: 1,
  //     txid: `${acc}`,
  //     type: "usdt",
  //     amount: `${widthrawData[0]}`,
  //   },
  //   {
  //     no: 2,
  //     txid: "546145dasdsa",
  //     type: "usdace",
  //     amount: 800.0,
  //   },
  //   {
  //     no: 3,
  //     txid: "546145dasdsa",
  //     type: "usdt",
  //     amount: 800.0,
  //   },
  //   {
  //     no: 4,
  //     txid: "546145dasdsa",
  //     type: "usdace",
  //     amount: 800.0,
  //   },
  //   {
  //     no: 5,
  //     txid: "546145dasdsa",
  //     type: "usdt",
  //     amount: 800.0,
  //   },
  //   {
  //     no: 6,
  //     txid: "546145dasdsa",
  //     type: "usdt",
  //     amount: 800.0,
  //   },
  //   {
  //     no: 7,
  //     txid: "546145dasdsa",
  //     type: "usdace",
  //     amount: 800.0,
  //   },
  //   {
  //     no: 8,
  //     txid: "546145dasdsa",
  //     type: "usdt",
  //     amount: 800.0,
  //   },
  //   {
  //     no: 9,
  //     txid: "546145dasdsa",
  //     type: "usdace",
  //     amount: 800.0,
  //   },
  //   {
  //     no: 10,
  //     txid: "546145dasdsa",
  //     type: "usdace",
  //     amount: 800.0,
  //   },
  // ];
  // const historyData = widthrawData.map((item, index) => ({
  //   no: index + 1,
  //   txid: `${acc}`,
  //   type: item.type,
  //   amount: item.widthrawData,
  // }));
  return (
    <div className="background_Pic mt-2">
      <div className="container">
        <div className="row">
          <div className="col-md-12 table-background">
            <div className="table-responsive mt-3 mb-3">
              <table className="table text-center  ">
                <thead className="">
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">TXID</th>
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
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-12 mt-4 table-background">
            <div className="text-history mt-2">Withdrawal History</div>
            <div className="table-responsive mt-3 mb-3">
              <table className="table text-center  ">
                <thead className="">
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">TXID</th>
                    <th scope="col">Type</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {historyData.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td scope="row">{data.no}</td>
                        <td>{data.txid}</td>
                        <td>${data.amount}</td>
                        <td>${data.usdace}</td>
                      </tr>
                    );
                  })}
                  {/* {historyData.map((data, index) => (
                    <tr key={index}>
                      <td>{data.txid}</td>
                      <td className="text-uppercase">{data.type}</td>
                      <td>${data.amount}</td>
                    </tr>
                  ))} */}
                  {/* {historyData.map((item) => (
                    <tr key={item.no}>
                      <td>{item.no}</td>
                      <td>{item.txid}</td>
                      <td>{item.type}</td>
                      <td>{item.amount}</td>
                    </tr>
                  ))} */}
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
