import React from 'react';
import Layout from '../layout';
import DashInfoCard from '../../../components/DashInfoCard/DashInfoCard';

const AdminDashboard = () => {
  return (
    <Layout>
      <div className='childContainerAdmin'>
        <DashInfoCard />
      </div>
    </Layout>
  );
};

export default AdminDashboard;
