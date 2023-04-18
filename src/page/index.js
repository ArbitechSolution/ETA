import React from "react";
import Footer from "../component/footer/footer";
import Header from "../component/header/header";
import Herosection from "../component/heroSection/heroSection";
import WalletRef from "../component/walletReference/index";
import WhatIsEta from "../component/whatIsEta/index";
import Commission from "../component/commissoin/index";
import EtaPortfolio from "../component/etaPortfolio/index";
import "./mainPage.css";
import EtaWithdraw from "../component/ETAWithdraw/ETAWithdraw";

function MainPage() {
  return (
    <>
      <Header />
      <div style={{ background: "#fff" }}>
        <Herosection />
        <WalletRef />
        <WhatIsEta />
        <Commission />
        <EtaWithdraw/>
        <EtaPortfolio />
        <Footer />
      </div>
    </>
  );
}

export default MainPage;
