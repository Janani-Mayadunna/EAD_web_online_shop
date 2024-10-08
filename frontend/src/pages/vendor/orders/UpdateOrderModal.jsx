import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const UpdateOrderModal = ({ show, handleClose, order, handleUpdateOrder }) => {
  const [status, setStatus] = useState(order.status); // Initialize with the current status

  const handleSave = () => {
    const updatedOrder = { ...order, status }; // Create updated order object
    handleUpdateOrder(updatedOrder); // Call the update handler from the parent
    handleClose(); // Close the modal
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Order Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="orderStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)} // Update status based on selection
            >
              <option value="Processing">Processing</option>
              <option value="Delivered">Delivered</option>
              <option value="Completed">Completed</option>
              <option value="Canceled">Canceled</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateOrderModal;
