import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import './ProductCategories.css';
import Layout from '../layout';

const ProductCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    setError('');

    try {
      // Make API request to get all categories
      const response = await axios.get(
        'https://localhost:7282/api/category',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
          },
        }
      );

      // Update state with fetched categories
      setCategories(response.data);
    } catch (error) {
      console.error(error);
      setError('Failed to load categories. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleActivateDeactivate = async (category) => {
    const endpoint = `https://localhost:7282/api/category/${
      category.isActive ? 'deactivate' : 'activate'
    }/${category.id}`;

    try {
      await axios.post(endpoint, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
      });

      // Update categories list after activation/deactivation
      fetchCategories();
    } catch (error) {
      console.error(error);
      setError('Failed to update category status. Please try again.');
    }
  };

  // Define columns for the data table
  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Category Name',
      selector: (row) => row.name,
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
          <br />
          <div className='container mt-5'>
            <h2 className='mb-4 text-center'>Product Categories</h2>
            {error && <p className='text-danger text-center'>{error}</p>}
            {loading ? (
              <p className='text-center'>Loading categories...</p>
            ) : (
              <DataTable
                columns={columns}
                data={categories}
                pagination
                highlightOnHover
                striped
                noDataComponent='No categories available'
                className='product-categories-table'
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductCategories;
