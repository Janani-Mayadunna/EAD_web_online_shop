import React, { useState } from 'react';
import Layout from '../layout';
import { Card, Row, Col, Button } from 'react-bootstrap';
import './VendorRegister.css';

const VendorRegister = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Layout>
      <div className='container mt-5 d-flex justify-content-center'>
        <Card
          className='p-5 shadow-lg vendor-card'
          style={{ maxWidth: '600px', width: '100%' }}
        >
          <h2 className='mb-5 text-center vendor-header'>Register Vendor</h2>
          <form>
            <Row className='mb-5'>
              {/* Name Field */}
              <Col xs={12}>
                <label htmlFor='name' className='vendor-form-label'>
                  Name
                </label>
                <input
                  type='text'
                  className='form-control rounded-pill vendor-input'
                  id='name'
                  placeholder='Enter vendor name'
                  required
                />
              </Col>
            </Row>

            <Row className='mb-5'>
              {/* Email Field */}
              <Col xs={12}>
                <label htmlFor='email' className='vendor-form-label'>
                  Email
                </label>
                <input
                  type='email'
                  className='form-control rounded-pill vendor-input'
                  id='email'
                  placeholder='Enter vendor email'
                  required
                />
              </Col>
            </Row>

            <Row className='mb-5 position-relative'>
              {/* Password Field */}
              <Col xs={12}>
                <label htmlFor='password' className='vendor-form-label'>
                  Password
                </label>
                <div className='position-relative'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className='form-control rounded-pill vendor-input'
                    id='password'
                    placeholder='Enter password'
                    required
                  />
                  <span
                    className='password-toggle-icon'
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <i class='bi bi-eye-slash'></i>
                    ) : (
                      <i class='bi bi-eye'></i>
                    )}
                  </span>
                </div>
              </Col>
            </Row>

            {/* Submit Button */}
            <div className='d-flex justify-content-center'>
              <Button
                type='submit'
                variant='primary'
                className='btn-lg rounded-pill vendor-btn'
              >
                Register Vendor
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default VendorRegister;
