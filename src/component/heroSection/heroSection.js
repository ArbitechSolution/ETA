import React from "react";
import picture from "../../assets/images/background-01.svg";
import "./hero.css";

function Herosection() {
  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-md-4 mt-5 ">
          <div>
            <h6 className="title-hero">The Best Trade Cryptocurrency Assets</h6>
          </div>
          <div className=" mobile-button mt-2">
            <button className="btn btn-started">Get Started</button>
          </div>
        </div>
        <div className="col-md-8">
          <img src={picture} className="img-fluid" alt=""/>
        </div>
      </div>
    </div>
  );
}

export default Herosection;
