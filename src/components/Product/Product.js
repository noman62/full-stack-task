import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Simulating fetching product data
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://full-stack-backend1.onrender.com/api/allProduct');
      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle checkbox selection
  const handleCheckboxChange = (event, productId) => {
    if (event.target.checked) {
      setSelectedProducts((prevSelectedProducts) => [
        ...prevSelectedProducts,
        productId
      ]);
    } else {
      setSelectedProducts((prevSelectedProducts) =>
        prevSelectedProducts.filter((id) => id !== productId)
      );
    }
  };

  // Handle delete button click
  const handleDelete = async () => {
    try {
      // Make a DELETE request to the API to delete the selected products
      await fetch('https://full-stack-backend1.onrender.com/api/deleteProducts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productIds: selectedProducts })
      });

      // Remove the deleted products from the products state
      setProducts((prevProducts) =>
        prevProducts.filter((product) => !selectedProducts.includes(product._id))
      );

      // Clear the selected products
      setSelectedProducts([]);
    } catch (error) {
      console.error('Error deleting products:', error);
    }
  };

  return (
    <div className="product-table">
      <h4 className="text-center">Statement Summary</h4>
      <table>
        <thead>
          <tr>
            <th scope="col">Select</th>
            <th scope="col">Product Name</th>
            <th scope="col">Category ID</th>
            <th scope="col">Category Name</th>
            <th scope="col">Unit Price</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td data-label="Select">
                <input
                  className="mr-3"
                  type="checkbox"
                  checked={selectedProducts.includes(product._id)}
                  onChange={(event) => handleCheckboxChange(event, product._id)}
                />
              </td>
              <td data-label="Product Name">{product.productName}</td>
              <td data-label="ID">{product.category.id}</td>
              <td data-label="Category Name">{product.category.name}</td>
              <td data-label="Unit Price">{product.unitPrice}</td>
              <td data-label="Status">
                <div className="row">
                  <div>{product.status}</div>
                  <div className="ml-3">
                    <Link to={`/updateData/${product._id}`}>
                      <button className="btn btn-primary">Update</button>
                    </Link>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="row ml-1 mt-3">
        <div className="col-md-4">
          <div className="row">
            <div className="">
              <a href="/addProduct">
                <button className="btn btn-primary">Add Product</button>
              </a>
            </div>
            <div className="ml-3">
              <button className="btn btn-danger" onClick={handleDelete} disabled={!selectedProducts.length}>
                Delete Product
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-3"></div>
        <div className="col-md-3"></div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
};

export default ProductTable;
