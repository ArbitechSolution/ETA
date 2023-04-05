import React from "react";

const roundData = [
  {
    price: 1.0,
    units: 100,
    totalSpendUsd: 100.0,
    profit: 112.0,
    txid: "546145dasdsa",
  },
  {
    price: 1.0,
    units: 100,
    totalSpendUsd: 100.0,
    profit: 112.0,
    txid: "546145dasdsa",
  },
  {
    price: 1.0,
    units: 100,
    totalSpendUsd: 100.0,
    profit: 112.0,
    txid: "546145dasdsa",
  },
  {
    price: 1.0,
    units: 100,
    totalSpendUsd: 100.0,
    profit: 112.0,
    txid: "546145dasdsa",
  },
  {
    price: 1.0,
    units: 100,
    totalSpendUsd: 100.0,
    profit: 112.0,
    txid: "546145dasdsa",
  },
  {
    price: 1.0,
    units: 100,
    totalSpendUsd: 100.0,
    profit: 112.0,
    txid: "546145dasdsa",
  },
  {
    price: 1.0,
    units: 100,
    totalSpendUsd: 100.0,
    profit: 112.0,
    txid: "546145dasdsa",
  },
  {
    price: 1.0,
    units: 100,
    totalSpendUsd: 100.0,
    profit: 112.0,
    txid: "546145dasdsa",
  },
  {
    price: 1.0,
    units: 100,
    totalSpendUsd: 100.0,
    profit: 112.0,
    txid: "546145dasdsa",
  },
  {
    price: 1.0,
    units: 100,
    totalSpendUsd: 100.0,
    profit: 112.0,
    txid: "546145dasdsa",
  },
  {
    price: 1.0,
    units: 100,
    totalSpendUsd: 100.0,
    profit: 112.0,
    txid: "546145dasdsa",
  },
  {
    price: 1.0,
    units: 100,
    totalSpendUsd: 100.0,
    profit: 112.0,
    txid: "546145dasdsa",
  },
  {
    price: 1.0,
    units: 100,
    totalSpendUsd: 100.0,
    profit: 112.0,
    txid: "546145dasdsa",
  },
  {
    price: 1.0,
    units: 100,
    totalSpendUsd: 100.0,
    profit: 112.0,
    txid: "546145dasdsa",
  },
  {
    price: 1.0,
    units: 100,
    totalSpendUsd: 100.0,
    profit: 112.0,
    txid: "546145dasdsa",
  },
  {
    price: 1.0,
    units: 100,
    totalSpendUsd: 100.0,
    profit: 112.0,
    txid: "546145dasdsa",
  },
  {
    price: 1.0,
    units: 100,
    totalSpendUsd: 100.0,
    profit: 112.0,
    txid: "546145dasdsa",
  },
];
function EtaTable() {
  return (
    <div className="background_Pic mt-3 mb-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12 table-background">
            <div className="text-history mt-2 text-uppercase">Round No 1</div>
            <div className="table-responsive mt-3 mb-3">
              <table className="table text-center  ">
                <thead className="">
                  <tr>
                    <th scope="col">Price</th>
                    <th scope="col">Units</th>
                    <th scope="col">Total USD Spend</th>
                    <th scope="col">Profit</th>
                    <th scope="col">TXID</th>
                  </tr>
                </thead>
                <tbody>
                  {roundData.map((data) => {
                    return (
                      <>
                        <tr>
                          <td scope="row">${data.price}</td>
                          <td>{data.units}</td>
                          <td className=""> ${data.totalSpendUsd}</td>
                          <td> ${data.profit}</td>
                          <td>{data.txid}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12 table-background">
            <div className="text-history mt-2 text-uppercase">Round No 2</div>
            <div className="table-responsive mt-3 mb-3">
              <table className="table text-center  ">
                <thead className="">
                  <tr>
                    <th scope="col">Price</th>
                    <th scope="col">Units</th>
                    <th scope="col">Total USD Spend</th>
                    <th scope="col">Profit</th>
                    <th scope="col">TXID</th>
                  </tr>
                </thead>
                <tbody>
                  {roundData.map((data) => {
                    return (
                      <>
                        <tr>
                          <td scope="row">${data.price}</td>
                          <td>{data.units}</td>
                          <td className=""> ${data.totalSpendUsd}</td>
                          <td> ${data.profit}</td>
                          <td>{data.txid}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12 table-background">
            <div className="text-history mt-2 text-uppercase">Round No 2</div>
            <div className="table-responsive mt-3 mb-3">
              <table className="table text-center  ">
                <thead className="">
                  <tr>
                    <th scope="col">Price</th>
                    <th scope="col">Units</th>
                    <th scope="col">Total USD Spend</th>
                    <th scope="col">Profit</th>
                    <th scope="col">TXID</th>
                  </tr>
                </thead>
                <tbody>
                  {roundData.map((data) => {
                    return (
                      <>
                        <tr>
                          <td scope="row">${data.price}</td>
                          <td>{data.units}</td>
                          <td className=""> ${data.totalSpendUsd}</td>
                          <td> ${data.profit}</td>
                          <td>{data.txid}</td>
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

export default EtaTable;
