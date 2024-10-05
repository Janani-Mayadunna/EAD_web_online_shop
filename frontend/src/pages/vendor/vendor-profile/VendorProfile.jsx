import React from "react";
import Layout from "../layout";

const VendorProfile = () => {
  return (
    <Layout
      pageTitle="Vendor Dashboard"
      icon="bi bi-person-circle"
      breadcrumb="Vendor Profile"
    >
      <div className="col-md-12 bg-danger">
        <h1>Vendor Profile</h1>
      </div>
    </Layout>
  );
};

export default VendorProfile;
