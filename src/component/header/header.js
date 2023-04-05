import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectionAction } from "../../Redux/connection/actions";
import Logo from "../../assets/images/EstrellaTera_logo-01.svg";
import "./header.css";
function Header() {
  const dispatch = useDispatch();
  let acc = useSelector((state) => state.connect?.connection);
  const connectWallet = () => {
    dispatch(connectionAction());
  };
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={Logo} className="img-fluid" alt="" width={"70px"} />
          </a>
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
                <a className="nav-link " aria-current="page" href="#whatIsEta">
                  What is ETA
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#commission">
                  Comission
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="#etaPortfolio">
                  ETA Portfolio
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link ">Telegram</a>
              </li>
              <li className="nav-item">
                <a className="nav-link ">Discord</a>
              </li>
              <li className="nav-item">
                <a className="nav-link ">Faq</a>
              </li>
            </ul>
            <div className="d-flex">
              <button className="btn btn-Connect p-2" onClick={connectWallet}>
                {acc === "No Wallet"
                  ? "Connect Wallet"
                  : acc === "Connect Wallet"
                  ? "Connect Wallet"
                  : acc === "Wrong Network"
                  ? acc
                  : acc.substring(0, 3) + "..." + acc.substring(acc.length - 3)}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
