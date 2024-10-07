import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../layout";
import { useNavigate } from "react-router-dom";

const VendorDashboard = () => {
  const [productsCount, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [newOrdersCount, setNewOrdersCount] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [orderStatusCounts, setOrderStatusCounts] = useState({});
  const [topSellingProducts, setTopSellingProducts] = useState([]);

  // Possible order statuses
  const possibleStatuses = ["Processing", "Delivered", "Completed", "Canceled"];

  const navigate = useNavigate(); // Hook for navigating to different routes

  // Check if vendor_id and vendor_token are in localStorage
  useEffect(() => {
    const vendorId = localStorage.getItem("vendor_id");
    const token = localStorage.getItem("vendor_token");

    if (!vendorId || !token) {
      // If vendor_id or token is missing, redirect to login page
      navigate("/vendor-login");
    }
  }, [navigate]);

  // Fetch products by vendor_id and count
  useEffect(() => {
    const fetchProducts = async () => {
      const vendorId = localStorage.getItem("vendor_id");
      const token = localStorage.getItem("vendor_token");

      try {
        const response = await axios.get(
          `https://localhost:7282/api/product/vendor/${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProductsCount(response.data.length); // Count the number of products
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Fetch orders by vendor_id and count
  useEffect(() => {
    const fetchOrders = async () => {
      const vendorId = localStorage.getItem("vendor_id");
      const token = localStorage.getItem("vendor_token");

      try {
        const response = await axios.get(
          `https://localhost:7282/api/order/orderItems/${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const orders = response.data;

          // Count total sales (completed orders)
          const completedOrders = orders.filter(
            (order) => order.status === "Completed"
          );
          setTotalSales(completedOrders.length);

          // Count new orders (processing status)
          const processingOrders = orders.filter(
            (order) => order.status === "Processing"
          );
          setNewOrdersCount(processingOrders.length);

          // Set total orders count
          setOrdersCount(orders.length);

          // Calculate order status distribution
          const statusCounts = orders.reduce((acc, order) => {
            acc[order.status] = (acc[order.status] || 0) + 1;
            return acc;
          }, {});

          // Ensure all possible statuses are present in the statusCounts
          possibleStatuses.forEach((status) => {
            if (!statusCounts[status]) {
              statusCounts[status] = 0;
            }
          });

          setOrderStatusCounts(statusCounts);

          // Calculate top-selling products by quantity sold
          const productSales = orders.reduce((acc, order) => {
            if (!acc[order.name]) {
              acc[order.name] = { quantity: 0, image: order.images[0] };
            }
            acc[order.name].quantity += order.quantity;
            return acc;
          }, {});
          const topProducts = Object.entries(productSales)
            .sort((a, b) => b[1].quantity - a[1].quantity)
            .slice(0, 5); // Get top 5 products
          setTopSellingProducts(topProducts);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Fetch vendor ratings and reviews count
  useEffect(() => {
    const fetchVendorData = async () => {
      const vendorId = localStorage.getItem("vendor_id");
      const token = localStorage.getItem("vendor_token");

      try {
        const response = await axios.get(
          `https://localhost:7282/api/vendor/${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const vendorData = response.data;

          // Directly get total reviews from the ratings object
          const totalReviews = vendorData.ratings.totalReviews || 0;
          setReviewsCount(totalReviews);
        }
      } catch (error) {
        console.error("Failed to fetch vendor data:", error);
      }
    };

    fetchVendorData();
  }, []);

  return (
    <Layout
      pageTitle="Vendor Dashboard"
      icon="bi bi-house-door"
      breadcrumb="Dashboard"
    >
      <div
        className="container-fluid mt-4"
        style={{ backgroundColor: "#f0f0f0", padding: "30px" }}
      >
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
              <h2 className="text-primary">{productsCount}</h2>
            </div>
          </div>
          <div className="col-md-3">
            <div
              className="card p-4 mb-4 shadow-sm text-center bg-white"
              style={{ borderRadius: "0px" }}
            >
              <i className="bi bi-currency-dollar fs-2 text-success mb-3"></i>
              <h5 className="text-dark">Completed Orders</h5>
              <h2 className="text-success">{totalSales}</h2>
            </div>
          </div>
          <div className="col-md-3">
            <div
              className="card p-4 mb-4 shadow-sm text-center bg-white"
              style={{ borderRadius: "0px" }}
            >
              <i className="bi bi-cart fs-2 text-warning mb-3"></i>
              <h5 className="text-dark">New Orders</h5>
              <h2 className="text-warning">{newOrdersCount}</h2>
            </div>
          </div>
          <div className="col-md-3">
            <div
              className="card p-4 mb-4 shadow-sm text-center bg-white"
              style={{ borderRadius: "0px" }}
            >
              <i className="bi bi-chat-left-text fs-2 text-info mb-3"></i>
              <h5 className="text-dark">Customer Reviews</h5>
              <h2 className="text-info">{reviewsCount}</h2>
            </div>
          </div>
        </div>

        <br />
        <br />
        {/* Order Status Distribution Section */}
        <div className="row">
          <div className="col-md-6 mb-4">
            <div
              className="card p-4 shadow-sm bg-white"
              style={{ borderRadius: "0px" }}
            >
              <h5 className="mb-2 text-dark">Order Status Distribution</h5>
              <hr />
              <div className="mt-2 d-flex flex-column">
                {possibleStatuses.map((status, index) => (
                  <div className="mb-3" key={index}>
                    <div className="d-flex justify-content-between">
                      <span>{status}</span>
                      <span>{orderStatusCounts[status] || 0}</span>
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{
                          width: `${
                            (orderStatusCounts[status] / ordersCount) * 100 || 0
                          }%`,
                        }}
                        aria-valuenow={
                          (orderStatusCounts[status] / ordersCount) * 100 || 0
                        }
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Selling Products Section */}
          <div className="col-md-6 mb-4">
            <div
              className="card p-4 shadow-sm bg-white"
              style={{ borderRadius: "0px" }}
            >
              <h5 className="mb-2 text-dark">Top Selling Products</h5>
              <hr />
              <div className="mt-2 d-flex flex-column">
                {topSellingProducts.map(([product, data], index) => (
                  <div className="mb-3" key={index}>
                    <div className="d-flex justify-content-between align-items-center">
                      <span>{product}</span>
                      <img
                        src={data.image || "https://via.placeholder.com/50"}
                        alt={product}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                      <span>{data.quantity} sold</span>
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
