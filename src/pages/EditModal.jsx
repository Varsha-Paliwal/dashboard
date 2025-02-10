import React from 'react'
import { Button, Badge, Form, Modal } from "react-bootstrap";
import statusVariant from '../staticData.json'


const EditModal = ({ show, onHide, editedProduct, setEditedProduct, confirmEdit }) => (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              value={editedProduct.name}
              onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              value={editedProduct.category}
              onChange={(e) => setEditedProduct({ ...editedProduct, category: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={editedProduct.price}
              onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              value={editedProduct.stock}
              onChange={(e) => setEditedProduct({ ...editedProduct, stock: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={editedProduct.status}
              onChange={(e) => setEditedProduct({ ...editedProduct, status: e.target.value })}
            >
              {Object.keys(statusVariant.statusVariant).map((status, idx) => (
                <option key={idx} value={status}>{status}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={confirmEdit}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );

export default EditModal
