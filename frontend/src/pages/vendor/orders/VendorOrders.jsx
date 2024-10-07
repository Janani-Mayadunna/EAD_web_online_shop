import React, { useState, useEffect } from "react";
import Layout from "../layout";
import DataTable from "react-data-table-component";
import ViewOrderModal from "./ViewOrderModal"; // Import the ViewOrderModal
import UpdateOrderModal from "./UpdateOrderModal"; // Import the UpdateOrderModal
import axios from "axios"; // Import Axios for API requests

const VendorOrders = () => {
  const [orders, setOrders] = useState([]); // Orders state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [selectedOrder, setSelectedOrder] = useState(null); // Selected order for viewing
  const [openViewModal, setOpenViewModal] = useState(false); // View modal state
  const [openUpdateModal, setOpenUpdateModal] = useState(false); // Update modal state

  // Fetch orders by vendor_id when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      const vendorId = localStorage.getItem("vendor_id"); // Get vendor ID from local storage
      const token = localStorage.getItem("vendor_token"); // Get token from local storage

      try {
        const response = await axios.get(
          `https://localhost:7282/api/order/orderItems/${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass token in headers
            },
          }
        );

        if (response.status === 200) {
          // Sort the orders by _id in descending order (latest first)
          const sortedOrders = response.data.sort((a, b) =>
            a._id < b._id ? 1 : -1
          );

          setOrders(sortedOrders); // Set the sorted orders
        }
        setLoading(false); // Disable loading state after fetching
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setError("Failed to load orders. Please try again.");
        setLoading(false); // Disable loading state on error
      }
    };

    fetchOrders();
  }, []); // Empty dependency array to ensure it runs only once on mount

  const columns = [
    {
      name: "Product Name",
      selector: (row) => row.name,
      sortable: true,
      style: {
        fontSize: "15px",
      },
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
      sortable: true,
      style: {
        fontSize: "15px",
      },
    },
    {
      name: "Price",
      selector: (row) => `$${row.price.toFixed(2)}`,
      sortable: true,
      style: {
        fontSize: "15px",
      },
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      style: {
        fontSize: "15px",
      },
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button
            className="btn btn-info"
            onClick={() => handleViewOrderModal(row)}
          >
            <i className="bi bi-eye"></i>
          </button>
          <button
            className="btn btn-success ms-2"
            onClick={() => handleUpdateOrderModal(row)}
          >
            <i className="bi bi-pencil-square"></i>
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const handleViewOrderModal = (order) => {
    setSelectedOrder(order); // Set the selected order
    setOpenViewModal(true); // Open the view modal
  };

  const handleUpdateOrderModal = (order) => {
    setSelectedOrder(order); // Set the selected order
    setOpenUpdateModal(true); // Open the update modal
  };

  const handleUpdateOrder = (updatedOrder) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    ); // Update the orders state with the new status
  };

  return (
    <Layout
      pageTitle="Vendor Dashboard"
      icon="bi bi-person-circle"
      breadcrumb="Vendor Orders"
    >
      <br />
      <br />
      {/* Data Table */}
      <div className="col-md-12" style={{ backgroundColor: "#f0f0f0" }}>
        {loading ? (
          <p>Loading orders...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <DataTable
            customStyles={{
              headCells: {
                style: {
                  fontSize: "16px",
                  fontWeight: "bold",
                  backgroundColor: "#e0e0e0",
                },
              },
              cells: {
                style: {
                  fontSize: "15px",
                },
              },
            }}
            columns={columns}
            data={orders}
            pagination={true}
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
            noDataComponent="No Orders Found"
          />
        )}
      </div>

      {/* View Order Modal */}
      {selectedOrder && (
        <ViewOrderModal
          show={openViewModal}
          handleClose={() => setOpenViewModal(false)}
          order={selectedOrder} // Pass the selected order details
        />
      )}

      {/* Update Order Modal */}
      {selectedOrder && (
        <UpdateOrderModal
          show={openUpdateModal}
          handleClose={() => setOpenUpdateModal(false)}
          order={selectedOrder}
          handleUpdateOrder={handleUpdateOrder} // Handle order update
        />
      )}
    </Layout>
  );
};

export default VendorOrders;
