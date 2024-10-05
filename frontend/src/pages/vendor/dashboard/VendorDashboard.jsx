import React from "react";
import Layout from "../layout";

const VendorDashboard = () => {
  return (
    <Layout
      pageTitle="Vendor Dashboard"
      icon="bi bi-house-door" 
      breadcrumb="Dashboard"
    >
      <div className="col-md-12 bg-danger">
        <h1>Vendor Dashboard</h1>

      </div>
    </Layout>
  );
};

export default VendorDashboard;
