import React from 'react';
import AdminScreen from '../components/Admin/AdminScreen';
import Navbar from '../components/Navbar';

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <Navbar/>
      <AdminScreen />
      {/* Other admin components */}
    </div>
  );
};

export default AdminDashboard;
