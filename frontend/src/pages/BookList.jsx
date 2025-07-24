import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../app/axios';
import { isLoggedIn, logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({ author: '', genre: '' });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const query = new URLSearchParams({...filters, page, limit: 5}).toString();
        const res = await API.get(`/books?${query}`);
        setBooks(res.data.allbooks);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.log('Failed to load books:', err);
      }
    };

    fetchBooks();
  }, [filters, page]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1);
  };

  const renderStars = (rating) => {
    if (rating === null) return 'No rating';
    const rounded = Math.round(rating);
    return '⭐'.repeat(rounded) + '☆'.repeat(5 - rounded);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    logout('token');
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">Book Review Platform</h1>
      <div className="flex justify-between items-center mb-6 ">
        <Link
          to="/add-book"
          className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          ➕ Add New Book
        </Link>
        {isLoggedIn() ? (
          <button
            onClick={handleLogout}
            className="text-sm bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <div className="space-x-2">
            <Link
              to="/login"
              className="text-sm bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <input
          name="author"
          placeholder="Filter by author"
          value={filters.author}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          name="genre"
          placeholder="Filter by genre"
          value={filters.genre}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      {/* Book List */}
      <div className="space-y-4">
        {books.map((book) => (
          <Link
            to={`/books/${book.id}`}
            key={book.id}
            className="block p-4 bg-white shadow-md rounded-md hover:bg-indigo-50 transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{book.title}</h2>
                <p className="text-sm text-gray-600">{book.author} — {book.genre}</p>
              </div>
              <div className="text-right">
                <p className="text-yellow-500 text-lg">{renderStars(book.averageRating)}</p>
                <p className="text-xs text-gray-500">{book.reviewCount} reviews</p>
              </div>
            </div>
          </Link>
        ))}
        {books.length === 0 && <p className="text-center text-gray-600">No books found.</p>}
      </div>
      <div className="flex justify-center gap-2 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-2">{`Page ${page} of ${totalPages}`}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

    </div>

  );
};

export default BookList;
