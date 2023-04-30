import React from "react";
import { useTranslation } from "react-i18next";

function TotalCommission() {
  const { t, i18n } = useTranslation();

  return (
    <div className="mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12 box-backgorund">
            <div className="d-flex justify-content-center">
              <div className="p-2 text-unit">{t("totalCommissionEar")}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TotalCommission;
