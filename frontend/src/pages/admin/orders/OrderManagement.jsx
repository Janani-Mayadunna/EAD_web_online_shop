import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../layout';
import DataTable from 'react-data-table-component';
import './OrderManagement.css';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get('https://localhost:7282/api/order', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
      });

      setOrders(response.data);
    } catch (error) {
      console.error(error);
      setError('Failed to load orders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsDelivered = async (orderId) => {
    try {
      await axios.put(
        'https://localhost:7282/api/order/updateStatus',
        {
          id: orderId,
          newStatus: 'Delivered',
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Update orders list after marking as delivered
      fetchOrders();
    } catch (error) {
      console.error(error);
      setError('Failed to update order status. Please try again.');
    }
  };

  // Define columns for the main orders data table
  const columns = [
    {
      name: 'Order ID',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Phone Number',
      selector: (row) => row.phoneNumber,
      sortable: true,
    },
    {
      name: 'Delivery Address',
      selector: (row) => row.deliveryAddress,
      sortable: true,
    },
    {
      name: 'Total Price',
      selector: (row) => `Rs. ${row.totalPrice.toLocaleString()}`,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) =>
        row.status === 'Processing' && (
          <button
            className='btn mark-as-delivered-btn'
            onClick={() => handleMarkAsDelivered(row.id)}
          >
            Mark as Delivered
          </button>
        ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  // Nested table for showing order items
  const ExpandedComponent = ({ data }) => (
    <div className='expanded-items-container'>
      <h5>Order Items</h5>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Item Image</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item) => (
            <tr key={item.id}>
              <td>
                <img
                  src={
                    item.images && item.images.length > 0
                      ? item.images[0]
                      : 'https://via.placeholder.com/100x100?text=No+Image'
                  }
                  alt={item.name}
                  className='order-item-image'
                />
              </td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{`Rs. ${item.price.toLocaleString()}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <Layout>
      <div className='childContainerAdmin'>
        <div className='content'>
          <br />
          <div className='container mt-5 orders-container'>
            <h2 className='mb-4 text-center orders-header'>Order Management</h2>
            {error && <p className='text-danger text-center'>{error}</p>}
            {loading ? (
              <p className='text-center'>Loading orders...</p>
            ) : (
              <DataTable
                columns={columns}
                data={orders}
                pagination
                highlightOnHover
                striped
                noDataComponent='No orders available'
                expandableRows
                expandableRowsComponent={ExpandedComponent}
                className='orders-data-table'
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderManagement;
