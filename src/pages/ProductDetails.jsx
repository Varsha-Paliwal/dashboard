import React from 'react';
import { Card, Button, Badge, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import image from '../images/image.webp'

const ProductDetails = () => {
  const  {id} = useParams();
  const productId = id
  const { products } = useProducts();
  const product = products[parseInt(productId) - 1];

  if (!product) {
    return <div className="text-center mt-5">Product not found.</div>;
  }

  return (
    <div className="container my-5">
      <Card className="shadow-lg p-4 rounded-4">
        <Row>
          <Col md={6} className="d-flex align-items-center justify-content-center">
            <img
              src={image}
              alt={product.name}
              className="img-fluid rounded-4 border"
            />
          </Col>
          <Col md={6}>
            <h2 className="mb-3">{product.name}</h2>
            <h5 className="text-muted mb-3">Category: {product.category}</h5>
            <h4 className="text-primary mb-3">Price: ${product.price}</h4>
            <h5 className="mb-3">Stock: {product.stock}</h5>
            <Badge bg={product.status === 'Active' ? 'success' : product.status === 'Scheduled' ? 'info' : 'warning'} className="mb-3">
              {product.status}
            </Badge>
            <p className="mt-4">{product.details || 'No additional details provided.'}</p>
            <Button variant="primary" className="mt-3 w-100">Add to Cart</Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ProductDetails;
