import React from 'react';
import SuperAdminSidebar from '../SuperAdminSidebar';
import { Outlet } from 'react-router-dom';

const AdministrationLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white">
        <SuperAdminSidebar isOpen={true} onClose={() => {}} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdministrationLayout;
