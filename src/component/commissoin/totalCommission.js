import React, { useState } from "react";
import { contractAddress, contractAddressAbi } from "../utils/contractaddress";
import { usdtTokenAdd, usdtTokenAbi } from "../utils/contractUsdtToken";
import {
  usdaceTokenAdd,
  usdaceTokenAddAbi,
} from "../utils/contractUsdaceToken";
import { contractTokenAdd, contractTokenAddAbi } from "../utils/contractToken";
function TotalCommission() {
  const[totalEarn, setTotalEarn ] = useState()
  return (
    <div className="mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12 box-backgorund">
            <div className="d-flex justify-content-between">
              <div className="p-2 text-unit">Total Commission Earned:</div>
              <div className="p-2 text-value  ">525 USDT</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TotalCommission;
