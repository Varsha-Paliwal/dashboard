import React from 'react'
import { Table, Button, Badge} from "react-bootstrap";
import { Trash3, Pencil } from "react-bootstrap-icons";
import statusVariant from '../staticData.json'
const ProductTable = ({ products, handleEditClick, handleDeleteClick, indexOfFirstItem }) => (
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
          {products.map((product, idx) => (
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
                <Button variant="link" onClick={() => handleEditClick(idx)} className="text-warning mx-1">
                  <Pencil size={20} />
                </Button>
                <Button variant="link" onClick={() => handleDeleteClick(idx)} className="text-danger mx-1">
                  <Trash3 size={20} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );

export default ProductTable
