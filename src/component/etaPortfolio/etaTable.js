import React, { useState, useRef, useEffect } from "react";
import Pagination from "../../paginations/pagination";
import { useSelector } from "react-redux";
import { contractAddressAbi, contractAddress } from "../utils/contractaddress"
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
  let PageSize = 20;
  const [currentPage, setCurrentPage] = useState(1);
  let shouldLog = useRef(true)
  let currentBlock = 50;
  useEffect(() => {
    if (shouldLog.current) {
      shouldLog.current = false;
      const firstPageIndex = (currentPage - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
    }
  }, [currentPage])
  let { acc, isWalletConnect } = useSelector((state) => state.connect);
  let [totalRound, setTotalRound] = useState(null)
  const getRound = async () => {
    try {
      if (acc != "No Wallet" && acc != "Wrong Network" && acc != "Connect Wallet") {
        const web3 = window.web3;
        const contract = new web3.eth.Contract(contractAddressAbi, contractAddress);
        const round = await contract.methods.round().call()
        setTotalRound(Number(round)+1);
      }
    } catch (error) {
      console.error("error while get round", error);
    }
  }
  useEffect(() => {
    getRound()
  }, [totalRound, isWalletConnect])
  const [roundDetail, setRoundDetail] = useState([])
  let [loadData, setIsLoadData] = useState(true)
  const getRoundDetial = async () => {
    try {
      if (acc != "No Wallet" && acc != "Wrong Network" && acc != "Connect Wallet") {
        setIsLoadData(true)
        const web3 = window.web3;
        const contract = new web3.eth.Contract(contractAddressAbi, contractAddress);
        const countSell = await contract.methods.countSell(acc, currentPage - 1).call();
        let arr = []
        for (let index = 0; index < countSell; index++) {
          let obj = {}
          let userSellToken = await contract.methods.userSellToken(acc, currentPage - 1, index).call()
          if (userSellToken > 0) {
            let userSellPrice = await contract.methods.userSellPrice(acc, currentPage - 1, index).call()
            obj.price = web3.utils.fromWei(userSellPrice);
            obj.unit = web3.utils.fromWei(userSellToken);
            obj.totalSpend = web3.utils.fromWei(userSellPrice) * web3.utils.fromWei(userSellToken);
            obj.txid = acc;
            arr.push(obj)
          }
        }
        setIsLoadData(false)
        setRoundDetail(arr)
      }
    } catch (error) {
      console.error("error while get round detail", error);
    }
  }
  useEffect(() => {
    getRoundDetial()
  }, [isWalletConnect, currentPage])
  return (
    <div className="background_Pic mt-3 mb-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12 table-background">
            <div className="text-history mt-2 text-uppercase">Round No {currentPage}</div>
            <div className="table-responsive mt-3 mb-3">
              <table className="table text-center  ">
                <thead className="">
                  <tr>
                    <th scope="col">Price</th>
                    <th scope="col">ETA Tokens</th>
                    <th scope="col">Total USD Spend</th>
                    <th scope="col">Address</th>
                  </tr>
                </thead>
                {isWalletConnect &&
                  <tbody>
                    {roundDetail.length > 0 ? roundDetail.map((item, index) => {
                      return (
                        <>
                          <tr key={index}>
                            <td scope="row">${item.price}</td>
                            <td>{item.unit}</td>
                            <td className=""> ${Number(item.totalSpend).toLocaleString()}</td>
                            <td>
                              <a style={{ textDecoration: "none" }} target="blank" href={`https://testnet.bscscan.com/address/${item.txid}`}>
                                {item.txid}
                              </a>
                            </td>
                          </tr>
                        </>
                      );
                    })
                      : loadData && isWalletConnect ? <tr>
                        <td colSpan={4}>
                          Loading...
                        </td>
                      </tr>
                        :
                        <tr>
                          <td colSpan={4}>
                            No detail in this round
                          </td>
                        </tr>
                    }
                  </tbody>}
                {
                  !isWalletConnect &&
                  <tbody>
                    <tr>
                      <td colSpan={4}>
                        Connect wallet
                      </td>
                    </tr>
                  </tbody>
                }
              </table>
            </div>
          </div>
        </div>
        {isWalletConnect && totalRound != null && <div className='d-flex mt-2'>
          <div className='col-md-8 ms-auto'>
            <Pagination
              className="pagination-bar justify-content-end"
              currentPage={currentPage}
              totalCount={totalRound}
              onPageChange={page => {
                console.log("page", page);
                shouldLog.current = true;
                setCurrentPage(page)
              }}
            />
          </div>
        </div>}
      </div>
    </div>
  );
}

export default EtaTable;
