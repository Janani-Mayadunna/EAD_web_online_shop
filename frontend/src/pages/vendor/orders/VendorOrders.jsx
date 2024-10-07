import React, { useState, useEffect } from "react";
import Layout from "../layout";
import DataTable from "react-data-table-component";
import ViewOrderModal from "./ViewOrderModal"; 
import UpdateOrderModal from "./UpdateOrderModal"; 
import axios from "axios"; 

const VendorOrders = () => {
  const [orders, setOrders] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [selectedOrder, setSelectedOrder] = useState(null); 
  const [openViewModal, setOpenViewModal] = useState(false); 
  const [openUpdateModal, setOpenUpdateModal] = useState(false); 

  // Fetch orders by vendor_id when the component mounts
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
          const sortedOrders = response.data.sort((a, b) =>
            a._id < b._id ? 1 : -1
          );

          setOrders(sortedOrders); 
        }
        setLoading(false); 
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setError("Failed to load orders. Please try again.");
        setLoading(false); 
      }
    };

    fetchOrders();
  }, []); 

  // Filter orders based on status
  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  );
  const canceledOrders = orders.filter((order) => order.status === "Canceled");
  const processingOrders = orders.filter(
    (order) => order.status === "Processing"
  );

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
      {/* Data Table for Processing Orders */}
      <h4>New Orders</h4>
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
            data={processingOrders}
            pagination={true}
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
            noDataComponent="No Processing Orders Found"
          />
        )}
      </div>

      {/* Data Table for Delivered Orders */}
      <h4>Delivered Orders</h4>
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
            data={deliveredOrders}
            pagination={true}
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
            noDataComponent="No Delivered Orders Found"
          />
        )}
      </div>

      {/* Data Table for Canceled Orders */}
      <h4>Canceled Orders</h4>
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
            data={canceledOrders}
            pagination={true}
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
            noDataComponent="No Canceled Orders Found"
          />
        )}
      </div>

      {/* View Order Modal */}
      {selectedOrder && (
        <ViewOrderModal
          show={openViewModal}
          handleClose={() => setOpenViewModal(false)}
          order={selectedOrder} 
        />
      )}

      {/* Update Order Modal */}
      {selectedOrder && (
        <UpdateOrderModal
          show={openUpdateModal}
          handleClose={() => setOpenUpdateModal(false)}
          order={selectedOrder}
          handleUpdateOrder={handleUpdateOrder} 
        />
      )}
    </Layout>
  );
};

export default VendorOrders;
