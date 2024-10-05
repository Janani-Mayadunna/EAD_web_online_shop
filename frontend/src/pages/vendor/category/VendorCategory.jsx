import React, { useState } from "react";
import Layout from "../layout";
import DataTable from "react-data-table-component";
import AddCategoryModal from "./AddCategoryModal";
import UpdateCategoryModal from "./UpdateCategoryModal";
//D:\SLIIT\Y4S2\EAD\Assignment\WebApp\EAD_web_online_shop\frontend\src\pages\vendor\category\VendorCategory.css
import "./VendorCategory.css";

// Sample data for categories
const sampleCategories = [
  { id: "1", name: "Laptops", isActive: true },
  { id: "2", name: "Smartphones", isActive: true },
  { id: "3", name: "Accessories", isActive: false },
  { id: "4", name: "Smart Watches", isActive: true },
  { id: "5", name: "Tablets", isActive: true },
  { id: "6", name: "Desktops", isActive: false },
  { id: "7", name: "Printers", isActive: true },
  { id: "8", name: "Scanners", isActive: true },
  { id: "9", name: "Storage Devices", isActive: true },
  { id: "10", name: "Networking Devices", isActive: true },
];

const VendorCategory = () => {
  const [categories, setCategories] = useState(sampleCategories);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [openUpdateCategoryModal, setOpenUpdateCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleAddCategoryClick = () => {
    setOpenAddCategoryModal(true);
  };

  const handleUpdateCategoryClick = (category) => {
    setSelectedCategory(category);
    setOpenUpdateCategoryModal(true);
  };

  const handleDeleteCategory = (id) => {
    const updatedCategories = categories.filter(
      (category) => category.id !== id
    );
    setCategories(updatedCategories);
  };

  const columns = [
    {
      name: "Category Name",
      selector: (row) => row.name,
      sortable: true,
      style: {
        fontSize: "16px",
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
        fontSize: "16px",
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
          <button
            className="btn btn-danger"
            onClick={() => handleDeleteCategory(row.id)}
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
        />
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
