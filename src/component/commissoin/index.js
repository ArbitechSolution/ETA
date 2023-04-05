import React from "react";
import Commission from "./commission";
import CommissionTable from "./commissionTable";
import TotalCommission from "./totalCommission";

function Index() {
  return (
    <>
      <div className="" id="commission">
        <Commission />
        <TotalCommission />
        <CommissionTable />
      </div>
    </>
  );
}

export default Index;
