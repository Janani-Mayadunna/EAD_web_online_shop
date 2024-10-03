import React from 'react';
import Layout from '../layout';

const VendorRegister = () => {
  return (
    <Layout>
      <div className='container mt-5'>
        <h2 className='mb-4'>Register Vendors</h2>
        <form>
          {/* Name Field */}
          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>
              Name
            </label>
            <input
              type='text'
              className='form-control'
              id='name'
              placeholder='Enter vendor name'
              required
            />
          </div>

          {/* Email Field */}
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input
              type='email'
              className='form-control'
              id='email'
              placeholder='Enter vendor email'
              required
            />
          </div>

          {/* Password Field */}
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              id='password'
              placeholder='Enter password'
              required
            />
          </div>

          {/* Submit Button */}
          <button type='submit' className='btn btn-primary'>
            Register Vendor
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default VendorRegister;
