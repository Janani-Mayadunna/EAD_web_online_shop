import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios"; // Import Axios

const UpdateOrderModal = ({ show, handleClose, order, handleUpdateOrder }) => {
  const [status, setStatus] = useState(order.status); // Initialize with the current status
  const [loading, setLoading] = useState(false); // Loading state for API call
  const [error, setError] = useState(null); // Error state for handling API errors

  const handleSave = async () => {
    setLoading(true); // Show loading state when making the API call
    setError(null); // Reset any previous errors

    try {
      // API call to update order status
      const response = await axios.put(
        `https://localhost:7282/api/order/orderItem/status`,
        {
          orderItemId: order.id, // Pass the order item ID
          newStatus: status, // Pass the new status
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("vendor_token")}`, // Add the token from localStorage
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const updatedOrder = { ...order, status }; // Create updated order object
        handleUpdateOrder(updatedOrder); // Call the update handler from the parent
        handleClose(); // Close the modal
      }
    } catch (error) {
      console.error("Failed to update order status:", error);
      setError("Failed to update the order. Please try again."); // Display error if API call fails
    }

    setLoading(false); // Stop loading state after API call
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Order Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <p className="text-danger">{error}</p>}
        <Form>
          <Form.Group controlId="orderStatus">
            <Form.Label>Update Status</Form.Label>
            <Form.Control
              as="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)} // Update status based on selection
            >
              <option value="Processing">Processing</option>
              <option value="Delivered">Delivered</option>
              <option value="Canceled">Canceled</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateOrderModal;
