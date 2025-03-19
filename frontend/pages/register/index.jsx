import { useState } from 'react';

import axios from 'axios';

import { useRouter } from 'next/router';



const Register = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [error,setError] = useState('');
  const router = useRouter();



  const handleSubmit = async (e) => {

    e.preventDefault();

    if (password!=confirmpassword)
    {
      setError("Passwords do not match");
    }

    
    try {
      await axios.post('http://localhost:8000/api/register/', { username,email,password });
      
      router.push('/login');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-grey-100">

      <div className="bg-white p-8 rounded-lg shadow-md w-96">

        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>

            <label className="block text-sm font-medium text-gray-700">Username</label>

            <input

              type="text"

              value={username}

              onChange={(e) => setUsername(e.target.value)}

              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"

              required

            />
          </div>

           <div>

            <label className="block text-sm font-medium text-gray-700">Email</label>

            <input

              type="email"

              value={email}

              onChange={(e) => setEmail(e.target.value)}

              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"

              required

            />  

          </div>

          <div>

            <label className="block text-sm font-medium text-gray-700">Password</label>

            <input

              type="password"

              value={password}

              onChange={(e) => setPassword(e.target.value)}

              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"

              required

            />

          </div>

          <div>

            <label className="block text-sm font-medium text-gray-700">Re-enter Password</label>

              <input

                type="password"

                value={confirmpassword}

                onChange={(e) => setConfirmpassword(e.target.value)}

                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"

                required

              />
          </div>

          <button

            type="submit"

            className ="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"

          >

            Register

          </button>

        </form>

        
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-green-600 hover:text-green-500">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;