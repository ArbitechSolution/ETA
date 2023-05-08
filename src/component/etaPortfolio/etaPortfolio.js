import React, { useEffect, useState } from 'react';
import './etaPortfolio.css';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { contractAddress, contractAddressAbi } from '../utils/contractaddress';
import { useTranslation } from 'react-i18next';

import Web3 from 'web3';
const web3Supply = new Web3('https://bsc-dataseed1.binance.org/');
function EtaPortfolio() {
	const { t, i18n } = useTranslation();
	const [roundNumber, setRoundNumber] = useState(0);
	const [spentUsd, setSpentUsd] = useState(0);
	const [receivedUsdt, setReceivedUsdt] = useState(0);
	const [etaBal, setEtaBal] = useState(0);
	let { acc } = useSelector((state) => state.connect);
	// let acc = "0x70C0Fb7462F6658A9d4D7d6Af2d2e0C1fD8CE365"
	const usdSpend = async () => {
		const web3 = window.web3;
		try {
			if (acc == 'No Wallet') {
				console.log('No Wallet');
			} else if (acc == 'Wrong Network') {
				console.log('Wrong Wallet');
			} else if (acc == 'Connect Wallet') {
				// toast.info("Connect Wallet");
				console.log('Connect Wallet');
			} else {
				let contract = new web3.eth.Contract(
					contractAddressAbi,
					contractAddress
				);
				let ceheckBalance = await contract.methods.checkbalance(acc).call();
				ceheckBalance = Number(
					web3.utils.fromWei(ceheckBalance)
				).toLocaleString();
				setEtaBal(ceheckBalance);
				let totalUsd = await contract.methods.TotalUSDSpent(acc).call();
				console.log('totalUsd', totalUsd);
				totalUsd = Number(web3.utils.fromWei(totalUsd)).toLocaleString();
				setSpentUsd(totalUsd);
			}
		} catch (e) {
			console.log('Error While Buying Tokens', e);
		}
	};
	const usdtReceived = async () => {
		const web3 = window.web3;
		try {
			if (acc == 'No Wallet') {
				console.log('No Wallet');
			} else if (acc == 'Wrong Network') {
				console.log('Wrong Wallet');
			} else if (acc == 'Connect Wallet') {
				// toast.info("Connect Wallet");
				console.log('Connect Wallet');
			} else {
				let contract = new web3.eth.Contract(
					contractAddressAbi,
					contractAddress
				);
				const round = contract.methods.round().call();
				let sum = 0
				for (let index = 2; index <= round; index++) {
					for (let j = 0; j <= index - 2; j++) {
						let countSell = await contract.methods.countSell(acc, j).call()
						for (let i = 0; i < countSell; i++) {
							let buyToken = await contract.methods.buyerSellTotalToken(acc, index, j, i).call();
							let price = await contract.methods.userSellPrice(acc, j, i).call();
							let val = Number(web3.utils.fromWei(buyToken)) * Number(web3.utils.fromWei(price))
							sum = sum + val;
						}
					}

				}
				setReceivedUsdt((sum * 70) / 100)
			}
		} catch (e) {
			console.log('Error While Buying Tokens', e);
		}
	};
	const getData = async () => {
		try {
			let contract = new web3Supply.eth.Contract(
				contractAddressAbi,
				contractAddress
			);
			let roundNo = await contract.methods.round().call();

			setRoundNumber(roundNo);
		} catch (e) {
			console.log('Error While Buying Tokens', e);
		}
	};
	useEffect(() => {
		usdSpend();
		usdtReceived();
	}, [acc]);
	useEffect(() => {
		getData();
	}, []);
	return (
		<div className="container">
			<div className="row mt-5">
				<div className="col-md-12">
					<div className="ETA_Heading text-center">{t('myportfolio')}</div>
				</div>
			</div>
			<div className="row d-flex justify-content-between">
				{/* <div className="col-md-3 col-12 table-background mobile-space">
          <div className=" text-ETA text-uppercase text-center p-2">
          {t("myportfolio")}
          </div>
        </div> */}
				{/* <div className="col-md-3 col-12 table-background mobile-space">
          <div className=" text-ETA text-uppercase text-center p-2">
            Current Round: <spam className="text-white">{Number(roundNumber)+1}</spam>
          </div>
        </div> */}
			</div>
			<div className="row d-flex justify-content-between mt-3">
				<div className="col-md-3 col-12 col-12 table-background mobile-space ">
					<div className=" text-value text-uppercase text-center p-2">
						{t('totlaEtaPurchased')}
						<br />
						{etaBal}
					</div>
				</div>
				<div className="col-md-3 col-12 table-background mobile-space">
					<div className=" text-value text-uppercase text-center p-2">
						{t('totalUsdSpen')}
						<br />${spentUsd}
					</div>
				</div>
				<div className="col-md-3 col-12 table-background mobile-space">
					<div className=" text-value text-uppercase text-center p-2">
						{t('totalUsdtEarned')}
						<br />${receivedUsdt}
					</div>
				</div>
			</div>
		</div>
	);
}

export default EtaPortfolio;
