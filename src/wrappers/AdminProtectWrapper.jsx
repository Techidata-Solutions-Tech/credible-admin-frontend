import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminProtectWrapper = ({ children }) => {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    if (!token || userRole !== 'admin') {
      navigate('/');
    } else {
      setIsAuthorized(true);
    }

    setCheckingAuth(false);
  }, [navigate]);

  if (checkingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots w-16 h-16"></span>
      </div>
    );
  }

  return isAuthorized ? <>{children}</> : null;
};

export default AdminProtectWrapper;
