import React from 'react';

function AdminDashboard() {
  const stats = [
    { label: 'Total Orders', value: '0' },
    { label: 'Total Sales', value: 'GHS 0.00' },
    { label: 'Customers', value: '0' },
    { label: 'Products', value: '8' },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-dark-text mb-8">Admin Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="bg-white p-6 rounded-3xl shadow-lg">
              <p className="text-gray-600 text-sm">{s.label}</p>
              <p className="text-2xl font-bold text-deep-green">{s.value}</p>
            </div>
          ))}
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-lg">
          <h2 className="text-xl font-semibold text-dark-text mb-4">Recent Orders</h2>
          <p className="text-gray-600">No orders yet. Connect the database and backend to load live data.</p>
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;
