import React, { useState } from "react";
import Layout from "../layout";
import DataTable from "react-data-table-component";
import ViewOrderModal from "./ViewOrderModal"; // Import the ViewOrderModal

// Sample response for orders
const sampleOrders = [
  {
    id: "67002704266a87a05bc166a0",
    productId: "66fc631eb675929162618440",
    name: "IPhone X",
    quantity: 1,
    price: 500,
    status: "Canceled",
    images: [],
  },
  {
    id: "67004857ae07389cecbeca18",
    productId: "6700481bae07389cecbeca17",
    name: "Laptop 1",
    quantity: 1,
    price: 204000,
    status: "Processing",
    images: ["image_1.jpg", "image_2.jpg"],
  },
  {
    id: "6701a2aad819e459f8e91abc",
    productId: "6700481bae07389cecbeca17",
    name: "Laptop 1",
    quantity: 1,
    price: 204000,
    status: "Processing",
    images: ["image_1.jpg", "image_2.jpg"],
  },
];

const VendorOrders = () => {
  const [orders, setOrders] = useState(sampleOrders); // Orders state
  const [selectedOrder, setSelectedOrder] = useState(null); // Selected order for viewing
  const [openViewModal, setOpenViewModal] = useState(false); // Modal state

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
            onClick={() => handleViewOrderModal(row)}
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
    setOpenViewModal(true); // Open the modal
  };

  return (
    <Layout
      pageTitle="Vendor Dashboard"
      icon="bi bi-person-circle"
      breadcrumb="Vendor Orders"
    >
      {/* Data Table */}
      <div className="col-md-12" style={{ backgroundColor: "#f0f0f0" }}>
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
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
          noDataComponent="No Orders Found"
        />
      </div>

      {/* View Order Modal */}
      {selectedOrder && (
        <ViewOrderModal
          show={openViewModal}
          handleClose={() => setOpenViewModal(false)}
          order={selectedOrder} // Pass the selected order details
        />
      )}
    </Layout>
  );
};

export default VendorOrders;
