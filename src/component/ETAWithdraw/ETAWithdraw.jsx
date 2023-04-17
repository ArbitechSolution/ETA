import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Pagination from "../../paginations/pagination"
import { contractAddress, contractAddressAbi } from "../utils/contractaddress";
import { usdtTokenAdd, usdtTokenAbi } from "../utils/contractUsdtToken";
import {
    usdaceTokenAdd,
    usdaceTokenAddAbi,
} from "../utils/contractUsdaceToken";
import {
    etaTokenAbi,
    etaTokenAddress,
} from "../utils/etaToken";
import { contractTokenAdd, contractTokenAddAbi } from "../utils/contractToken";
import { connectionAction } from "../../Redux/connection/actions"

import Web3 from "web3";
// const web3 = require("web3");
const web3Supply = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");
const rpcUrl = new Web3("https://data-seed-prebsc-2-s2.binance.org:8545");
function EtaWithdraw() {
    const [etaAmount, setEtaAmount] = useState(0);
    const [reinvestAmount, setReinvestAmount] = useState(0);
    const [etaBal, setEtaBal] = useState(0)
    let [reinvestmentBtn, setreinvestmentBtn] = useState({ text: "Reinvest ETA", isDisable: true });
    let [withdrawBtn, setwithdrawBtn] = useState({ text: "Withdraw ETA", isDisable: true })

    let { acc, isWalletConnect } = useSelector((state) => state.connect);

    const dispatch = useDispatch()
    const connectWallet = () => {
        dispatch(connectionAction());
    };
    const getEtaToken = async () => {
        try {
            if (acc != "No Wallet" && acc != "Wrong Network" && acc != "Connect Wallet") {
                const web3 = window.web3;
                const token = new web3.eth.Contract(etaTokenAbi, etaTokenAddress);
                let bal = await token.methods.balanceOf(acc).call()
                bal = (web3.utils.fromWei(bal))
                console.log("bal", bal);
                if (bal > 0) {
                    setReinvestAmount(bal)
                    setreinvestmentBtn({ text: "Reinvest ETA", isDisable: false })
                } else {
                    setreinvestmentBtn({ text: "Insufficient Balance", isDisable: true })
                }
                let contract = new web3.eth.Contract(
                    contractAddressAbi,
                    contractAddress
                );
                let etaWithdrawAmount = await contract.methods.getETAWithdraw(acc).call();
                etaWithdrawAmount = Number(web3.utils.fromWei(etaWithdrawAmount));
                if (etaWithdrawAmount > 0) {
                    setEtaAmount(etaWithdrawAmount)
                    setwithdrawBtn({ text: "Withdraw ETA", isDisable: false })
                } else {
                    setwithdrawBtn({ text: "Insufficient Amount", isDisable: true })
                }
            }

        } catch (e) {
            console.error("Error While Buying Tokens", e);
        }
    };
    useEffect(() => {
        getEtaToken()
    }, [acc])
    const WithdrawETA = async () => {
        try {
            const web3 = window.web3;
            let contract = new web3.eth.Contract(
                contractAddressAbi,
                contractAddress
            );
            setwithdrawBtn({ text: "Waiting..", isDisable: true })
            await contract.methods.userWithdrawETAToken().send({
                from: acc
            })
            getEtaToken()
            connectWallet()
        } catch (error) {
            setwithdrawBtn({ text: "Withdraw ETA", isDisable: false })
            console.error("error while withdraw eta", error);
        }
    }
    const reinvestEta = async () => {
        try {
            if (acc == "No Wallet") {
                toast.info("No Wallet");
            } else if (acc == "Wrong Network") {
                toast.info("Wrong Wallet");
            } else if (acc == "Connect Wallet") {
                toast.info("Connect Wallet");
            } else {
                if (reinvestAmount > 0 && reinvestAmount != "") {
                    const web3 = window.web3;
                    const token = new web3.eth.Contract(etaTokenAbi, etaTokenAddress);
                    let bal = await token.methods.balanceOf(acc).call()
                    bal = Number(web3.utils.fromWei(bal))
                    if (reinvestAmount <= bal) {
                        const contract = new web3.eth.Contract(contractAddressAbi, contractAddress);
                        const round = await contract.methods.round().call();
                        if (round > 1) {
                            setreinvestmentBtn({ text: "Waiting...", isDisable: true })
                            await token.methods.approve(contractAddress, web3.utils.toWei(reinvestAmount)).send({
                                from: acc
                            })
                            await contract.methods.reinvestETAToken((web3.utils.toWei(reinvestAmount))).send({
                                from: acc
                            })
                            getEtaToken()
                            connectWallet()
                            setreinvestmentBtn({ text: "Reinvest ETA", isDisable: false })
                        } else {
                            toast.error("Round must be greater then 2")
                        }
                    } else {
                        toast.error("Your balance is less")
                    }
                }
            }
        } catch (error) {
            setreinvestmentBtn({ text: "Reinvest ETA", isDisable: false })
            console.error("error while reinvest", error);
        }
    }
    return (
        <div className=" background_Pic mt-5" id="whatIsEta">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 ">
                        <div className="ETA_Heading text-center">Withdraw & Reinvest</div>
                    </div>
                </div>
                <div className="row d-flex justify-content-between  mobile-responsive">
                    <div className="col-md-5 table-background  mt-3">
                        <div className="text-round text-center mt-3">
                            ETA Withdraw
                        </div>
                        <div className="row d-flex justify-content-center mt-3 mb-3">
                            <div className="col-md-10 col-10 box-backgorund">
                                <div className="d-flex justify-content-between p-3">
                                    <div className="p-2 text-unit">GET ETA:</div>
                                    <div className="p-2 text-value  ">{etaAmount} ETA</div>
                                </div>
                            </div>
                            <div className={isWalletConnect && !withdrawBtn.isDisable ? "col-md-10 col-10  mb-3" : "is-disabled col-md-10 col-10  mb-3"}>
                                <div className="  mt-3">
                                    <button
                                        className="btn btn-wallet "
                                        style={{ width: "100%" }}
                                        type="button"
                                        onClick={WithdrawETA}
                                    >
                                        {withdrawBtn.text}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 table-background  mt-3">
                        <div className="text-round text-center mt-3">
                            ETA Reinvest
                        </div>
                        <div className="row d-flex justify-content-center mt-3 mb-3">
                            <div className="col-md-10 col-10 box-backgorund">
                                <div className="d-flex justify-content-between p-3">
                                    <label className="p-2 text-unit">ETA:</label>
                                    <input
                                        placeholder="ETA"
                                        type="number"
                                        value={reinvestAmount}
                                        onChange={(e) => setReinvestAmount(e.target.value)}
                                    ></input>
                                </div>
                            </div>
                            <div className={isWalletConnect && !reinvestmentBtn.isDisable ? "col-md-10 col-10  mb-3" : "is-disabled col-md-10 col-10  mb-3"}>
                                <div className="  mt-3">
                                    <button
                                        className="btn btn-wallet "
                                        style={{ width: "100%" }}
                                        type="button"
                                        onClick={reinvestEta}
                                    >
                                        {reinvestmentBtn.text}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default EtaWithdraw;
