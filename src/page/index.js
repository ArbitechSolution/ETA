import React from "react";
import Footer from "../component/footer/footer";
import Header from "../component/header/header";
import Herosection from "../component/heroSection/heroSection";
import WalletRef from "../component/walletReference/index";
import WhatIsEta from "../component/whatIsEta/index";
import Commission from "../component/commissoin/index";
import EtaPortfolio from "../component/etaPortfolio/index";
import "./mainPage.css";

function MainPage() {
  return (
    <>
      <Header />
      <div style={{ background: "#32065B" }}>
        <Herosection />
        <WalletRef />
        <WhatIsEta />
        <Commission />
        <EtaPortfolio />
        <Footer />
      </div>
    </>
  );
}

export default MainPage;
