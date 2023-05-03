import React, { useState, useRef, useEffect } from "react";
import Pagination from "../../paginations/pagination";
import { useSelector } from "react-redux";
import { contractAddressAbi, contractAddress } from "../utils/contractaddress";
import { useTranslation } from "react-i18next";

function EtaTable() {
  const { t, i18n } = useTranslation();
  let PageSize = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [priceOrder, setPriceOrder] = useState([]);
  const [roundNumber, setRoundNumber] = useState(null);

  let shouldLog = useRef(true);
  let currentBlock = 50;
  useEffect(() => {
    if (shouldLog.current) {
      shouldLog.current = false;
      const firstPageIndex = (currentPage - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
    }
  }, [currentPage]);
  let { acc, isWalletConnect } = useSelector((state) => state.connect);
  // var acc = "0x70C0Fb7462F6658A9d4D7d6Af2d2e0C1fD8CE365";
  let [totalRound, setTotalRound] = useState(null);
  const getRound = async () => {
    try {
      if (
        acc != "No Wallet" &&
        acc != "Wrong Network" &&
        acc != "Connect Wallet"
      ) {
        const web3 = window.web3;
        const contract = new web3.eth.Contract(
          contractAddressAbi,
          contractAddress
        );
        const round = await contract.methods.round().call();
        setTotalRound(Number(round) + 1);
      }
    } catch (error) {
      console.error("error while get round", error);
    }
  };
  useEffect(() => {
    getRound();
  }, [totalRound, isWalletConnect]);
  const [roundDetail, setRoundDetail] = useState([]);
  let [loadData, setIsLoadData] = useState(true);
  const getRoundDetial = async () => {
    try {
      if (
        acc != "No Wallet" &&
        acc != "Wrong Network" &&
        acc != "Connect Wallet"
      ) {
        setIsLoadData(true);
        const web3 = window.web3;
        const contract = new web3.eth.Contract(
          contractAddressAbi,
          contractAddress
        );
        const countSell = await contract.methods
          .countSell(acc, currentPage - 1)
          .call();
        let arr = [];
        for (let index = 0; index < countSell; index++) {
          let obj = {};
          let userSellToken = await contract.methods
            .userSellToken(acc, currentPage - 1, index)
            .call();
          if (userSellToken > 0) {
            let userSellPrice = await contract.methods
              .userSellPrice(acc, currentPage - 1, index)
              .call();
            obj.price = web3.utils.fromWei(userSellPrice);
            obj.unit = web3.utils.fromWei(userSellToken);
            obj.totalSpend =
              web3.utils.fromWei(userSellPrice) *
              web3.utils.fromWei(userSellToken);
            obj.txid = acc;
            arr.push(obj);
          }
        }
        setIsLoadData(false);
        setRoundDetail(arr);
      }
    } catch (error) {
      console.error("error while get round detail", error);
    }
  };
  useEffect(() => {
    getRoundDetial();
  }, [isWalletConnect, currentPage]);
  let [isLoding, setIsLoading] = useState(true);
  const priceOrderData = async () => {
    try {
      if (
        acc != "No Wallet" &&
        acc != "Wrong Network" &&
        acc != "Connect Wallet"
      ) {
        setIsLoading(true);
        const web3 = window.web3;
        let contract = new web3.eth.Contract(
          contractAddressAbi,
          contractAddress
        );
        let roundNo = await contract.methods.round().call();
        console.log("token", roundNo);
        let newdata = [];
        for (let index = 0; index < roundNo + 1; index++) {
          let { 0: token, 1: price } = await contract.methods
            .countBuyers(acc, index)
            .call();

          for (let i = 0; i < token.length; i++) {
            if (token[i] > 0) {
              let obj = {};
              obj.buytoken = Number(web3.utils.fromWei(token[i]));
              obj.buytokenprice = Number(web3.utils.fromWei(price[i]));
              obj.round = roundNo;
              obj.txId = acc;
              newdata.push(obj);
            }
          }
        }
        setIsLoading(false);
        setPriceOrder(newdata);
      }
    } catch (e) {
      setIsLoading(false);
      console.error("Error While Buying Tokens", e);
    }
  };
  useEffect(() => {
    priceOrderData();
  }, [acc, currentPage]);

  return (
    <div className="background_Pic mt-3 mb-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12 table-background">
            <div className="table-responsive mt-2">
              <table className="table table-bordered" style={{ width: "100%" }}>
                <thead className="text-center fixed">
                  <tr>
                    <th className="col-3" scope="col">
                      {t("price")}
                    </th>
                    <th className="col-3" scope="col">
                      {t("ETAToken")}
                    </th>
                    <th className="col-3">{t("round")}</th>
                    <th className="col-3">{t("txid")}</th>
                  </tr>
                </thead>
                {isWalletConnect && (
                  <tbody className="text-center">
                    {priceOrder.length > 0 ? (
                      priceOrder.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.buytokenprice}</td>
                            <td>{item.buytoken}</td>
                            <td>{Number(item.round) + 1}</td>
                            <td>{item.txId.slice(0, 8) + "..."}</td>
                          </tr>
                        );
                      })
                    ) : isLoding ? (
                      <tr>
                        <td colSpan={2}>Loading...</td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan={2}>No detail found</td>
                      </tr>
                    )}
                  </tbody>
                )}
                {!isWalletConnect && (
                  <tbody>
                    <tr>
                      <td colSpan={2}>{t("connectWallet")}</td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
            {/* {isWalletConnect && totalRound != null && <div className='d-flex mt-2'>
          <div className='col-md-8 ms-auto'>
            <Pagination
              className="pagination-bar justify-content-end"
              currentPage={currentPage}
              totalCount={totalRound}
              onPageChange={page => {
                setCurrentPage(page)
              }}
            />
          </div>
        </div>} */}
            {/* <div className="text-history mt-2 text-uppercase">Round No {currentPage}</div> */}
            {/* <div className="table-responsive mt-3 mb-3">
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
            </div> */}
          </div>
        </div>
        {/* {isWalletConnect && totalRound != null && <div className='d-flex mt-2'>
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
        </div>} */}
      </div>
    </div>
  );
}

export default EtaTable;
