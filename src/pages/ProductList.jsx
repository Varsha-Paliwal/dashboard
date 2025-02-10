import React, { useState } from "react";
import { Table, Button, Pagination} from "react-bootstrap";
import { Trash3, Pencil } from "react-bootstrap-icons";
import { useProducts } from "../context/ProductContext";
import SearchAndFilter from "./SearchAndFilter";
import DeleteModal from "./DeleteModal";
import ProductTable from "./ProductTable";
import EditModal from "./EditModal";

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
  const [editedProduct, setEditedProduct] = useState({ name: "", category: "", price: "", stock: "", status: "" });

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

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filterCategory === "" || product.category === filterCategory) &&
    (filterStatus === "" || product.status === filterStatus)
  );

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 w-100">
      <SearchAndFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        products={products}
      />
      <ProductTable
        products={currentProducts}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        indexOfFirstItem={indexOfFirstItem}
      />
      <DeleteModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        confirmDelete={confirmDelete}
      />
      <div className="d-flex justify-content-center my-4">
        <Pagination>
          <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          {[...Array(totalPages)].map((_, idx) => (
            <Pagination.Item
              key={idx + 1}
              active={idx + 1 === currentPage}
              onClick={() => handlePageChange(idx + 1)}
            >
              {idx + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
      </div>
      <EditModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        editedProduct={editedProduct}
        setEditedProduct={setEditedProduct}
        confirmEdit={confirmEdit}
      />
    </div>
  );
};

export default ProductList;
