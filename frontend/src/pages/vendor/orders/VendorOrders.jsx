import React from "react";
import Layout from "../layout";

const VendorOrders = () => {
  return (
    <Layout
      pageTitle="Vendor Dashboard"
      icon="bi bi-card-checklist"
      breadcrumb="Order Management"
    >
      <div className="col-md-12 bg-danger">
        <h1>Vendor Orders</h1>
      </div>
    </Layout>
  );
};

export default VendorOrders;
