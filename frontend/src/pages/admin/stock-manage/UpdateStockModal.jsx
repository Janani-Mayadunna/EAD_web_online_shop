import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const UpdateStockModal = ({ show, handleClose, product }) => {
  const [newStock, setNewStock] = useState(product?.inventoryCount || 0);
  const [isActive, setIsActive] = useState(product?.isActive || false);

  useEffect(() => {
    if (product) {
      setNewStock(product.inventoryCount);
      setIsActive(product.isActive);
    }
  }, [product]);

  const handleInputChange = (e) => {
    setNewStock(e.target.value);
  };

  const handleToggleChange = () => {
    setIsActive(!isActive);
  };

  const handleUpdate = () => {
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Stock</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="form-group mb-3">
          <label htmlFor="ProductName">Enter new stock</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter stock"
            value={newStock}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <Form.Check
            type="switch"
            id="toggle-active-status"
            label="Toggle Active Status"
            checked={isActive}
            onChange={handleToggleChange}
          />
        </div>
      </Modal.Body>
      
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleUpdate}
        >
          Update Product
        </button>
        <button className="btn btn-danger" onClick={handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateStockModal;
