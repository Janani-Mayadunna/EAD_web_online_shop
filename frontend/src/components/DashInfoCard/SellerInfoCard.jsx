import React, { useEffect, useState } from 'react';
import './DashInfoCard.css';
import axios from 'axios';
const SellerInfoCard = () => {
  const [sellerOrders, setSellerOrders] = useState([]);
  const [sellerTotalProfit, setSellerTotalProfit] = useState([]);
  const [sellerTotalOrders, setSellerTotalOrders] = useState([]);
  const sellerInfo = JSON.parse(localStorage.getItem('systemInfo'));
  const getSellerName = sellerInfo['user']['UserName'];

  const calculateSellerProfit = () => {
    const sellerInfo = JSON.parse(localStorage.getItem('systemInfo'));
    const getSellerId = sellerInfo['user']['_id'];
    axios
      .get(`http://localhost:8072/orders/getallorders`)
      .then((res) => {
        const filteredSellerOrders = res.data.filter((order) => {
          return order.sellerId === getSellerId && order.status === 'Delivered';
        });
        setSellerOrders(filteredSellerOrders);

        const totalCommission = filteredSellerOrders
          .map((order) => {
            return order.commission;
          })
          .reduce((acc, commission) => {
            return acc + commission;
          }, 0);

        const productSum = filteredSellerOrders
          .map((order) => {
            return order.total;
          })
          .reduce((acc, total) => {
            return acc + total;
          }, 0);

        const totalProfit = productSum - totalCommission;
        setSellerTotalProfit(totalProfit);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const countSellerOrders = () => {
    const sellerInfo = JSON.parse(localStorage.getItem('systemInfo'));
    const getSellerId = sellerInfo['user']['_id'];
    axios
      .get(`http://localhost:8072/orders/getallorders`)
      .then((res) => {
        const filteredSellerOrders2 = res.data.filter((order) => {
          return order.sellerId === getSellerId;
        });
        setSellerOrders(filteredSellerOrders2);

        let totalProducts = 0;
        filteredSellerOrders2.forEach((order) => {
          totalProducts++;
        });
        setSellerTotalOrders(totalProducts);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    calculateSellerProfit();
    countSellerOrders();
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
                          <h4>Total Income</h4>
                        </div>
                        <div class='align-self-center px-4'>
                          <h1>Rs. {sellerTotalProfit}</h1>
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
                        <div class='align-self-center px-4'>
                          <h1>{sellerTotalOrders}</h1>
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
          {/* <div class="row">
            <div class="col-xl-5 col-md-12">
              <div class="card overflow-hidden">
                <div class="card-content">
                  <div class="card-body cleartfix">
                    <div className="row">
                      <div className="col-8">
                        <div class="media-body px-4">
                          <h4>Total Customers</h4>
                        </div>
                        <div class="align-self-center px-5">
                          <h1>2000</h1>
                        </div>
                      </div>
                      <div className="cardIcon col-4">
                        <i
                          class="bi bi-people-fill"
                          style={{ fontSize: "4rem", color: "#ffafcc" }}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xl-1 col-md-12"></div>

            <div class="col-xl-5 col-md-12">
              <div class="card overflow-hidden">
                <div class="card-content">
                  <div class="card-body cleartfix">
                    <div className="row">
                      <div className="col-8">
                        <div class="media-body px-4">
                          <h4>Total Sellers</h4>
                        </div>
                        <div class="align-self-center px-5">
                          <h1>200</h1>
                        </div>
                      </div>
                      <div className="cardIcon col-4">
                        <i
                          class="bi bi-person-fill-add"
                          style={{ fontSize: "4rem", color: "#809bce" }}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </section>
      </div>
    </div>
  );
};

export default SellerInfoCard;
