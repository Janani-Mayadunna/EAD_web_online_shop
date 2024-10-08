import React, { useState } from 'react';
import Layout from '../layout';
import { Card, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import './VendorRegister.css';

const VendorRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message
    setSuccessMessage(''); // Reset success message

    const newVendor = {
      email: email,
      username: name,
      password: password,
      role: 'Vendor',
    };

    try {
      // Make API request to register a new vendor
      const response = await axios.post(
        'https://localhost:7282/api/user/register', 
        newVendor,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage('Vendor successfully registered!');
        // Reset form fields
        setName('');
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      // console.log(error.response); // Log the error for debugging purposes
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Failed to register vendor. Please try again.');
      }
    }
  };

  return (
    <Layout>
      <div className='container mt-5 d-flex justify-content-center'>
        <Card className='p-5 shadow-lg vendor-card' style={{ maxWidth: '600px', width: '100%' }}>
          <h2 className='mb-5 text-center vendor-header'>Register Vendor</h2>
          <form onSubmit={handleSubmit}>
            {error && <p className="text-danger">{error}</p>}
            {successMessage && <p className="text-success">{successMessage}</p>}

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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span
                    className='password-toggle-icon'
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <i className='bi bi-eye-slash'></i>
                    ) : (
                      <i className='bi bi-eye'></i>
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
