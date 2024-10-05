import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const UpdateCategoryModal = ({
  show,
  handleClose,
  category,
  handleUpdateCategory,
}) => {
  const [categoryName, setCategoryName] = useState(category?.name || "");
  const [isActive, setIsActive] = useState(category?.isActive || false);

  useEffect(() => {
    if (category) {
      setCategoryName(category.name);
      setIsActive(category.isActive);
    }
  }, [category]);

  const handleSubmit = () => {
    const updatedCategory = {
      id: category.id, // Keep the same ID
      name: categoryName,
      isActive,
    };

    handleUpdateCategory(updatedCategory);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Category</Modal.Title>
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
