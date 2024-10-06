import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

const AddCategoryModal = ({ show, handleClose, handleAddCategory }) => {
  const [categoryName, setCategoryName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const newCategory = {
      name: categoryName,
      isActive,
    };

    try {
      // Make API request to add new category
      const response = await axios.post(
        "https://localhost:7282/api/category",
        newCategory,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("vendor_token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      // If category is successfully created, add it to the parent state
      handleAddCategory(response.data);
      handleClose();
    } catch (error) {
      setError("Failed to add category. Please try again.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Category</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {error && <p className="text-danger">{error}</p>}
          <div className="form-group mb-3">
            <label htmlFor="CategoryName">Category Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <Form.Check
              type="switch"
              id="isActive"
              label="Active"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
          </div>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleSubmit}
        >
          Add Category
        </button>
        <button className="btn btn-danger" onClick={handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCategoryModal;
