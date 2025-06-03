import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        const response = await axios.get('http://localhost:5000/categories');
        setCategories(response.data);
    };

    const deleteCategory = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await axios.delete(`http://localhost:5000/categories/${id}`);
                getCategories();
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <Link to="/add-category" className="button is-primary">Add Category</Link>
                <table className="table is-striped is-fullwidth">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                            <tr key={category.id}>
                                <td>{index + 1}</td>
                                <td>{category.name}</td>
                                <td>{category.description || 'No description'}</td>
                                <td>
                                    <span className={`tag ${category.status ? 'is-success' : 'is-danger'}`}>
                                        {category.status ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td>
                                    <Link to={`/edit-category/${category.id}`} className="button is-info is-small">Edit</Link>
                                    <button onClick={() => deleteCategory(category.id)} className="button is-danger is-small">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoryList;
