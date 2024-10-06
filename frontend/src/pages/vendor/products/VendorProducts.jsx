import React, { useState, useEffect } from "react";
import Layout from "../layout";
import DataTable from "react-data-table-component";
import axios from "axios"; // Import Axios
import UpdateProductModal from "./UpdateProductModal"; // Import the UpdateProductModal
import AddProductModal from "./AddProductModal"; // Import the AddProductModal

const VendorProducts = () => {
  const [products, setProducts] = useState([]); // State for products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openUpdateStockModal, setOpenUpdateStockModal] = useState(false);
  const [openAddProductModal, setOpenAddProductModal] = useState(false); // State to handle AddProductModal
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products by vendor_id
  useEffect(() => {
    const fetchProducts = async () => {
      const vendorId = localStorage.getItem("vendor_id"); // Retrieve vendor_id from localStorage
      const token = localStorage.getItem("vendor_token"); // Retrieve token from localStorage

      try {
        const response = await axios.get(
          `https://localhost:7282/api/product/vendor/${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(response.data); // Set the products from API response
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures it runs only once on mount

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    console.log("Product deleted:", id);
  };

  const handleUpdateStockModalOpen = (product) => {
    setSelectedProduct(product);
    setOpenUpdateStockModal(true);
  };

  const handleAddProductClick = () => {
    setOpenAddProductModal(true); // Open the AddProductModal when the button is clicked
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
      // Check if the product has a category and fallback to "Uncategorized"
      selector: (row) =>
        row.category && row.category.name ? row.category.name : "Uncategorized",
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
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
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
        )}
      </div>

      {/* Update Product Modal */}
      {selectedProduct && (
        <UpdateProductModal
          show={openUpdateStockModal} // The same state can control the modal visibility
          handleClose={() => setOpenUpdateStockModal(false)} // Close modal
          product={selectedProduct} // Pass the selected product to the modal
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
        handleAddProduct={(newProduct) => {
          setProducts((prevProducts) => [...prevProducts, newProduct]); // Add the new product to the list
          setOpenAddProductModal(false);
        }}
      />
    </Layout>
  );
};

export default VendorProducts;
