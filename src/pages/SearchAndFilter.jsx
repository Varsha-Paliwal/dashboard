import React from 'react'
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import statusVariant from "../staticData.json"

const SearchAndFilter = ({ searchQuery, setSearchQuery, filterCategory, setFilterCategory, filterStatus, setFilterStatus, products }) => (
    <div className="mb-4 p-3 bg-light rounded-4 shadow-sm d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
      <InputGroup className="w-100 w-md-50 gap-2">
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
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </Form.Select>
        <Form.Select
          onChange={(e) => setFilterStatus(e.target.value)}
          value={filterStatus}
          className="rounded-3 shadow-sm"
        >
          <option value="">Filter by Status</option>
          {Object.keys(statusVariant.statusVariant).map((status, idx) => (
            <option key={idx} value={status}>{status}</option>
          ))}
        </Form.Select>
      </InputGroup>
    </div>
  );

export default SearchAndFilter
