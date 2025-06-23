import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const BrokerDetails = () => {
  const { id } = useParams();
  const [broker, setBroker] = useState(null);
  const [customers, setCustomers] = useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://endless-realty-backend.onrender.com';

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/our-associates/${id}`);
        const data = await res.json();
        setBroker(data.broker);
        setCustomers(data.customers);
      } catch (err) {
        console.error('Failed to fetch broker details:', err);
      }
    };
    fetchDetails();
  }, [id]);

  if (!broker) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Link to="/" className="text-blue-500 text-sm">&larr; Back to Dashboard</Link>

      <div className="bg-white rounded shadow p-6 mt-4 flex justify-between items-center">
        <div>
          <div className="flex items-center mb-2">
            <img src={broker.image_url} alt={broker.name} className="w-12 h-12 rounded-full mr-4" />
            <div>
              <h2 className="text-xl font-bold">{broker.name}</h2>
              <p className="text-blue-600 font-semibold">{broker.score}</p>
              <span className="text-sm text-gray-500">Total Score</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <img src={broker.qr_code_url} alt="QR Code" className="w-24 h-24 mx-auto" />
          <p className="text-xs mt-2">Scan to register on endlessrealty.in</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Registered Customers</h3>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2">Customer Name</th>
                <th className="px-4 py-2">Contact Number</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Registration Date</th>
              </tr>
            </thead>
            <tbody>
              {customers.length > 0 ? (
                customers.map((cust) => (
                  <tr key={cust.id} className="border-b">
                    <td className="px-4 py-2">{cust.name}</td>
                    <td className="px-4 py-2">{cust.contact_number}</td>
                    <td className="px-4 py-2">{cust.email}</td>
                    <td className="px-4 py-2">{new Date(cust.registration_date).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                    No customers registered yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

};

export default BrokerDetails;
