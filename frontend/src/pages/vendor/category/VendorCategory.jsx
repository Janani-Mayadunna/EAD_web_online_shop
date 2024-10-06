import React, { useState, useEffect } from "react";
import Layout from "../layout";
import DataTable from "react-data-table-component";
import AddCategoryModal from "./AddCategoryModal";
import UpdateCategoryModal from "./UpdateCategoryModal";
import axios from "axios"; // Import Axios
import "./VendorCategory.css";

const VendorCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [openUpdateCategoryModal, setOpenUpdateCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Fetch categories from the API
        const response = await axios.get(
          "https://localhost:7282/api/category",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("vendor_token")}`,
            },
          }
        );
        setCategories(response.data); // Update the categories state with the fetched data
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch categories");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array ensures it runs only once on mount

  const handleAddCategoryClick = () => {
    setOpenAddCategoryModal(true);
  };

  const handleUpdateCategoryClick = (category) => {
    setSelectedCategory(category);
    setOpenUpdateCategoryModal(true);
  };

  const columns = [
    {
      name: "Category Name",
      selector: (row) => row.name,
      sortable: true,
      style: {
        fontSize: "15px",
      },
    },
    {
      name: "Active Status",
      selector: (row) =>
        row.isActive ? (
          <span className="badge badge-success">Active</span>
        ) : (
          <span className="badge badge-danger">Inactive</span>
        ),
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
            className="btn btn-success me-2"
            onClick={() => handleUpdateCategoryClick(row)}
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

  return (
    <Layout
      pageTitle="Vendor Dashboard"
      icon="bi bi-tags"
      breadcrumb="Category Management"
    >
      {/* Add Category Button */}
      <div className="mb-3 d-flex justify-content-end">
        <button className="btn btn-primary" onClick={handleAddCategoryClick}>
          Add Product Category
        </button>
      </div>

      {/* Data Table */}
      <div className="col-md-12" style={{ backgroundColor: "#f0f0f0" }}>
        {loading ? (
          <p>Loading categories...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <DataTable
            columns={columns}
            data={categories}
            pagination={true}
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 20, 30, 45, 50]}
            noDataComponent="No Categories Found"
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
          />
        )}
      </div>

      {/* Add Category Modal */}
      <AddCategoryModal
        show={openAddCategoryModal}
        handleClose={() => setOpenAddCategoryModal(false)}
        handleAddCategory={(newCategory) => {
          setCategories([...categories, newCategory]);
          setOpenAddCategoryModal(false);
        }}
      />

      {/* Update Category Modal */}
      {selectedCategory && (
        <UpdateCategoryModal
          show={openUpdateCategoryModal}
          handleClose={() => setOpenUpdateCategoryModal(false)}
          category={selectedCategory}
          handleUpdateCategory={(updatedCategory) => {
            setCategories(
              categories.map((cat) =>
                cat.id === updatedCategory.id ? updatedCategory : cat
              )
            );
            setOpenUpdateCategoryModal(false);
          }}
        />
      )}
    </Layout>
  );
};

export default VendorCategory;
