import React, { useState } from "react";
import {
  Table,
  Button,
  Badge,
  Form,
  InputGroup,
  FormControl,
  Modal,
} from "react-bootstrap";
import { Trash3, Pencil } from "react-bootstrap-icons";
import { useProducts } from "../context/ProductContext";

const statusVariant = {
  Scheduled: "info",
  Active: "success",
  Draft: "warning",
};

const ITEMS_PER_PAGE = 5;

const ProductList = () => {
  const { products, deleteProduct, editProduct } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProductIdx, setSelectedProductIdx] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    status: "",
  });

  const handleDeleteClick = (idx) => {
    setSelectedProductIdx(idx);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteProduct(selectedProductIdx);
    setShowDeleteModal(false);
  };

  const handleEditClick = (idx) => {
    setSelectedProductIdx(idx);
    setEditedProduct(products[idx]);
    setShowEditModal(true);
  };

  const confirmEdit = () => {
    editProduct(selectedProductIdx, editedProduct);
    setShowEditModal(false);
  };

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterCategory === "" || product.category === filterCategory) &&
      (filterStatus === "" || product.status === filterStatus)
    );
  });

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  return (
    <div className="p-4 w-100">
      {/* Search and Filter Section */}
      <div className="mb-4 p-3 bg-light rounded-4 shadow-sm d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
        <InputGroup className="w-50 gap-2">
          <FormControl
            placeholder="Search by product name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-3 shadow-sm"
          />
          <Form.Select
            onChange={(e) => setFilterCategory(e.target.value)}
            value={filterCategory}
            className="rounded-3 shadow-sm"
          >
            <option value="">Filter by Category</option>
            {[...new Set(products.map((p) => p.category))].map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Select>
          <Form.Select
            onChange={(e) => setFilterStatus(e.target.value)}
            value={filterStatus}
            className="rounded-3 shadow-sm"
          >
            <option value="">Filter by Status</option>
            {Object.keys(statusVariant).map((status, idx) => (
              <option key={idx} value={status}>
                {status}
              </option>
            ))}
          </Form.Select>
        </InputGroup>
      </div>

      {/* Product Table */}
      <div className="table-responsive shadow-sm rounded-4">
        <Table hover className="table-bordered">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product, idx) => (
              <tr key={idx}>
                <td>{indexOfFirstItem + idx + 1}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <Badge bg={statusVariant[product.status]}>
                    {product.status}
                  </Badge>
                </td>
                <td>
                  <Button
                    variant="link"
                    onClick={() => handleEditClick(idx)}
                    className="text-warning mx-1"
                  >
                    <Pencil size={20} />
                  </Button>
                  <Button
                    variant="link"
                    onClick={() => handleDeleteClick(idx)}
                    className="text-danger mx-1"
                  >
                    <Trash3 size={20} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Product Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
      >
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
                onChange={(e) =>
                  setEditedProduct({ ...editedProduct, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={editedProduct.category}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    category: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={editedProduct.price}
                onChange={(e) =>
                  setEditedProduct({ ...editedProduct, price: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                value={editedProduct.stock}
                onChange={(e) =>
                  setEditedProduct({ ...editedProduct, stock: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={editedProduct.status}
                onChange={(e) =>
                  setEditedProduct({ ...editedProduct, status: e.target.value })
                }
              >
                {Object.keys(statusVariant).map((status, idx) => (
                  <option key={idx} value={status}>
                    {status}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductList;
