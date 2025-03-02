import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Card = ({ title, id,to }) => {
  const [pendingCount, setPendingCount] = useState(null);

  useEffect(() => {
    const fetchPendingProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}`+`/api/admin/product/pending/${id}`);
        if (response.data.success) {
          setPendingCount(response.data.pending);
        } else {
          setPendingCount(0); 
        }
      } catch (error) {
       
        setPendingCount(0); 
      }
    };

    fetchPendingProducts();
  }, [id]);

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>Waiting for approval</p>
        <div className="flex items-center">
          <div className="p-5">
            <i className="ri-shopping-bag-4-line"></i> Products
          </div>
          <div className="badge bg-red-300">{pendingCount !== null ? `+${pendingCount}` : 'Loading...'}</div>
        </div>
        <div className="card-actions justify-end">
          <Link to={to} className="btn btn-primary">Show</Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
