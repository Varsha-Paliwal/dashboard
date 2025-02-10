import React, { useState } from 'react';
import { Table, Button, Badge } from "react-bootstrap";
import { Trash3, Pencil, ArrowDown, ArrowUp, Eye } from "react-bootstrap-icons";
import statusVariant from '../staticData.json';
import { useNavigate } from 'react-router-dom';

const ProductTable = ({ products, handleEditClick, handleDeleteClick, indexOfFirstItem }) => {
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const navigate = useNavigate();

  const sortedProducts = [...products].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = typeof a[sortConfig.key] === 'string' ? a[sortConfig.key].toLowerCase() : a[sortConfig.key];
      const bValue = typeof b[sortConfig.key] === 'string' ? b[sortConfig.key].toLowerCase() : b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />;
    }
    return <ArrowDown size={16} style={{ opacity: 0.5 }} />;
  };

  const handleViewClick = (productId) => {
    navigate(`/product-details/${productId}`); 
  };

  return (
    <div className="table-responsive shadow-sm rounded-4">
      <Table hover className="table-bordered">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th onClick={() => requestSort('name')} className="sortable cursor-pointer">
              Product Name {getSortIcon('name')}
            </th>
            <th>Category</th>
            <th onClick={() => requestSort('price')} className="sortable cursor-pointer">
              Price {getSortIcon('price')}
            </th>
            <th>Stock</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product, idx) => (
            <tr key={idx}>
              <td>{indexOfFirstItem + idx + 1}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>
                <Badge bg={statusVariant.statusVariant[product.status]}>{product.status}</Badge>
              </td>
              <td>
                <Button 
                  variant="link" 
                  onClick={() => handleEditClick(indexOfFirstItem + idx)} 
                  className="text-warning mx-1"
                >
                  <Pencil size={20} />
                </Button>
                <Button 
                  variant="link" 
                  onClick={() => handleDeleteClick(indexOfFirstItem + idx)} 
                  className="text-danger mx-1"
                >
                  <Trash3 size={20} />
                </Button>

                <Button 
                  variant="link" 
                  onClick={()=>handleViewClick(indexOfFirstItem + idx + 1)}
                  className="text-safe mx-1"
                >
                  <Eye size={20} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductTable;
