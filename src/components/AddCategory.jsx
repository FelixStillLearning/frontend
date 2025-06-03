import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(true);
    const navigate = useNavigate();

    const saveCategory = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/categories', {
                name,
                description,
                status
            });
            navigate('/categories');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="columns mt-5">
            <div className="column is-half">
                <form onSubmit={saveCategory}>
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Category Name"
                                required
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Description</label>
                        <div className="control">
                            <textarea
                                className="textarea"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Category Description"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Status</label>
                        <div className="control">
                            <div className="select">
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value === 'true')}
                                >
                                    <option value={true}>Active</option>
                                    <option value={false}>Inactive</option>
                                </select>
                            </div>
                        </div>
                    </div>                    <div className="field">
                        <div className="control">
                            <button type="submit" className="button is-primary">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCategory;
