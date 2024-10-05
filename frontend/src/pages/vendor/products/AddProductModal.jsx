import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AddProductModal = ({
  show,
  handleClose,
  handleAddProduct,
  categories,
}) => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState(0);
  const [inventoryCount, setInventoryCount] = useState(0);
  const [lowStockAlert, setLowStockAlert] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "productName":
        setProductName(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "categoryId":
        setCategoryId(value);
        break;
      case "price":
        setPrice(parseFloat(value));
        break;
      case "inventoryCount":
        setInventoryCount(parseInt(value, 10));
        break;
      case "lowStockAlert":
        setLowStockAlert(parseInt(value, 10));
        break;
      case "imageUrl":
        setImageUrl(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    const newProduct = {
      name: productName,
      description,
      categoryId,
      price,
      inventoryCount,
      lowStockAlert,
      images: [imageUrl], // Add image URL directly
    };

    handleAddProduct(newProduct);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Product</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form className="col-md-11 mx-auto">
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="productName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  name="productName"
                  value={productName}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  name="price"
                  value={price}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="categoryId">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  name="categoryId"
                  value={categoryId}
                  onChange={handleInputChange}
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="inventoryCount">
                <Form.Label>Inventory Count</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter inventory count"
                  name="inventoryCount"
                  value={inventoryCount}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="lowStockAlert">
                <Form.Label>Low Stock Alert</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter low stock alert"
                  name="lowStockAlert"
                  value={lowStockAlert}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="imageUrl">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image URL"
                  name="imageUrl"
                  value={imageUrl}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter product description"
                  name="description"
                  value={description}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleSubmit}
        >
          Add Product
        </button>
        <button className="btn btn-danger" onClick={handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProductModal;