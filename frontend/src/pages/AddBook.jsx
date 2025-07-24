import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../app/axios';

const AddBook = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', author: '', genre: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/books', form); // JWT token is automatically added via Axios interceptor
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add book');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg p-6 rounded-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-indigo-600 text-center">Add New Book</h2>
        <input
          name="title"
          placeholder="Book Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          name="genre"
          placeholder="Genre"
          value={form.genre}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Add Book
        </button>
      </form> 
    </div>
  );
};

export default AddBook;
