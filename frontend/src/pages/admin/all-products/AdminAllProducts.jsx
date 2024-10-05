import React from 'react';
import Layout from '../layout';
import DataTable from 'react-data-table-component';
import { tableCustomStyles } from '../../tableStyle';
import products from '../data/products.json';
import UpdateStockModal from '../stock-manage/UpdateStockModal';

const AdminAllProducts = () => {
  const [openUpdateStockModal, setOpenUpdateStockModal] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  const columns = [
    {
      name: 'Product',
      selector: (row) => (
        <img
          className='cart-product-img'
          src={
            row.images.length > 0
              ? row.images[0]
              : 'https://via.placeholder.com/120'
          }
          alt={row.name}
          style={{ height: '120px', width: '120px' }}
        />
      ),
    },
    {
      name: 'Product Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Category',
      selector: (row) => row.category.name,
      sortable: true,
    },
    {
      name: 'Price',
      selector: (row) => `$${row.price.toFixed(2)}`,
      sortable: true,
    },
    {
      name: 'Active Status',
      selector: (row) => (row.isActive ? 'Active' : 'Inactive'),
      sortable: true,
    },
    {
      name: 'Stock',
      selector: (row) => row.inventoryCount,
      sortable: true,
    },
    {
      name: 'Update Stock',
      cell: (row) => (
        <button
          className='btn btn-warning'
          onClick={() => handleUpdateStockModalOpen(row)}
        >
          <i className='bi bi-pencil-square'></i>
        </button>
      ),
    },
  ];

  const handleUpdateStockModalOpen = (product) => {
    setSelectedProduct(product);
    setOpenUpdateStockModal(true);
  };

  return (
    <Layout>
      <div className='childContainerAdmin'>
        <div className='content'>
          <br />
          <h1 style={{ textAlign: 'center' }}>All Products</h1>
          <br />
          <br />
          <DataTable
            customStyles={tableCustomStyles}
            columns={columns}
            data={products}
            pagination={true}
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
            noDataComponent='No Products Found'
          />
        </div>
      </div>
      {selectedProduct && (
        <UpdateStockModal
          show={openUpdateStockModal}
          handleClose={() => setOpenUpdateStockModal(false)}
          product={selectedProduct}
        />
      )}
    </Layout>
  );
};

export default AdminAllProducts;
