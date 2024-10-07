import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../layout';
import DataTable from 'react-data-table-component';
import { tableCustomStyles } from '../../tableStyle';

const CSROrderCancel = () => {
  const [cancelRequests, setCancelRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all orders and filter those with cancel requests
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await axios.get('https://localhost:7282/api/order', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('csr_token')}`,
          },
        });

        const filteredOrders = response.data.filter(
          (order) => order.isCancelRequested
        );
        setCancelRequests(filteredOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to load cancel requests. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      await axios.delete(`https://localhost:7282/api/order/cancel/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('csr_token')}`,
        },
      });

      // Update state to remove the cancelled order from the list
      setCancelRequests((prevRequests) =>
        prevRequests.filter((order) => order.id !== orderId)
      );
      console.log(`Order ${orderId} has been cancelled successfully.`);
    } catch (error) {
      console.error('Error cancelling order:', error);
      setError('Failed to cancel the order. Please try again.');
    }
  };

  const columns = [
    {
      name: 'Order ID',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Items',
      selector: (row) => (
        <ul>
          {row.items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ),
    },
    {
      name: 'Total Price',
      selector: (row) => `$${row.totalPrice.toFixed(2)}`,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: 'Phone Number',
      selector: (row) => row.phoneNumber,
      sortable: true,
    },
    {
      name: 'Cancel',
      cell: (row) => (
        <button
          className='btn btn-danger'
          onClick={() => handleCancelOrder(row.id)}
        >
          Cancel
        </button>
      ),
    },
  ];

  return (
    <Layout>
      <div className='childContainerAdmin'>
        <h1 className='text-center mb-4'>Requested Order Cancellations</h1>
        {error && <p className='text-danger text-center'>{error}</p>}
        {loading ? (
          <p className='text-center'>Loading cancel requests...</p>
        ) : (
          <DataTable
            customStyles={tableCustomStyles}
            columns={columns}
            data={cancelRequests}
            pagination={true}
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 15, 20]}
            noDataComponent='No Cancel Requests Found'
          />
        )}
      </div>
    </Layout>
  );
};

export default CSROrderCancel;
