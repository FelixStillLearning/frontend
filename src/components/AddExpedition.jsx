import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddExpedition = () => {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [logo, setLogo] = useState('');
    const [baseCost, setBaseCost] = useState('');
    const [status, setStatus] = useState(true);
    const navigate = useNavigate();

    const saveExpedition = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/expeditions', {
                name,
                code,
                logo,
                baseCost,
                status
            });
            navigate('/expeditions');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="columns mt-5">
            <div className="column is-half">
                <form onSubmit={saveExpedition}>
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Expedition Name (e.g., JNE, JNT)"
                                required
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Code</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="Expedition Code (e.g., jne, jnt)"
                                required
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Logo URL</label>
                        <div className="control">
                            <input
                                type="url"
                                className="input"
                                value={logo}
                                onChange={(e) => setLogo(e.target.value)}
                                placeholder="Logo URL"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Base Cost</label>
                        <div className="control">
                            <input
                                type="number"
                                className="input"
                                value={baseCost}
                                onChange={(e) => setBaseCost(e.target.value)}
                                placeholder="Base Cost"
                                required
                                min="0"
                                step="0.01"
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

export default AddExpedition;
