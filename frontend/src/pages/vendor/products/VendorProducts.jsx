import React from "react";
import Layout from "../layout";

const VendorProducts = () => {
  return (
    <Layout
      pageTitle="Vendor Dashboard"
      icon="bi bi-box-seam"
      breadcrumb="Product Management"
    >
      <div className="col-md-12 bg-danger">
        <h1>Vendor Category</h1>
      </div>
    </Layout>
  );
};

export default VendorProducts;
