import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ExpeditionList = () => {
    const [expeditions, setExpeditions] = useState([]);

    useEffect(() => {
        getExpeditions();
    }, []);

    const getExpeditions = async () => {
        const response = await axios.get('http://localhost:5000/expeditions');
        setExpeditions(response.data);
    };

    const deleteExpedition = async (id) => {
        if (window.confirm('Are you sure you want to delete this expedition?')) {
            try {
                await axios.delete(`http://localhost:5000/expeditions/${id}`);
                getExpeditions();
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="columns mt-5">
            <div className="column is-full">
                <Link to="/add-expedition" className="button is-primary">Add Expedition</Link>
                <table className="table is-striped is-fullwidth">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Base Cost</th>
                            <th>Logo</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expeditions.map((expedition, index) => (
                            <tr key={expedition.id}>
                                <td>{index + 1}</td>
                                <td>{expedition.name}</td>
                                <td>{expedition.code}</td>
                                <td>Rp {expedition.baseCost}</td>
                                <td>
                                    {expedition.logo ? (
                                        <img src={expedition.logo} alt={expedition.name} style={{width: '50px', height: 'auto'}} />
                                    ) : (
                                        'No Logo'
                                    )}
                                </td>
                                <td>
                                    <span className={`tag ${expedition.status ? 'is-success' : 'is-danger'}`}>
                                        {expedition.status ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td>
                                    <Link to={`/edit-expedition/${expedition.id}`} className="button is-info is-small">Edit</Link>
                                    <button onClick={() => deleteExpedition(expedition.id)} className="button is-danger is-small">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExpeditionList;
