import React from "react";
import Layout from "../layout";

const VendorCategory = () => {
  return (
    <Layout
      pageTitle="Vendor Dashboard"
      icon="bi bi-tags"
      breadcrumb="Category Management"
    >
      <div className="col-md-12 bg-danger">
        <h1>Vendor Category</h1>
      </div>
    </Layout>
  );
};

export default VendorCategory;
