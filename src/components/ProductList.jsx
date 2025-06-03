import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



const ProductList = () => {
const [products,setProducts] =useState([]);
const deleteProduct = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/products/${id}`);
    getProducts();
  } catch (error) {
    console.error(error);
  }
}

useEffect(()=>{
    getProducts();

},[]);
async function getProducts() {
  const response = await axios.get('http://localhost:5000/products');
  setProducts(response.data);
}
  return (
      <div className="columns mt-5 is-centered">        <div className="column is-half">
          <Link to="/add-product" className="button is-primary mb-3">Add Product</Link>
            <table className="table is-striped is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1 }</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td>
                    <Link to={`/edit-product/${product.id}`} className="button is-small is-info">Edit</Link>
                    <button onClick={() => deleteProduct(product.id)} className="button is-small is-danger">Delete</button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
        </div>
      </div>
  )
}

export default ProductList;
