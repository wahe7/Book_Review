import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import API from '../app/axios'
import {setToken} from '../utils/auth'

const Login = () =>{
  const navigate = useNavigate();
  const [form, setForm] = useState({ email:"",password:""});

  const handleChange = (e) =>{
    setForm({...form,[e.target.name]:e.target.value});
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
      const response = await API.post("/auth/login",form);
      setForm({ email: "", password: "" });
      setToken(response.data.token);
      navigate("/");
    }catch(err){
      setForm({email:"",password:""});
      alert("Invalid credentials");
    }
  }

  useEffect(() => {
    setForm({ email: '', password: '' });
  }, []);

  return(
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-black-600">
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600">Welcome Back</h2>
        <div className="space-y-4">
          <input
            autoComplete="off"
            type="email"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Login
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="text-indigo-600 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  )
}

export default Login;
