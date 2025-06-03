import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async () => {
        const response = await axios.get('http://localhost:5000/orders');
        setOrders(response.data);
    };

    const deleteOrder = async (id) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            try {
                await axios.delete(`http://localhost:5000/orders/${id}`);
                getOrders();
            } catch (error) {
                console.log(error);
            }
        }
    };

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

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-full">
                <Link to="/add-order" className="button is-primary">Add Order</Link>
                <table className="table is-striped is-fullwidth">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Order Number</th>
                            <th>Customer</th>
                            <th>Expedition</th>
                            <th>Total Amount</th>
                            <th>Shipping Cost</th>
                            <th>Status</th>
                            <th>Tracking Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order.id}>
                                <td>{index + 1}</td>
                                <td>{order.orderNumber}</td>
                                <td>{order.user ? order.user.name : 'Unknown'}</td>
                                <td>{order.expedition ? order.expedition.name : 'No Expedition'}</td>
                                <td>Rp {order.totalAmount}</td>
                                <td>Rp {order.shippingCost}</td>
                                <td>
                                    <span className={`tag ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td>{order.trackingNumber || 'Not Available'}</td>
                                <td>
                                    <Link to={`/order/${order.id}`} className="button is-primary is-small">View</Link>
                                    <Link to={`/edit-order/${order.id}`} className="button is-info is-small">Edit</Link>
                                    <button onClick={() => deleteOrder(order.id)} className="button is-danger is-small">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderList;
