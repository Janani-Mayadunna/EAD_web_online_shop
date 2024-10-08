import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DashInfoCard.css';

const DashInfoCard = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [totalCommission, setTotalCommission] = useState(0);
  const [systemTotalOrders, setSystemTotalOrders] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalVendors, setTotalVendors] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');

    try {
      // Fetch all orders
      const ordersResponse = await axios.get('https://localhost:7282/api/order', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
      });

      const orders = ordersResponse.data;
      setOrdersData(orders);

      // Calculate total orders and commission
      setSystemTotalOrders(orders.length);
      const commission = orders.reduce((acc, order) => acc + order.totalPrice * 0.1, 0);
      setTotalCommission(commission);

      // Fetch all users
      const usersResponse = await axios.get('https://localhost:7282/api/user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
      });

      const users = usersResponse.data;
      // Count vendors and customers
      const vendorCount = users.filter((user) => user.role === 'Vendor').length;
      const customerCount = users.filter((user) => user.role === 'Customer').length;

      setTotalVendors(vendorCount);
      setTotalCustomers(customerCount);
    } catch (error) {
      console.error(error);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='grey-bg container-fluid'>
        <section id='stats-subtitle'>
          <div className='row'>
            <div className='col-12 mt-3 mb-1'>
              <h2 className='cardTopic text-uppercase'>Overall Statistics</h2>
              <br />
              <br />
            </div>
          </div>

          {error && <p className='text-danger text-center'>{error}</p>}
          {loading ? (
            <p className='text-center'>Loading statistics...</p>
          ) : (
            <>
              <div className='row'>
                <div className='col-xl-5 col-md-12'>
                  <div className='card overflow-hidden'>
                    <div className='card-content'>
                      <div className='card-body clearfix'>
                        <div className='row'>
                          <div className='col-8'>
                            <div className='media-body px-4'>
                              <h4>Total Revenue</h4>
                            </div>
                            <div
                              className='align-self-center px-4'
                              style={{ marginTop: '1rem', marginBottom: '1rem' }}
                            >
                              <h1>Rs. {totalCommission.toFixed(2)}</h1>
                            </div>
                          </div>
                          <div className='cardIcon col-4'>
                            <i
                              className='bi bi-currency-dollar'
                              style={{ fontSize: '4rem', color: '#84dcc6' }}
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-xl-1 col-md-12'></div>

                <div className='col-xl-5 col-md-12'>
                  <div className='card overflow-hidden'>
                    <div className='card-content'>
                      <div className='card-body clearfix'>
                        <div className='row'>
                          <div className='col-8'>
                            <div className='media-body px-4'>
                              <h4>Total Orders</h4>
                            </div>
                            <div
                              className='align-self-center px-4'
                              style={{ marginTop: '1rem', marginLeft: '3rem' }}
                            >
                              <h1>{systemTotalOrders}</h1>
                            </div>
                          </div>
                          <div className='cardIcon col-4'>
                            <i
                              className='bi bi-box-seam'
                              style={{ fontSize: '4rem', color: '#ffac81' }}
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <div className='row'>
                <div className='col-xl-5 col-md-12'>
                  <div className='card overflow-hidden'>
                    <div className='card-content'>
                      <div className='card-body clearfix'>
                        <div className='row'>
                          <div className='col-8'>
                            <div className='media-body px-4'>
                              <h4>Total Customers</h4>
                            </div>
                            <div
                              className='align-self-center px-5'
                              style={{
                                marginTop: '1rem',
                                marginLeft: '3rem',
                                marginBottom: '1rem',
                              }}
                            >
                              <h1>{totalCustomers}</h1>
                            </div>
                          </div>
                          <div className='cardIcon col-4'>
                            <i
                              className='bi bi-people-fill'
                              style={{ fontSize: '4rem', color: '#ffafcc' }}
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-xl-1 col-md-12'></div>

                <div className='col-xl-5 col-md-12'>
                  <div className='card overflow-hidden'>
                    <div className='card-content'>
                      <div className='card-body clearfix'>
                        <div className='row'>
                          <div className='col-8'>
                            <div className='media-body px-4'>
                              <h4>Total Vendors</h4>
                            </div>
                            <div
                              className='align-self-center px-5'
                              style={{
                                marginTop: '1rem',
                                marginLeft: '3rem',
                                marginBottom: '1rem',
                              }}
                            >
                              <h1>{totalVendors}</h1>
                            </div>
                          </div>
                          <div className='cardIcon col-4'>
                            <i
                              className='bi bi-person-fill-add'
                              style={{ fontSize: '4rem', color: '#809bce' }}
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default DashInfoCard;
