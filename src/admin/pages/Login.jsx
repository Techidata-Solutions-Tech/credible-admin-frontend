import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AdminDataContext } from '../../context/AdminContext';
const Login = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { admin, setAdmin } = React.useContext(AdminDataContext)
  useEffect(() => {
    if (token) {
      navigate('/admin');
    }
  }, [token]);

  const onSubmit = async (data) => {
    const payLoad = {
      username: data.email,
      password: data.password,
    };
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/admin/login`, payLoad);
    const result = response.data;
    if (response.status === 200) {
      setAdmin(result.admin);
      localStorage.setItem('token', result.token);
      navigate('/admin')
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <figure className="rounded">
          <img
            src="https://www.searchenginejournal.com/wp-content/uploads/2022/08/google-shopping-ads-6304dccb7a49e-sej.png"
            alt="Shoes"
          />
        </figure>
        <div className="flex justify-center items-center pt-2">
          <h1 className="text-5xl md:text-5xl font-bold text-gray-800 text-center">
            Welcome to Credible!
          </h1>
        </div>
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          {errors.email && (
            <div className="chat chat-end absolute right-[250px]">
              <div className="chat-bubble">{errors.email.message}</div>
            </div>
          )}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
            autoComplete='true'
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register('email', { required: 'Email is required' })}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
                  autoComplete='true'
              placeholder="password"
              className="input input-bordered"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long',
                },
              })}
            />
            {errors.password && (
              <div className="chat chat-end absolute right-[250px]">
                <div className="chat-bubble">{errors.password.message}</div>
              </div>
            )}
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;