import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectionAction } from "../../Redux/connection/actions";
import Logo from "../../assets/images/etaheader.png";
import "./header.css";
import { useTranslation } from "react-i18next";
function Header() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  let { acc, isWalletConnect } = useSelector((state) => state.connect);
  const connectWallet = () => {
    dispatch(connectionAction());
  };
  let [lan, setLan] = useState("")
  function handleClick(lang) {
    i18n.changeLanguage(lang);
    setLan(lang)
  }
  useEffect(() => {
    setLan(i18n.language)
  }, [])
  return (
    <div style={{ background: "#303493" }}>
      <div className="container">
        <nav className="navbar navbar-expand-lg ">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img src={Logo} className="img-fluid" alt="" width={"70px"} />
            </a>
            <div className=" mobile-connect-btn">
                <button className="btn btn-Connect p-2" onClick={connectWallet}>
                  {acc === "No Wallet"
                    ? t("connectWallet")
                    : acc === "Connect Wallet"
                      ? t("connectWallet")
                      : acc === "Wrong Network"
                        ? acc
                        : acc.substring(0, 3) + "..." + acc.substring(acc.length - 3)}
                </button>
              </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
              
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav m-auto mb-2 mb-lg-0 gap-3">
                <li className="nav-item">
                  <a className="nav-link " aria-current="page" href={i18n.language  == "en"  ?  "/Estrella Tera (ETA)  v5.1.pdf" : "/兆星平台 ETA 股权计划 v5.1.pdf"} download>
                    {t("nav_first_link")}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#commission">
                    {t("nav_second_link")}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link " href="#etaPortfolio">
                    {t("nav_third_link")}
                  </a>
                </li>
                <li className="nav-item">
                  {
                    i18n.language  == "en" ? 
                    <a className="nav-link ">Telegram</a>
                    :
                    <a className="nav-link " href="/letsvpn-latest.apk" download>下载快连</a>
                  }
                </li>
                <li className="nav-item">
                  {
                    i18n.language  == "en" ? 
                    <a className="nav-link ">Discord</a>
                    :
                    <a className="nav-link" href="/TokenPocket-pro.apk"  download>下载TP钱包</a>
                  }
                  
                </li>
                <li className="nav-item">
                  <a className="nav-link ">{t("nav_sixth_link")}</a>
                </li>
                <li className="nav-item nav-link " style={{ background: "#303493" }}>
                  <select class="form-select text-light" style={{ background: "#303493" }}
                    aria-label="Default select example"
                    onChange={(e) => handleClick(e.target.value)}
                    value={lan}
                  >
                    <option selected value="en">English</option>
                    <option value="chi">Chinese</option>
                    {/* <option value="vi">Vietnam</option>
                    <option value="ms">Malay</option>
                    <option value="sp">Spanish</option> */}

                  </select>
                </li>
              </ul>
              <div className=" lp-connect-btn">
                <button className="btn btn-Connect p-2" onClick={connectWallet}>
                  {acc === "No Wallet"
                    ? t("connectWallet")
                    : acc === "Connect Wallet"
                      ? t("connectWallet")
                      : acc === "Wrong Network"
                        ? acc
                        : acc.substring(0, 3) + "..." + acc.substring(acc.length - 3)}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
