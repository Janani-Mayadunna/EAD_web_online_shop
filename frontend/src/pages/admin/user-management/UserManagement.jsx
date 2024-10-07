import React, { useState, useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import axios from 'axios';
import Layout from '../layout';
import DataTable from 'react-data-table-component';
import './UserManagement.css';

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState('Vendor');
  const [users, setUsers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [csrs, setCsrs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch all users when component mounts
    fetchAllUsers();
  }, []);

  useEffect(() => {
    // Filter users based on role whenever users state changes
    filterUsersByRole();
  }, [users]);

  const fetchAllUsers = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get('https://localhost:7282/api/user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
      });

      setUsers(response.data);
    } catch (error) {
      setError('Failed to load users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filterUsersByRole = () => {
    const filteredVendors = users.filter((user) => user.role === 'Vendor');
    const filteredCsrs = users.filter((user) => user.role === 'CSR');
    setVendors(filteredVendors);
    setCsrs(filteredCsrs);
  };

  const handleActivateDeactivate = async (user) => {
    const endpoint = `https://localhost:7282/api/user/${
      user.isActive ? 'deactivate' : 'activate'
    }/${user.id}`;

    try {
      await axios.post(endpoint, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
      });

      // Update users list after activation/deactivation
      fetchAllUsers();
    } catch (error) {
      setError('Failed to update user status. Please try again.');
    }
  };

  // Define columns for the data table
  const columns = [
    {
      name: 'Username',
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Active Status',
      selector: (row) => (row.isActive ? 'Active' : 'Inactive'),
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <button
          className={`btn ${row.isActive ? 'btn-danger' : 'btn-success'}`}
          onClick={() => handleActivateDeactivate(row)}
        >
          {row.isActive ? 'Deactivate' : 'Activate'}
        </button>
      ),
    },
  ];

  return (
    <Layout>
      <div className='childContainerAdmin'>
        <div className='content'>
          <div className='container mt-5 users-container'>
            <h2 className='mb-4 text-center users-header'>User Management</h2>

            <Tabs
              activeKey={activeTab}
              onSelect={(tab) => setActiveTab(tab)}
              className='mb-4 users-tab-bar'
            >
              <Tab eventKey='Vendor' title='Vendors'>
                {error && <p className='text-danger text-center'>{error}</p>}
                {loading && activeTab === 'Vendor' ? (
                  <p className='text-center'>Loading vendors...</p>
                ) : (
                  <DataTable
                    columns={columns}
                    data={vendors}
                    pagination
                    highlightOnHover
                    striped
                    noDataComponent='No vendors available'
                    className='users-data-table'
                  />
                )}
              </Tab>
              <Tab eventKey='CSR' title='Customer Sales Representatives'>
                {error && <p className='text-danger text-center'>{error}</p>}
                {loading && activeTab === 'CSR' ? (
                  <p className='text-center'>Loading CSRs...</p>
                ) : (
                  <DataTable
                    columns={columns}
                    data={csrs}
                    pagination
                    highlightOnHover
                    striped
                    noDataComponent='No CSRs available'
                    className='users-data-table'
                  />
                )}
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserManagement;
