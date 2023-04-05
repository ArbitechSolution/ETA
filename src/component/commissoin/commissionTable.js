import React from "react";
import { contractAddress, contractAddressAbi } from "../utils/contractaddress";
import { usdtTokenAdd, usdtTokenAbi } from "../utils/contractUsdtToken";
import {
  usdaceTokenAdd,
  usdaceTokenAddAbi,
} from "../utils/contractUsdaceToken";
import { contractTokenAdd, contractTokenAddAbi } from "../utils/contractToken";
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

const historyData = [
  {
    no: 1,
    txid: "546145dasdsa",
    type: "usdt",
    amount: 800.0,
  },
  {
    no: 2,
    txid: "546145dasdsa",
    type: "usdace",
    amount: 800.0,
  },
  {
    no: 3,
    txid: "546145dasdsa",
    type: "usdt",
    amount: 800.0,
  },
  {
    no: 4,
    txid: "546145dasdsa",
    type: "usdace",
    amount: 800.0,
  },
  {
    no: 5,
    txid: "546145dasdsa",
    type: "usdt",
    amount: 800.0,
  },
  {
    no: 6,
    txid: "546145dasdsa",
    type: "usdt",
    amount: 800.0,
  },
  {
    no: 7,
    txid: "546145dasdsa",
    type: "usdace",
    amount: 800.0,
  },
  {
    no: 8,
    txid: "546145dasdsa",
    type: "usdt",
    amount: 800.0,
  },
  {
    no: 9,
    txid: "546145dasdsa",
    type: "usdace",
    amount: 800.0,
  },
  {
    no: 10,
    txid: "546145dasdsa",
    type: "usdace",
    amount: 800.0,
  },
];

function CommissionTable() {
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
                  {data.map((data) => {
                    return (
                      <>
                        <tr>
                          <td scope="row">{data.no}</td>
                          <td>{data.txid}</td>
                          <td>${data.usdt}</td>
                          <td> ${data.usdace}</td>
                        </tr>
                      </>
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
                  {historyData.map((data) => {
                    return (
                      <>
                        <tr>
                          <td scope="row">{data.no}</td>
                          <td>{data.txid}</td>
                          <td className="text-uppercase">{data.type}</td>
                          <td> ${data.amount}</td>
                        </tr>
                      </>
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
