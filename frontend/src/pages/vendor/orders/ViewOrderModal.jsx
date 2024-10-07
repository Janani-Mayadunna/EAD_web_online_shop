import React from "react";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

const ViewOrderModal = ({ show, handleClose, order }) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Order Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h5>Product Information</h5>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>Product Name</td>
              <td>{order.name}</td>
            </tr>
            <tr>
              <td>Quantity</td>
              <td>{order.quantity}</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>${order.price.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{order.status}</td>
            </tr>
          </tbody>
        </Table>

        <h5>Customer Information</h5>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>Customer Name</td>
              <td>Sahan Perera</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>customer@gmail.com</td>
            </tr>
            <tr>
              <td>Phone Number</td>
              <td>0775612285</td>
            </tr>
            <tr>
              <td>Delivery Address</td>
              <td>No.12, Main Street, Colombo</td>
            </tr>
          </tbody>
        </Table>

        <h5>Order Summary</h5>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>Total Price</td>
              <td>${order.price * order.quantity}</td>
            </tr>
            <tr>
              <td>Note</td>
              <td>{order.note || "No notes provided"}</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>

      <Modal.Footer>
        <button className="btn btn-danger" onClick={handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewOrderModal;
