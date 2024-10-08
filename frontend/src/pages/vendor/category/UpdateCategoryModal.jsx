import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios"; // Import Axios for API calls

const UpdateCategoryModal = ({
  show,
  handleClose,
  category,
  handleUpdateCategory,
}) => {
  const [categoryName, setCategoryName] = useState(category?.name || "");
  const [error, setError] = useState("");

  useEffect(() => {
    if (category) {
      setCategoryName(category.name);
    }
  }, [category]);

  const handleSubmit = async () => {
    const updatedCategory = {
      name: categoryName,
    };

    try {
      // Make API request to update the category
      const response = await axios.put(
        `https://localhost:7282/api/category/${category.id}`,
        updatedCategory,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("vendor_token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      // If the category is successfully updated, pass it to parent component
      handleUpdateCategory(response.data);
      handleClose();
    } catch (error) {
      setError("Failed to update category. Please try again.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Category</Modal.Title>
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
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleSubmit}
        >
          Update Category
        </button>
        <button className="btn btn-danger" onClick={handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateCategoryModal;
