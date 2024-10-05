import React, { useState, useEffect } from 'react';
import './DashInfoCard.css';
import orders from '../../pages/data/orders.json';

const DashInfoCard = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [totalCommission, setTotalCommission] = useState(0);
  const [systemTotalOrders, setSystemTotalOrders] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(50); // Dummy value for total customers
  const [totalSellers, setTotalSellers] = useState(20); // Dummy value for total sellers

  useEffect(() => {
    // Load orders data from orders.json
    setOrdersData(orders);

    // Calculate commission as 10% of all order total prices
    const commission = orders.reduce((acc, order) => {
      return acc + order.totalPrice * 0.1;
    }, 0);
    setTotalCommission(commission);

    // Set total orders count
    setSystemTotalOrders(orders.length);
  }, []);

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

          <div className='row'>
            <div className='col-xl-5 col-md-12'>
              <div className='card overflow-hidden'>
                <div className='card-content'>
                  <div className='card-body cleartfix'>
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
                  <div className='card-body cleartfix'>
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
                  <div className='card-body cleartfix'>
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
                  <div className='card-body cleartfix'>
                    <div className='row'>
                      <div className='col-8'>
                        <div className='media-body px-4'>
                          <h4>Total Sellers</h4>
                        </div>
                        <div
                          className='align-self-center px-5'
                          style={{
                            marginTop: '1rem',
                            marginLeft: '3rem',
                            marginBottom: '1rem',
                          }}
                        >
                          <h1>{totalSellers}</h1>
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
        </section>
      </div>
    </div>
  );
};

export default DashInfoCard;
