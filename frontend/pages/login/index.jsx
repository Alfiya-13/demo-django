import { useState } from 'react';

import axios from 'axios';

import { useRouter } from 'next/router';



const Login = () => {

  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');

  const router = useRouter();



  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post('http://localhost:8000/api/login/', { username, password });

      localStorage.setItem('access_token', res.data.access);

      localStorage.setItem('refresh_token', res.data.refresh);

      router.push('/todos');

    } catch (error) {

      console.error(error);

    }

  };



  return (

    <div className="min-h-screen flex items-center justify-center bg-orange-100">

      <div className="bg-white p-8 rounded-lg shadow-md w-96">

        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>

            <label className="block text-sm font-bold text-blue-700">Username</label>

            <input

              type="text"

              value={username}

              onChange={(e) => setUsername(e.target.value)}

              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"

              required

            />

          </div>

          <div>

            <label className="block text-sm font-bold text-blue-700">Password</label>

            <input

              type="password"

              value={password}

              onChange={(e) => setPassword(e.target.value)}

              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"

              required

            />

          </div>

          <button

            type="submit"

            className ="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"

          >

            Login

          </button>

        </form>

        <p className="mt-4 text-center text-sm text-gray-600">

          Don't have an account?{' '}

          <a href="/register" className="text-indigo-600 hover:text-indigo-500">

            Register

          </a>

        </p>

      </div>

    </div>

  );

};



export default Login;