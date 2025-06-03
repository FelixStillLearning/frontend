import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const OrderDetail = () => {
    const [order, setOrder] = useState(null);
    const { id } = useParams();

    const getOrderById = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:5000/orders/${id}`);
            setOrder(response.data);
        } catch (error) {
            console.log(error);
        }
    }, [id]);

    useEffect(() => {
        getOrderById();
    }, [getOrderById]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'is-warning';
            case 'confirmed': return 'is-info';
            case 'shipped': return 'is-primary';
            case 'delivered': return 'is-success';
            case 'cancelled': return 'is-danger';
            default: return 'is-light';
        }
    };

    if (!order) {
        return <div>Loading...</div>;
    }

    return (
        <div className="columns mt-5">
            <div className="column is-full">
                <div className="box">
                    <h1 className="title is-4">Order Detail</h1>
                    
                    <div className="columns">
                        <div className="column is-half">
                            <div className="field">
                                <label className="label">Order Number</label>
                                <p className="control">
                                    <strong>{order.orderNumber}</strong>
                                </p>
                            </div>
                            
                            <div className="field">
                                <label className="label">Customer</label>
                                <p className="control">
                                    {order.user ? order.user.name : 'Unknown'} ({order.user ? order.user.email : 'No email'})
                                </p>
                            </div>
                            
                            <div className="field">
                                <label className="label">Status</label>
                                <p className="control">
                                    <span className={`tag ${getStatusColor(order.status)} is-medium`}>
                                        {order.status}
                                    </span>
                                </p>
                            </div>
                            
                            <div className="field">
                                <label className="label">Total Amount</label>
                                <p className="control">
                                    <strong>Rp {order.totalAmount}</strong>
                                </p>
                            </div>
                        </div>
                        
                        <div className="column is-half">
                            <div className="field">
                                <label className="label">Expedition</label>
                                <p className="control">
                                    {order.expedition ? order.expedition.name : 'No Expedition Selected'}
                                </p>
                            </div>
                            
                            <div className="field">
                                <label className="label">Shipping Cost</label>
                                <p className="control">
                                    Rp {order.shippingCost}
                                </p>
                            </div>
                            
                            <div className="field">
                                <label className="label">Tracking Number</label>
                                <p className="control">
                                    {order.trackingNumber || 'Not Available'}
                                </p>
                            </div>
                            
                            <div className="field">
                                <label className="label">Estimated Delivery</label>
                                <p className="control">
                                    {order.estimatedDelivery ? new Date(order.estimatedDelivery).toLocaleDateString() : 'Not Set'}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="field">
                        <label className="label">Shipping Address</label>
                        <div className="box">
                            <p>{order.shippingAddress}</p>
                        </div>
                    </div>
                    
                    <div className="field">
                        <label className="label">Order Date</label>
                        <p className="control">
                            {new Date(order.createdAt).toLocaleString()}
                        </p>
                    </div>
                    
                    <div className="field is-grouped">
                        <div className="control">
                            <Link to="/orders" className="button is-light">Back to Orders</Link>
                        </div>
                        <div className="control">
                            <Link to={`/edit-order/${order.id}`} className="button is-primary">Edit Order</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
