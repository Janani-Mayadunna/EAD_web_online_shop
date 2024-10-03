import React, { useState, useEffect } from 'react';
import './DashInfoCard.css';
import axios from 'axios';

const DashInfoCard = () => {
  const [orders, setOrders] = useState([]);
  const [totalCommission, setTotalCommission] = useState([]);
  const [systemTotalOrders, setSystemTotalOrders] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState([]);
  const [totalSellers, setTotalSellers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const getAllOrders = () => {
    axios
      .get(`http://localhost:8072/orders/getallorders`)
      .then((res) => {
        setOrders(res.data);

        // Total Revenue
        const totalCommission = res.data
          .map((order) => {
            return order.commission;
          })
          .reduce((acc, commission) => {
            return acc + commission;
          }, 0);

        setTotalCommission(totalCommission);

        // Total Orders
        let totalProducts = 0;
        res.data.forEach((order) => {
          totalProducts++;
        });
        setSystemTotalOrders(totalProducts);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  //Get total customers

  const getAllCustomers = () => {
    axios
      .get('http://localhost:8075/auth/')
      .then((res) => {
        setTotalCustomers(res.data);

        let totalCus = 0;
        res.data.forEach((customer) => {
          totalCus++;
        });
        setTotalCustomers(totalCus);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // Get all sellers

  const getAllSellers = () => {
    axios

      .get('http://localhost:8084/users/')
      .then((res) => {
        const filteredSellers = res.data.filter((seller) => {
          return seller.Role === 'Seller';
        });
        setSellers(filteredSellers);

        let totalSel = 0;
        filteredSellers.forEach((seller) => {
          totalSel++;
        });
        setTotalSellers(totalSel);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getAllOrders();
    getAllCustomers();
    getAllSellers();
  }, []);

  return (
    <div>
      <div class='grey-bg container-fluid'>
        <section id='stats-subtitle'>
          <div class='row'>
            <div class='col-12 mt-3 mb-1'>
              <h2 class='cardTopic text-uppercase'>Overall Statistics</h2>
              <br />
              <br />
            </div>
          </div>

          <div class='row'>
            <div class='col-xl-5 col-md-12'>
              <div class='card overflow-hidden'>
                <div class='card-content'>
                  <div class='card-body cleartfix'>
                    <div className='row'>
                      <div className='col-8'>
                        <div class='media-body px-4'>
                          <h4>Total Revenue</h4>
                        </div>
                        <div
                          class='align-self-center px-4'
                          style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                          <h1>Rs. {totalCommission}</h1>
                        </div>
                      </div>
                      <div className='cardIcon col-4'>
                        <i
                          class='bi bi-currency-dollar'
                          style={{ fontSize: '4rem', color: '#84dcc6' }}></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class='col-xl-1 col-md-12'></div>

            <div class='col-xl-5 col-md-12'>
              <div class='card overflow-hidden'>
                <div class='card-content'>
                  <div class='card-body cleartfix'>
                    <div className='row'>
                      <div className='col-8'>
                        <div class='media-body px-4'>
                          <h4>Total Orders</h4>
                        </div>
                        <div
                          class='align-self-center px-4'
                          style={{ marginTop: '1rem', marginLeft: '3rem' }}>
                          <h1>{systemTotalOrders}</h1>
                        </div>
                      </div>
                      <div className='cardIcon col-4'>
                        <i
                          class='bi bi-box-seam'
                          style={{ fontSize: '4rem', color: '#ffac81' }}></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div class='row'>
            <div class='col-xl-5 col-md-12'>
              <div class='card overflow-hidden'>
                <div class='card-content'>
                  <div class='card-body cleartfix'>
                    <div className='row'>
                      <div className='col-8'>
                        <div class='media-body px-4'>
                          <h4>Total Customers</h4>
                        </div>
                        <div
                          class='align-self-center px-5'
                          style={{
                            marginTop: '1rem',
                            marginLeft: '3rem',
                            marginBottom: '1rem',
                          }}>
                          <h1>{totalCustomers}</h1>
                        </div>
                      </div>
                      <div className='cardIcon col-4'>
                        <i
                          class='bi bi-people-fill'
                          style={{ fontSize: '4rem', color: '#ffafcc' }}></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class='col-xl-1 col-md-12'></div>

            <div class='col-xl-5 col-md-12'>
              <div class='card overflow-hidden'>
                <div class='card-content'>
                  <div class='card-body cleartfix'>
                    <div className='row'>
                      <div className='col-8'>
                        <div class='media-body px-4'>
                          <h4>Total Sellers</h4>
                        </div>
                        <div
                          class='align-self-center px-5'
                          style={{
                            marginTop: '1rem',
                            marginLeft: '3rem',
                            marginBottom: '1rem',
                          }}>
                          <h1>{totalSellers}</h1>
                        </div>
                      </div>
                      <div className='cardIcon col-4'>
                        <i
                          class='bi bi-person-fill-add'
                          style={{ fontSize: '4rem', color: '#809bce' }}></i>
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
