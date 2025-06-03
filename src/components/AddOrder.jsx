import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddOrder = () => {
    const [orderNumber, setOrderNumber] = useState('');
    const [userId, setUserId] = useState('');
    const [expeditionId, setExpeditionId] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [shippingCost, setShippingCost] = useState('');
    const [status, setStatus] = useState('pending');
    const [trackingNumber, setTrackingNumber] = useState('');
    const [estimatedDelivery, setEstimatedDelivery] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    
    // For dropdowns
    const [users, setUsers] = useState([]);
    const [expeditions, setExpeditions] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
        getExpeditions();
        generateOrderNumber();
    }, []);

    const getUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/users');
            setUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getExpeditions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/expeditions/active');
            setExpeditions(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const generateOrderNumber = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const time = String(now.getTime()).slice(-4);
        const orderNum = `ORD-${year}${month}${day}-${time}`;
        setOrderNumber(orderNum);
    };

    const calculateTotalWithShipping = () => {
        const total = parseFloat(totalAmount) || 0;
        const shipping = parseFloat(shippingCost) || 0;
        return (total + shipping).toFixed(2);
    };

    const saveOrder = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await axios.post('http://localhost:5000/orders', {
                orderNumber,
                userId: parseInt(userId),
                expeditionId: parseInt(expeditionId),
                totalAmount: parseFloat(totalAmount),
                shippingCost: parseFloat(shippingCost),
                status,
                trackingNumber: trackingNumber || null,
                estimatedDelivery: estimatedDelivery || null,
                shippingAddress
            });
            navigate('/orders');
        } catch (error) {
            console.log(error);
            alert('Error creating order. Please check your input.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="columns mt-5">
            <div className="column is-8">
                <h1 className="title is-4">Add New Order</h1>
                
                <form onSubmit={saveOrder}>
                    <div className="box">
                        <h2 className="subtitle is-5">Order Information</h2>
                        
                        <div className="columns">
                            <div className="column is-6">
                                <div className="field">
                                    <label className="label">Order Number</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={orderNumber}
                                            onChange={(e) => setOrderNumber(e.target.value)}
                                            placeholder="Order Number"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">Customer</label>
                                    <div className="control">
                                        <div className="select is-fullwidth">
                                            <select
                                                value={userId}
                                                onChange={(e) => setUserId(e.target.value)}
                                                required
                                            >
                                                <option value="">Select Customer</option>
                                                {users.map((user) => (
                                                    <option key={user.id} value={user.id}>
                                                        {user.name} ({user.email})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">Expedition</label>
                                    <div className="control">
                                        <div className="select is-fullwidth">
                                            <select
                                                value={expeditionId}
                                                onChange={(e) => setExpeditionId(e.target.value)}
                                                required
                                            >
                                                <option value="">Select Expedition</option>
                                                {expeditions.map((expedition) => (
                                                    <option key={expedition.id} value={expedition.id}>
                                                        {expedition.name} - Rp {expedition.baseCost}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">Order Status</label>
                                    <div className="control">
                                        <div className="select is-fullwidth">
                                            <select
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="confirmed">Confirmed</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="column is-6">
                                <div className="field">
                                    <label className="label">Total Amount (Rp)</label>
                                    <div className="control">
                                        <input
                                            type="number"
                                            className="input"
                                            value={totalAmount}
                                            onChange={(e) => setTotalAmount(e.target.value)}
                                            placeholder="Total Amount"
                                            required
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">Shipping Cost (Rp)</label>
                                    <div className="control">
                                        <input
                                            type="number"
                                            className="input"
                                            value={shippingCost}
                                            onChange={(e) => setShippingCost(e.target.value)}
                                            placeholder="Shipping Cost"
                                            required
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">Tracking Number</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={trackingNumber}
                                            onChange={(e) => setTrackingNumber(e.target.value)}
                                            placeholder="Tracking Number (Optional)"
                                        />
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">Estimated Delivery</label>
                                    <div className="control">
                                        <input
                                            type="date"
                                            className="input"
                                            value={estimatedDelivery}
                                            onChange={(e) => setEstimatedDelivery(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Shipping Address</label>
                            <div className="control">
                                <textarea
                                    className="textarea"
                                    value={shippingAddress}
                                    onChange={(e) => setShippingAddress(e.target.value)}
                                    placeholder="Complete shipping address..."
                                    required
                                    rows="3"
                                />
                            </div>
                        </div>

                        {/* Order Summary */}
                        {totalAmount && shippingCost && (
                            <div className="box has-background-light">
                                <h3 className="subtitle is-6">Order Summary</h3>
                                <div className="columns">
                                    <div className="column">
                                        <p><strong>Subtotal:</strong> Rp {parseFloat(totalAmount || 0).toLocaleString('id-ID')}</p>
                                        <p><strong>Shipping:</strong> Rp {parseFloat(shippingCost || 0).toLocaleString('id-ID')}</p>
                                        <p className="has-text-weight-bold has-text-primary">
                                            <strong>Total:</strong> Rp {parseFloat(calculateTotalWithShipping()).toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="field is-grouped">
                            <div className="control">
                                <button 
                                    type="submit" 
                                    className={`button is-primary ${loading ? 'is-loading' : ''}`}
                                    disabled={loading}
                                >
                                    Create Order
                                </button>
                            </div>
                            <div className="control">
                                <button 
                                    type="button" 
                                    className="button is-light"
                                    onClick={() => navigate('/orders')}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddOrder;