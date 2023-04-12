import React, { useEffect, useState } from "react";
import "./wallet.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

// import { connectionAction } from "../../Redux/connection/actions";
import { contractAddress, contractAddressAbi } from "../utils/contractaddress";

function WalletRef() {
  const [ref, setRef] = useState("0x000000000000000000000000");
  const [refLink, setRefLink] = useState(`${window.location.href}`);
  const [checkDeposit, setCheckDeposit] = useState(false);
  let acc = useSelector((state) => state.connect?.connection);
  console.log(acc);

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
        if (ref === defaultReferral) {
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
                <div className="col-lg-4 col-md-5 col-12  ">
                  <h4 className="text-heading p-3 ">Wallet Address:</h4>
                </div>
                <div className=" col-lg-8 col-md-7 col-12  ">
                  <h4 className="text-address p-3 "> {acc}</h4>
                </div>
                {/* 
                <p className="text-address p-3">
                 
                </p> */}
              </div>
            </div>
            <div className="col-md-12 col-12  input-box">
              <div className="row  ">
                <div className="col-lg-4 col-md-4 col-12">
                  <h4 className="text-heading p-3 ">Referral Link:</h4>
                </div>
                <div className="col-lg-8 col-md-8 col-12 ">
                  <h4 className="text-address p-3 ">{refLink}</h4>
                </div>
                {/* 
                <p className="text-address p-3">
                 
                </p> */}
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
                  Register
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
