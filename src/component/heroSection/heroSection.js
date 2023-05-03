import React from "react";
import picture from "../../assets/images/background-01.svg";
import "./hero.css";
import EtaLogo from "../../assets/images/etalogo.png";

function Herosection() {
  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-md-4 mt-5 ">
          <div>
            <img src={EtaLogo} className="img-fluid" width={"500px"} />
          </div>
        </div>
        <div className="col-md-8">
          <img src={picture} className="img-fluid" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Herosection;
