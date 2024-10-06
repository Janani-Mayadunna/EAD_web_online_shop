import React from "react";
import Layout from "../layout";

const VendorDashboard = () => {
  return (
    <Layout
      pageTitle="Vendor Dashboard"
      icon="bi bi-house-door"
      breadcrumb="Dashboard"
    >
      <div className="container-fluid mt-4">
        <br />
        <br />

        {/* Top Row: Key Metrics */}
        <div className="row">
          <div className="col-md-3">
            <div
              className="card p-4 mb-4 shadow-sm text-center bg-white"
              style={{ borderRadius: "0px" }}
            >
              <i className="bi bi-box-seam fs-2 text-primary mb-3"></i>
              <h5 className="text-dark">Total Products</h5>
              <h2 className="text-primary">58</h2>
            </div>
          </div>
          <div className="col-md-3">
            <div
              className="card p-4 mb-4 shadow-sm text-center bg-white"
              style={{ borderRadius: "0px" }}
            >
              <i className="bi bi-currency-dollar fs-2 text-success mb-3"></i>
              <h5 className="text-dark">Total Sales</h5>
              <h2 className="text-success">$12,500</h2>
            </div>
          </div>
          <div className="col-md-3">
            <div
              className="card p-4 mb-4 shadow-sm text-center bg-white"
              style={{ borderRadius: "0px" }}
            >
              <i className="bi bi-cart fs-2 text-warning mb-3"></i>
              <h5 className="text-dark">New Orders</h5>
              <h2 className="text-warning">15</h2>
            </div>
          </div>
          <div className="col-md-3">
            <div
              className="card p-4 mb-4 shadow-sm text-center bg-white"
              style={{ borderRadius: "0px" }}
            >
              <i className="bi bi-chat-left-text fs-2 text-info mb-3"></i>
              <h5 className="text-dark">Customer Reviews</h5>
              <h2 className="text-info">120</h2>
            </div>
          </div>
        </div>

        <br />
        <br />
        {/* Sales Overview Section */}
        <div className="row">
          <div className="col-md-8 mb-4">
            <div
              className="card p-4 shadow-sm bg-white"
              style={{ borderRadius: "0px" }}
            >
              <h5 className="mb-2 text-dark">Sales Overview (Per Product)</h5>
              <hr />
              <div className="mt-2 d-flex flex-column">
                {["Product A", "Product B", "Product C", "Product D"].map(
                  (product, index) => {
                    const percentages = [75, 50, 90, 60];
                    return (
                      <div className="mb-3" key={index}>
                        <div className="d-flex justify-content-between">
                          <span>{product}</span>
                          <span>{percentages[index]}%</span>
                        </div>
                        <div className="progress">
                          <div
                            className="progress-bar bg-primary"
                            role="progressbar"
                            style={{ width: `${percentages[index]}%` }}
                            aria-valuenow={percentages[index]}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>

          {/* Review Distribution Section */}
          <div className="col-md-4 mb-4">
            <div
              className="card p-4 shadow-sm bg-white"
              style={{ borderRadius: "0px" }}
            >
              <h5 className="mb-2 text-dark">Review Distribution</h5>
              <hr />
              <div className="mt-2 d-flex flex-column">
                {[
                  { stars: "5 Stars", percentage: 60 },
                  { stars: "4 Stars", percentage: 25 },
                  { stars: "3 Stars", percentage: 10 },
                  { stars: "2 Stars", percentage: 3 },
                  { stars: "1 Star", percentage: 2 },
                ].map((review, index) => (
                  <div className="mb-3" key={index}>
                    <div className="d-flex justify-content-between">
                      <span>{review.stars}</span>
                      <span>{review.percentage}%</span>
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar bg-info"
                        role="progressbar"
                        style={{ width: `${review.percentage}%` }}
                        aria-valuenow={review.percentage}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VendorDashboard;
