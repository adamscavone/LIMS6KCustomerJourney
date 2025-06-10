import React from 'react';
import TopNavigation from './navigation/TopNavigation';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
};

export default Layout;