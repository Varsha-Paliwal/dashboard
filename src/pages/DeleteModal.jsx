import React from 'react'
import {  Button, Modal } from "react-bootstrap";

const DeleteModal = ({ show, onHide, confirmDelete }) => (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="danger" onClick={confirmDelete}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
  

export default DeleteModal
