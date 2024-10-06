import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios"; // Import axios for API requests

const AddProductModal = ({ show, handleClose, handleAddProduct }) => {
  const [categories, setCategories] = useState([]); // State to hold categories
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState(0);
  const [inventoryCount, setInventoryCount] = useState(0);
  const [lowStockAlert, setLowStockAlert] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState({}); // Validation error state

  // Fetch categories when the modal is opened
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7282/api/category",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("vendor_token")}`,
            },
          }
        );
        setCategories(response.data); // Set categories to state
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    if (show) {
      // Only fetch when modal is opened
      fetchCategories();
    }
  }, [show]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: null })); // Clear errors on change
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

  const validateForm = () => {
    let validationErrors = {};

    if (!productName.trim()) {
      validationErrors.productName = "Product name is required.";
    }
    if (!description.trim()) {
      validationErrors.description = "Description is required.";
    }
    if (!categoryId) {
      validationErrors.categoryId = "Please select a category.";
    }
    if (!price || price <= 0) {
      validationErrors.price = "Price must be a positive number.";
    }
    if (!inventoryCount || inventoryCount < 0) {
      validationErrors.inventoryCount = "Inventory count must be 0 or more.";
    }
    if (!lowStockAlert || lowStockAlert < 0) {
      validationErrors.lowStockAlert = "Low stock alert must be 0 or more.";
    }
    if (!imageUrl.trim()) {
      validationErrors.imageUrl = "Image URL is required.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!validateForm()) {
      return; // Exit if form validation fails
    }

    // Create a new product object
    const newProduct = {
      name: productName,
      description,
      categoryId,
      price,
      inventoryCount,
      lowStockAlert,
      images: [imageUrl], // Add image URL directly
    };

    try {
      await axios.post("https://localhost:7282/api/product", newProduct, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("vendor_token")}`,
          "Content-Type": "application/json",
        },
      });
      handleAddProduct(newProduct); // Notify parent component of new product
      handleClose(); // Close the modal after submission
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Product</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form className="col-md-11 mx-auto" onSubmit={handleSubmit}>
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
                  isInvalid={!!errors.productName}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.productName}
                </Form.Control.Feedback>
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
                  isInvalid={!!errors.price}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price}
                </Form.Control.Feedback>
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
                  isInvalid={!!errors.categoryId}
                  required
                >
                  <option value="">Select category</option>
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>No categories available</option>
                  )}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.categoryId}
                </Form.Control.Feedback>
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
                  isInvalid={!!errors.inventoryCount}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.inventoryCount}
                </Form.Control.Feedback>
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
                  isInvalid={!!errors.lowStockAlert}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lowStockAlert}
                </Form.Control.Feedback>
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
                  isInvalid={!!errors.imageUrl}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.imageUrl}
                </Form.Control.Feedback>
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
                  isInvalid={!!errors.description}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Modal.Footer>
            <button type="submit" className="btn btn-success">
              Add Product
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleClose}
            >
              Close
            </button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProductModal;
