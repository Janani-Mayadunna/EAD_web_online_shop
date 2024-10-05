import React, { useState } from "react";
import Layout from "../layout";
import DataTable from "react-data-table-component";
import { tableCustomStyles } from "../../tableStyle";
import productsData from "../../data/products.json"; // Import product data
import UpdateProductModal from "./UpdateProductModal"; // Import the correct modal
import AddProductModal from "./AddProductModal"; // Import the AddProductModal

const VendorProducts = () => {
  const [openUpdateStockModal, setOpenUpdateStockModal] = useState(false);
  const [openAddProductModal, setOpenAddProductModal] = useState(false); // State to handle AddProductModal
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState(productsData); // State for products

  // Sample categories
  const categories = [
    { id: "66fc61d9b67592916261843d", name: "Electronics" },
    { id: "66fc61d9b67592916261843e", name: "Furniture" },
    // Add more categories as needed
  ];

  // Function to handle product deletion
  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    console.log("Product deleted:", id);
  };

  const columns = [
    {
      name: "Product",
      selector: (row) => (
        <img
          className="cart-product-img"
          src={
            row.images.length > 0
              ? row.images[0]
              : "https://via.placeholder.com/120"
          }
          alt={row.name}
          style={{
            height: "100px",
            width: "120px",
            marginTop: "5px",
            marginBottom: "5px",
          }}
        />
      ),
    },
    {
      name: "Product Name",
      selector: (row) => row.name,
      sortable: true,
      style: {
        fontSize: "16px",
      },
    },
    {
      name: "Category",
      selector: (row) => row.category.name,
      sortable: true,
      style: {
        fontSize: "16px",
      },
    },
    {
      name: "Price",
      selector: (row) => `$${row.price.toFixed(2)}`,
      sortable: true,
      style: {
        fontSize: "16px",
      },
    },
    {
      name: "Stock",
      selector: (row) => row.inventoryCount,
      sortable: true,
      style: {
        fontSize: "16px",
      },
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button
            className="btn btn-success me-2"
            onClick={() => handleUpdateStockModalOpen(row)}
          >
            <i className="bi bi-pencil-square"></i>
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleDeleteProduct(row.id)}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const handleUpdateStockModalOpen = (product) => {
    setSelectedProduct(product);
    setOpenUpdateStockModal(true);
  };

  const handleAddProductClick = () => {
    setOpenAddProductModal(true); // Open the AddProductModal when the button is clicked
  };

  return (
    <Layout
      pageTitle="Vendor Dashboard"
      icon="bi bi-box-seam"
      breadcrumb="Product Management"
    >
      {/* Add Product Button */}
      <div className="mb-3 d-flex justify-content-end">
        <button className="btn btn-primary" onClick={handleAddProductClick}>
          Add Products
        </button>
      </div>

      {/* Data Table */}
      <div className="col-md-12" style={{ backgroundColor: "#f0f0f0" }}>
        <DataTable
          customStyles={{
            headCells: {
              style: {
                fontSize: "18px",
                fontWeight: "bold",
                backgroundColor: "#e0e0e0",
              },
            },
            cells: {
              style: {
                fontSize: "16px",
              },
            },
          }}
          columns={columns}
          data={products}
          pagination={true}
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 20, 30, 40]}
          noDataComponent="No Products Found"
        />
      </div>

      {/* Update Product Modal */}
      {selectedProduct && (
        <UpdateProductModal
          show={openUpdateStockModal} // The same state can control the modal visibility
          handleClose={() => setOpenUpdateStockModal(false)} // Close modal
          product={selectedProduct} // Pass the selected product to the modal
          categories={categories} // Pass the available categories to the modal
          handleUpdateProduct={(updatedProduct) => {
            // Update the product list after the product is edited
            setProducts((prevProducts) =>
              prevProducts.map((prod) =>
                prod.id === updatedProduct.id ? updatedProduct : prod
              )
            );
            setOpenUpdateStockModal(false); // Close the modal after updating
          }}
        />
      )}

      {/* Add Product Modal */}
      <AddProductModal
        show={openAddProductModal}
        handleClose={() => setOpenAddProductModal(false)}
        categories={categories} // Pass categories prop to the AddProductModal
        handleAddProduct={(newProduct) => {
          setProducts((prevProducts) => [...prevProducts, newProduct]); // Add the new product to the list
          setOpenAddProductModal(false);
        }}
      />
    </Layout>
  );
};

export default VendorProducts;
