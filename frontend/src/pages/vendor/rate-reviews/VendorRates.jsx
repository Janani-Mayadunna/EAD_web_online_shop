import React from "react";
import Layout from "../layout";

const VendorRates = () => {
  return (
    <Layout
      pageTitle="Vendor Dashboard"
      icon="bi bi-star-half"
      breadcrumb="Rates & Reviews"
    >
      <div className="col-md-12 bg-danger">
        <h1>Vendor Rates & Reviews</h1>
      </div>
    </Layout>
  );
};

export default VendorRates;