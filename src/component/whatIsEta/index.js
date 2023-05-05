import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Pagination from '../../paginations/pagination';
import { contractAddress, contractAddressAbi } from '../utils/contractaddress';
import { usdtTokenAdd, usdtTokenAbi } from '../utils/contractUsdtToken';
import { useTranslation } from 'react-i18next';
import { Table } from 'react-bootstrap';
import {
	usdaceTokenAdd,
	usdaceTokenAddAbi,
} from '../utils/contractUsdaceToken';
import { etaTokenAbi, etaTokenAddress } from '../utils/etaToken';
import './whatIs.css';
import Web3 from 'web3';
import { connectionAction } from '../../Redux/connection/actions';
// const web3 = require("web3");
const web3Supply = new Web3('https://bsc-dataseed1.binance.org/');
const rpcUrl = new Web3('https://data-seed-prebsc-2-s2.binance.org:8545');

function WhatIsEta() {
	const { t, i18n } = useTranslation();
	const [usdtUnit, setUsdtUnit] = useState(0);
	const [usdtCost, setusdtCost] = useState(0);
	const [usdaceUnit, setUsdaceUnit] = useState(0);
	let [usdaceBtn, setUsdaceBtn] = useState({
		text: `${t('buyEta')}`,
		isDisable: true,
	});
	let [usdtBtn, setUsdtBtn] = useState({
		text: `${t('buyEta')}`,
		isDisable: true,
	});
	const [usdaceCost, setusdaceCost] = useState(0);
	const [roundNumber, setRoundNumber] = useState(null);
	const [currentPrice, setCurrentPrice] = useState(null);
	const [currentPage, setCurrentPage] = useState(null);
	const [etaBalance, setEtaBalance] = useState(null);
	let { acc, isWalletConnect } = useSelector((state) => state.connect);
	const dispatch = useDispatch();
	const connectWallet = () => {
		dispatch(connectionAction());
	};
	useEffect(() => {
		setUsdtBtn({ ...usdtBtn, text: `${t('buyEta')}` })
		setUsdaceBtn({ ...usdaceBtn, text: `${t('buyEta')}` })
	}, [i18n.language])
	const token = async () => {
		try {
			let contract = new web3Supply.eth.Contract(
				contractAddressAbi,
				contractAddress
			);
			if (usdtUnit == 0 || usdtUnit == '') {
				setusdtCost(0);
				setUsdtBtn({ text: `${t('buyEta')}`, isDisable: true });
			} else {
				const round = await contract.methods.round().call();
				let maxDeposit = 0;
				if (round < 2) {
					maxDeposit = await contract.methods.maxDeposit().call();
				} else {
					maxDeposit = await contract.methods.maxToken().call();
				}
				maxDeposit = web3Supply.utils.fromWei(maxDeposit);
				let minDeposit = await contract.methods.minDeposit().call();
				minDeposit = web3Supply.utils.fromWei(minDeposit);
				if (
					Number(usdtUnit) >= Number(minDeposit) &&
					Number(usdtUnit) <= Number(maxDeposit)
				) {
					let value = web3Supply.utils.toWei(usdtUnit);

					let checkinput = await contract.methods.checkPrice(value).call();

					let valueCost = web3Supply.utils.fromWei(checkinput);
					setusdtCost(valueCost);
					if (isWalletConnect) {
						const web3 = window.web3;
						const usdaceToken = new web3.eth.Contract(
							usdtTokenAbi,
							usdtTokenAdd
						);
						let balOfUsdace = await usdaceToken.methods.balanceOf(acc).call();
						balOfUsdace = web3.utils.fromWei(balOfUsdace);

						if (parseFloat(balOfUsdace) > parseFloat(valueCost)) {
							setUsdtBtn({ text: `${t('buyEta')}`, isDisable: false });
						} else {
							setUsdtBtn({ text: 'Insufficent USDT', isDisable: true });
						}
					} else {
						setUsdtBtn({ text: `${t('buyEta')}`, isDisable: true });
					}
				} else {
					setUsdtBtn({
						text: `Enter your Value  ${minDeposit} to ${maxDeposit}`,
						isDisable: true,
					});
				}
			}
		} catch (e) {
			console.error('Error While Buying Tokens', e);
		}
	};

	const usdAceToken = async () => {
		try {
			let contract = new web3Supply.eth.Contract(
				contractAddressAbi,
				contractAddress
			);
			if (usdaceUnit == 0 || usdaceUnit == '') {
				setusdaceCost(0);
				setUsdaceBtn({ text: `${t('buyEta')}`, isDisable: true });
			} else {
				const round = await contract.methods.round().call();
				let maxDeposit = 0;
				if (round < 2) {
					maxDeposit = await contract.methods.maxDeposit().call();
				} else {
					maxDeposit = await contract.methods.maxToken().call();
				}
				maxDeposit = web3Supply.utils.fromWei(maxDeposit);
				let minDeposit = await contract.methods.minDeposit().call();
				minDeposit = web3Supply.utils.fromWei(minDeposit);
				if (
					Number(usdaceUnit) >= Number(minDeposit) &&
					Number(usdaceUnit) <= Number(maxDeposit)
				) {
					let valueUsd = web3Supply.utils.toWei(usdaceUnit);
					let checkinputUsdace = await contract.methods
						.checkPrice(valueUsd)
						.call();
					let valueUsdace = web3Supply.utils.fromWei(checkinputUsdace);
					setusdaceCost(valueUsdace);
					if (isWalletConnect) {
						const web3 = window.web3;
						const usdaceToken = new web3.eth.Contract(
							usdaceTokenAddAbi,
							usdaceTokenAdd
						);
						let balOfUsdace = await usdaceToken.methods.balanceOf(acc).call();
						balOfUsdace = web3.utils.fromWei(balOfUsdace);
						console.log('balOfUsdace', balOfUsdace);
						if (parseFloat(balOfUsdace) > parseFloat(valueUsdace)) {
							setUsdaceBtn({ text: `${t('buyEta')}`, isDisable: false });
						} else {
							setUsdaceBtn({ text: 'Insufficent USDACE', isDisable: true });
						}
					} else {
						setUsdaceBtn({ text: `${t('buyEta')}`, isDisable: true });
					}
				} else {
					setUsdaceBtn({
						text: `Enter your Value  ${minDeposit} to ${maxDeposit}`,
						isDisable: true,
					});
				}
			}
		} catch (e) {
			setUsdaceBtn({ text: `${t('buyEta')}`, isDisable: true });
			console.error('Error While Buying Tokens', e);
		}
	};

	const buyUsdt = async () => {
		const web3 = window.web3;
		try {
			if (acc == 'No Wallet') {
				toast.info('No Wallet');
			} else if (acc == 'Wrong Network') {
				toast.info('Wrong Wallet');
			} else if (acc == 'Connect Wallet') {
				toast.info(t('connectWallet'));
			} else {
				let usdtToken = new web3.eth.Contract(usdtTokenAbi, usdtTokenAdd);
				let balOfUsdt = await usdtToken.methods.balanceOf(acc).call();
				balOfUsdt = web3.utils.fromWei(balOfUsdt);
				if (parseFloat(balOfUsdt) >= parseFloat(usdtCost)) {
					let contract = new web3.eth.Contract(
						contractAddressAbi,
						contractAddress
					);
					let { referrer } = await contract.methods.userInfo(acc).call();
					if (referrer != '0x0000000000000000000000000000000000000000') {
						let costValue = web3.utils.toWei(usdtCost);
						setUsdtBtn({ text: 'Waiting...', isDisable: true });
						await usdtToken.methods
							.approve(contractAddress, costValue)
							.send({ from: acc });
						let unitValue = web3.utils.toWei(usdtUnit);
						await contract.methods
							.buy(usdtTokenAdd, costValue, unitValue)
							.send({ from: acc });
						priceOrderData();
						getData();
						connectWallet();
						setUsdtBtn({ text: `${t('buyEta')}`, isDisable: false });
						setUsdtUnit(0);
						toast.info(t('txSuccess'));
					} else {
						toast.info('You have not registered.');
					}
				} else {
					toast.info('You have insufficient USDT balance!');
				}
			}
		} catch (e) {
			setUsdtBtn({ text: `${t('buyEta')}`, isDisable: false });
			console.error('Error While Buying Tokens', e);
		}
	};

	const buyUsdace = async () => {
		const web3 = window.web3;
		try {
			if (acc == 'No Wallet') {
				toast.info('No Wallet');
			} else if (acc == 'Wrong Network') {
				toast.info('Wrong Wallet');
			} else if (acc == 'Connect Wallet') {
				toast.info(t('connectWallet'));
			} else {
				let usdaceToken = new web3.eth.Contract(
					usdaceTokenAddAbi,
					usdaceTokenAdd
				);
				let balOfUsdace = await usdaceToken.methods.balanceOf(acc).call();
				balOfUsdace = web3.utils.fromWei(balOfUsdace);
				if (parseFloat(balOfUsdace) >= parseFloat(usdaceCost)) {
					let contract = new web3.eth.Contract(
						contractAddressAbi,
						contractAddress
					);
					let { referrer } = await contract.methods.userInfo(acc).call();
					if (referrer != '0x0000000000000000000000000000000000000000') {
						let costValue = web3.utils.toWei(usdaceCost);
						setUsdaceBtn({ text: 'Waiting...', isDisable: true });
						await usdaceToken.methods
							.approve(contractAddress, costValue)
							.send({ from: acc });
						let unitValue = web3.utils.toWei(usdaceUnit);
						console.log('costValue, unitValue', costValue, unitValue);
						await contract.methods
							.buy(usdaceTokenAdd, costValue, unitValue)
							.send({ from: acc });
						getData();
						priceOrderData();
						setUsdaceUnit(0);
						connectWallet();
						setUsdaceBtn({ text: `${t('buyEta')}`, isDisable: true });
						toast.info(t('txSuccess'));
					} else {
						toast.info('You have not registered.');
					}
				} else {
					toast.info('You have insufficient USDACE balance!');
				}
			}
		} catch (e) {
			setUsdaceBtn({ text: `${t('buyEta')}`, isDisable: false });
			console.error('Error While Buying Tokens', e);
		}
	};
	const getData = async () => {
		try {
			let contract = new web3Supply.eth.Contract(
				contractAddressAbi,
				contractAddress
			);
			let minDeposit = await contract.methods.minDeposit().call();
			let curPrice = await contract.methods.checkPrice(minDeposit).call();
			setCurrentPrice(Number(web3Supply.utils.fromWei(curPrice)).toFixed(4));

			let roundNo = await contract.methods.round().call();
			setCurrentPage(Number(roundNo) + 1);
			setRoundNumber(Number(roundNo) + 1);
		} catch (e) {
			console.error('Error While Buying Tokens', e);
		}
	};
	let [isLoding, setIsLoading] = useState(true);
	const priceOrderData = async () => {
		try {
			if (
				acc != 'No Wallet' &&
				acc != 'Wrong Network' &&
				acc != 'Connect Wallet'
			) {
				setIsLoading(true);
				const web3 = window.web3;
				const etaContract = new web3.eth.Contract(etaTokenAbi, etaTokenAddress);
				let userEtaBal = await etaContract.methods.balanceOf(acc).call();
				setEtaBalance(Number(web3.utils.fromWei(userEtaBal)));
				// let roundNo = await contract.methods.round().call();
				// let { 0: token, 1: price } = await contract.methods.countBuyers(acc, currentPage-1).call();
				// let newdata = [];
				// for (let i = 0; i < token.length; i++) {
				//   if(token[i] > 0){
				//     let obj = {}
				//     obj.buytoken = Number(web3.utils.fromWei(token[i]));
				//     obj.buytokenprice = Number(web3.utils.fromWei(price[i]))
				//     newdata.push(obj)
				//   }
				// }
				// const etaContract  = new web3.eth.Contract(etaTokenAbi, etaTokenAddress);
				// let userEtaBal = await etaContract.methods.balanceOf(acc).call();

				// setIsLoading(false)
				// setPriceOrder(newdata);
			}
		} catch (e) {
			setIsLoading(false);
			console.error('Error While Buying Tokens', e);
		}
	};

	useEffect(() => {
		token();
	}, [usdtUnit, isWalletConnect]);

	useEffect(() => {
		usdAceToken();
	}, [usdaceUnit, isWalletConnect]);
	useEffect(() => {
		priceOrderData();
	}, [acc, currentPage]);
	useEffect(() => {
		getData();
		// setInterval(() => {
		// }, 1000);
	}, [acc]);

	return (
		<div className=" background_Pic mt-5" id="whatIsEta">
			<div className="container">
				{/* <div className="row">
          <div className="col-md-12 ">
            <div className="ETA_Heading text-center">{t("buy")} ETA</div>
          </div>
        </div> */}
				<div className="row d-flex justify-content-center">
					<div className="col-md-10">
						<Table className="text-center">
							<thead>
								<tr>
									<th className="fs-5">{t('round')}</th>
									<th className="fs-5">{t('currentPrice')} </th>
									{/* <th>{t("etaBalance")}</th> */}
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="text-dark fs-5">{roundNumber}</td>
									<td className="text-dark  fs-5">{currentPrice} </td>
									{/* <td className="text-dark">{etaBalance == null ? t("connectWallet") : etaBalance}</td> */}
								</tr>
							</tbody>
						</Table>
					</div>
				</div>
				<div className="row d-flex justify-content-center mt-5">
					{/* <div className="col-md-5 col-12  table-background">
            <div className="text-center mt-3">
              <h4 className="text-round">
                {t("roundNo")}:
                <span className="text-white">&nbsp; {currentPage}</span>
              </h4>
              <h4 className="text-round">ETA Buy Order</h4>
            </div>
            <div className="table-responsive">
              <table className="table" style={{ width: "100%" }}>
                <thead className="text-center fixed">
                  <tr>
                    <th scope="col">Price</th>
                    <th scope="col">ETA Tokens</th>
                  </tr>
                </thead>
                { isWalletConnect && <tbody className="text-center">
                  {priceOrder.length > 0 ?priceOrder.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.buytokenprice}</td>
                        <td>{item.buytoken}</td>
                      </tr>
                    );
                  })
                  : isLoding ?
                  <tr>
                    <td colSpan={2}>Loading...</td>
                  </tr>
                  :
                  <tr>
                    <td colSpan={2}>No detail found</td>
                  </tr>
                }
                </tbody>}
                {
                  !isWalletConnect && <tbody>
                    <tr>
                    <td colSpan={2}>Connect Wallet</td>
                  </tr>
                  </tbody>
                }
              </table>
            </div>
            {isWalletConnect && roundNumber != null && <div className='d-flex mt-2'>
          <div className='col-md-8 ms-auto'>
            <Pagination
              className="pagination-bar justify-content-end"
              currentPage={currentPage}
              totalCount={roundNumber}
              onPageChange={page => {
                setCurrentPage(page)
              }}
            />
          </div>
        </div>}
          </div> */}
					<div className="col-md-10 col-12 ">
						<div className="row  mobile-responsive justify-content-between">
							<div className="col-md-5 table-background  mt-3">
								<div className="text-round text-center mt-3">
									{t('buyEtausingUSDT')}
								</div>
								<div className="row d-flex justify-content-center mt-3 mb-3">
									<div className="col-md-10 col-10 box-backgorund">
										<div className="d-flex justify-content-between p-3">
											<label className="p-2 text-unit">ETA:</label>
											<input
												placeholder="USDT"
												type="number"
												value={usdtUnit}
												onChange={(e) => setUsdtUnit(e.target.value)}
											></input>
										</div>
									</div>
									<div className="col-md-10 col-10 box-backgorund mt-3">
										<div className="d-flex justify-content-between">
											<div className="p-2 text-unit">{t('cost')}:</div>
											<div className="p-2 text-value  ">{usdtCost} USDT</div>
										</div>
									</div>
									<div
										className={
											isWalletConnect && !usdtBtn.isDisable
												? 'col-md-10 col-10  mb-3'
												: 'is-disabled col-md-10 col-10  mb-3'
										}
									>
										<div className="  mt-3">
											<button
												className="btn btn-wallet "
												style={{ width: '100%' }}
												type="button"
												onClick={buyUsdt}
											>
												{usdtBtn.text}
											</button>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-5 table-background  mt-3">
								<div className="text-round text-center mt-3">
									{t('buyEtausingUSDACE')}
								</div>
								<div className="row d-flex justify-content-center mt-3 mb-3">
									<div className="col-md-10 col-10 box-backgorund">
										<div className="d-flex justify-content-between p-3">
											<label className="p-2 text-unit">ETA:</label>
											<input
												placeholder="USDACE"
												type="number"
												value={usdaceUnit}
												onChange={(e) => setUsdaceUnit(e.target.value)}
											></input>
										</div>
									</div>
									<div className="col-md-10 col-10 box-backgorund mt-3">
										<div className="d-flex justify-content-between">
											<div className="p-2 text-unit">{t('cost')}:</div>
											<div className="p-2 text-value  ">
												{usdaceCost} USDACE$
											</div>
										</div>
									</div>
									<div
										className={
											isWalletConnect && !usdaceBtn.isDisable
												? 'col-md-10 col-10  mb-3'
												: 'is-disabled col-md-10 col-10  mb-3'
										}
									>
										<div className="  mt-3">
											<button
												className="btn btn-wallet "
												style={{ width: '100%' }}
												type="button"
												onClick={buyUsdace}
											>
												{usdaceBtn.text}
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default WhatIsEta;
