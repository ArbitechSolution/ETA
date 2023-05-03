import React, { useEffect, useState } from "react";
import "./wallet.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import RefreshIcon from "@mui/icons-material/Refresh";
import { FiCopy } from "react-icons/fi";
// import { connectionAction } from "../../Redux/connection/actions";
import { contractAddress, contractAddressAbi } from "../utils/contractaddress";
import { useTranslation } from "react-i18next";
function WalletRef() {
  const { t, i18n } = useTranslation();
  const [ref, setRef] = useState("0x000000000000000000000000");
  const [refLink, setRefLink] = useState(`${window.location.href}`);
  const [checkDeposit, setCheckDeposit] = useState(false);
  let { acc, isWalletConnect } = useSelector((state) => state.connect);

  const refaddress = async () => {
    const web3 = window.web3;
    try {
      if (acc == "No Wallet") {
        console.log("No Wallet");
      } else if (acc == "Wrong Network") {
        console.log("Wrong Wallet");
      } else if (acc == "Connect Wallet") {
        // toast.info("Connect Wallet");
        console.log("Connect Wallet");
      } else {
        let contract = new web3.eth.Contract(
          contractAddressAbi,
          contractAddress
        );
        let defaultReferral = await contract.methods.defaultRefer().call();
        let locationHref = window.location.href.includes("referrallink=");
        let refDeposit = await contract.methods.userInfo(acc).call();
        let deposit = refDeposit.totalDeposit;

        if (deposit >= 0) {
          setRefLink(`${window.location.origin}?referrallink=${acc}`);
        } else {
          setRefLink(
            `${window.location.origin}?referrallink=${defaultReferral}`
          );
        }
      }
    } catch (e) {
      console.log("Error", e);
    }
  };
  const referral = async () => {
    const web3 = window.web3;
    try {
      if (acc == "No Wallet") {
        console.log("No Wallet");
      } else if (acc == "Wrong Network") {
        console.log("Wrong Wallet");
      } else if (acc == "Connect Wallet") {
        console.log("Connect Wallet");
      } else {
        let contract = new web3.eth.Contract(
          contractAddressAbi,
          contractAddress
        );
        let defaultReferral = await contract.methods.defaultRefer().call();
        let locationHref = window.location.href.includes("referrallink=");
        if (locationHref) {
          let locationLink = window.location.href.split("referrallink=");
          setRef(locationLink[1]);
          setCheckDeposit(true);
        } else {
          setRef(defaultReferral);
          setCheckDeposit(false);
        }
      }
    } catch (e) {
      console.log("Error", e);
    }
  };
  const handleRegisterReferral = (e) => {
    setRef(e.target.value);
  };

  //Register Link
  // const handleRegister = async () => {
  //   try {
  //     if (acc == "No Wallet") {
  //       toast.info("Not Connected");
  //     } else if (acc == "Wrong Network") {
  //       toast.info("Wrong Network");
  //     } else if (acc == "Connect Wallet") {
  //       toast.info("Not Connected");
  //     } else {
  //       const web3 = window.web3;
  //       const contract = new web3.eth.Contract(
  //         contractAddressAbi,
  //         contractAddress
  //       );
  //       if (!checkDeposit) {
  //         let refDeposit = await contract.methods.userInfo(ref).call();
  //         let deposit = refDeposit.totalDeposit;

  //         if (parseFloat(deposit) > 0) {
  //           await contract.methods.register(ref).send({ from: acc });
  //           toast.success("Successfully Registered");
  //         } else {
  //           toast.error("Your Referral address is not applicable");
  //         }
  //       } else {
  //         await contract.methods.register(ref).send({ from: acc });
  //         toast.success("Successfully Registered");
  //       }
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //     toast.error("Registration Failed!");
  //   }
  // };

  const handleRegister = async () => {
    try {
      if (acc == "No Wallet") {
        toast.info("Not Connected");
      } else if (acc == "Wrong Network") {
        toast.info("Wrong Network");
      } else if (acc == "Connect Wallet") {
        toast.info("Not Connected");
      } else {
        const web3 = window.web3;
        const contract = new web3.eth.Contract(
          contractAddressAbi,
          contractAddress
        );
        let defaultReferral = await contract.methods.defaultRefer().call();
        let { referrer } = await contract.methods.userInfo(acc).call();
        if (referrer != "0x0000000000000000000000000000000000000000") {
          toast.error("You are already register");
        } else if (ref === defaultReferral) {
          await contract.methods.register(ref).send({ from: acc });
          toast.success("Successfully Registered");
        } else {
          let refDeposit = await contract.methods.userInfo(ref).call();
          let deposit = refDeposit.totalDeposit;
          if (parseFloat(deposit) > 0) {
            await contract.methods.register(ref).send({ from: acc });
            toast.success("Successfully Registered");
          } else {
            toast.error("Your Referral address is not applicable");
          }
        }
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Registration Failed!");
    }
  };

  useEffect(() => {
    referral();
    refaddress();
  }, [acc]);
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-8 col-md-12">
          <div className="row  gap-3">
            <div className="col-md-12 col-12  input-box">
              <div className="row ">
                <div className="col-lg-3 col-md-3 col-2  ">
                  <h4 className="text-heading p-3 ">{t("walletAddress")}:</h4>
                </div>
                <div className=" col-lg-7 col-md-7 col-8  ">
                  <h4 className="text-address p-3 ">
                    {isWalletConnect
                      ? acc.slice(0, 25) + "..."
                      : t("connectWallet")}
                  </h4>
                </div>
                <div className=" col-lg-2 col-md-2 col-2">
                  <h4 className="p-3 text-end text-white">
                    <RefreshIcon />
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-12  input-box">
              <div className="row  ">
                <div className="col-lg-3 col-md-3 col-2">
                  <h4 className="text-heading p-3 ">{t("referralLink")}:</h4>
                </div>
                <div className="col-lg-7 col-md-7 col-8 ">
                  <h4 className="text-address p-3 ">
                    {refLink.slice(0, 50) + "..."}
                  </h4>
                </div>
                <div
                  className="col-lg-2 col-md-2 col-2 "
                  onClick={() => {
                    navigator.clipboard.writeText(refLink);
                  }}
                >
                  <h4 className="p-3 text-end text-white">
                    <FiCopy />
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-12  ">
              <div className="row d-flex justify-content-center ">
                <input
                  className="input-box ps-4"
                  style={{ height: "60px", width: "100%", color: "white" }}
                  value={ref}
                  onChange={(e) => {
                    handleRegisterReferral(e);
                  }}
                ></input>
              </div>
              <div className="d-flex justify-content-center mt-3 mb-3">
                <button
                  className="btn  btn-primary ps-5 pe-5 p-3"
                  style={{ fontSize: "20px" }}
                  onClick={handleRegister}
                >
                  {t("Register")}
                </button>
              </div>
              {/* <input className="input-box">
              </input> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WalletRef;
