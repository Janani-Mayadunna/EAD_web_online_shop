import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios"; // Axios for API requests
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Firebase imports
import { storage } from "../../../firebase/firebaseConfig"; // Your Firebase configuration

const UpdateProductModal = ({
  show,
  handleClose,
  handleUpdateProduct,
  product,
}) => {
  const [categories, setCategories] = useState([]);
  const [productName, setProductName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [categoryId, setCategoryId] = useState(product?.category?.id || "");
  const [price, setPrice] = useState(product?.price || 0);
  const [inventoryCount, setInventoryCount] = useState(
    product?.inventoryCount || 0
  );
  const [lowStockAlert, setLowStockAlert] = useState(
    product?.lowStockAlert || 0
  );
  const [imageFile, setImageFile] = useState(null); // State for image file
  const [imageUrl, setImageUrl] = useState(product?.images?.[0] || "");
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    product?.images?.[0] || ""
  ); // Image preview
  const [uploadProgress, setUploadProgress] = useState(0); // Progress tracker for image upload
  const [errors, setErrors] = useState({});

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
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    if (show) {
      fetchCategories();
    }
  }, [show]);

  // Populate form fields when the product changes
  useEffect(() => {
    if (product) {
      setProductName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setInventoryCount(product.inventoryCount);
      setLowStockAlert(product.lowStockAlert);
      setImageUrl(product.images?.[0] || "");
      setImagePreviewUrl(product.images?.[0] || ""); // Set image preview
    }
  }, [product]);

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      // Create a URL for the image preview
      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl); // Set image preview URL
    }
  };

  // Handle Firebase image upload
  const handleImageUpload = () => {
    return new Promise((resolve, reject) => {
      if (!imageFile) {
        resolve(imageUrl); // If no new image selected, use the existing imageUrl
        return;
      }

      const storageRef = ref(storage, `products/${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          // Get download URL
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImageUrl(url);
            resolve(url); // Return the URL after upload is complete
          });
        }
      );
    });
  };

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
      default:
        break;
    }
  };

  const validateForm = () => {
    let validationErrors = {};

    if (!productName.trim())
      validationErrors.productName = "Product name is required.";
    if (!description.trim())
      validationErrors.description = "Description is required.";
    if (!categoryId) validationErrors.categoryId = "Please select a category.";
    if (!price || price <= 0)
      validationErrors.price = "Price must be a positive number.";
    if (!inventoryCount || inventoryCount < 0)
      validationErrors.inventoryCount = "Inventory count must be 0 or more.";
    if (!lowStockAlert || lowStockAlert < 0)
      validationErrors.lowStockAlert = "Low stock alert must be 0 or more.";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!validateForm()) {
      return; // Exit if validation fails
    }

    try {
      // Upload image and get the URL if new image is selected
      const uploadedImageUrl = await handleImageUpload();

      // Create updated product object
      const updatedProduct = {
        name: productName,
        description,
        categoryId,
        price,
        inventoryCount,
        lowStockAlert,
        images: [uploadedImageUrl], // Update image URL
      };

      // Make PUT request to update the product
      const response = await axios.put(
        `https://localhost:7282/api/product/${product.id}`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("vendor_token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      handleUpdateProduct(response.data); // Notify parent component of updated product
      handleClose(); // Close modal after successful update
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Product</Modal.Title>
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
              <Form.Group controlId="imageFile">
                <Form.Label>Product Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Form.Group>
              {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
              {imagePreviewUrl && (
                <img
                  src={imagePreviewUrl}
                  alt="Preview"
                  style={{
                    maxWidth: "100px",
                    height: "auto",
                    marginTop: "10px",
                  }}
                />
              )}
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
              Update Product
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

export default UpdateProductModal;
