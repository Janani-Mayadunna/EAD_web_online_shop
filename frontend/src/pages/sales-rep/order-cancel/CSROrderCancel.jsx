import React, { useState, useEffect } from 'react';
import Layout from '../layout';
import DataTable from 'react-data-table-component';
import { tableCustomStyles } from '../../tableStyle';
import orders from '../data/orders.json';

const CSROrderCancel = () => {
  const [cancelRequests, setCancelRequests] = useState([]);

  // Filter orders to show only those with cancel requests
  useEffect(() => {
    const filteredOrders = orders.filter((order) => order.isCancelRequested);
    setCancelRequests(filteredOrders);
  }, []);

  const handleCancelOrder = (orderId) => {
    console.log(`Order ${orderId} has been cancelled.`);
    // TODO: logic here to process the cancellation
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
        <DataTable
          customStyles={tableCustomStyles}
          columns={columns}
          data={cancelRequests}
          pagination={true}
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
          noDataComponent='No Cancel Requests Found'
        />
      </div>
    </Layout>
  );
};

export default CSROrderCancel;
