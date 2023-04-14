import React from "react";
import Commission from "./commission";
import CommissionTable from "./commissionTable";
import TotalCommission from "./totalCommission";
import TotalEarned from "./TotalEarned";

function Index() {
  return (
    <>
      <div className="" id="commission">
        <Commission />
        <TotalCommission />
        <TotalEarned />
        {/* <CommissionTable /> */}
      </div>
    </>
  );
}

export default Index;
