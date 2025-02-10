import React, { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

const AddProducts = () => {
  const { addProduct } = useProducts();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    status: "Scheduled",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Product Name is required.";
    if (!formData.category) newErrors.category = "Category is required.";
    if (!formData.price) newErrors.price = "Price is required.";
    if (!formData.stock) newErrors.stock = "Stock quantity is required.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      addProduct(formData);
      navigate("/dashboard");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card
        className="p-5 shadow-lg rounded-4 w-100"
        style={{ maxWidth: "600px" }}
      >
        <h2 className="mb-4 text-center text-primary">Add New Product</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6} className="mb-3">
              {errors.name && (
                <span className="text-danger d-block">{errors.name}</span>
              )}
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className="shadow-sm"
              />
            </Col>

            <Col md={6} className="mb-3">
              {errors.category && (
                <small className="text-danger  d-block">
                  {errors.category}
                </small>
              )}
              <Form.Label>Category</Form.Label>

              <Form.Control
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Enter category"
                className="shadow-sm"
              />
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              {errors.price && (
                <small className="text-danger d-block">{errors.price}</small>
              )}
              <Form.Label>Price ($)</Form.Label>

              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="shadow-sm"
              />
            </Col>

            <Col md={6} className="mb-3">
              {errors.stock && (
                <small className="text-danger d-block">{errors.stock}</small>
              )}
              <Form.Label>Stock</Form.Label>

              <Form.Control
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Enter stock quantity"
                className="shadow-sm"
              />
            </Col>
          </Row>

          <Form.Group className="mb-4">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="shadow-sm"
            >
              <option value="Scheduled">Scheduled</option>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
            </Form.Select>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100 py-2 shadow-sm"
            style={{ borderRadius: "12px" }}
          >
            Add Product
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default AddProducts;
