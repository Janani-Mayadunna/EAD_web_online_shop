import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const AddCategoryModal = ({ show, handleClose, handleAddCategory }) => {
  const [categoryName, setCategoryName] = useState("");
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = () => {
    const newCategory = {
      id: Math.random().toString(36).substr(2, 9), // Generating a random id
      name: categoryName,
      isActive,
    };

    handleAddCategory(newCategory);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Category</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
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
