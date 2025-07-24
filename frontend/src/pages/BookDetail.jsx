import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';
import API from '../app/axios';
import {isLoggedIn, logout} from '../utils/auth';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);

  const fetchBook = async () => {
    try {
      const bookRes = await API.get(`/books/${id}`);
      setBook(bookRes.data.book);

      const reviewsRes = await API.get(`/reviews/${id}`);
      setBook(prev => ({
        ...prev,
        reviews: reviewsRes.data
      }));
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(!isLoggedIn()){
        alert("You must be logged in to add a review");
        return;
      }
      await API.post(`/reviews/${id}`, { reviewText, rating: parseInt(rating) });
      setReviewText('');
      setRating(5);
      fetchBook();
    } catch (err) {
      alert('Failed to add review');
      console.error(err);
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    logout('token');
    navigate('/');
  };

  const renderStars = (value) => {
    return '⭐'.repeat(Math.round(value)) + '☆'.repeat(5 - Math.round(value));
  };

  if (!book) return <p className="text-center mt-10">Loading book details...</p>;

  return (
    
    <div className="max-w-3xl mx-auto p-6">
      <div className='flex justify-end'>
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
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">{book.title}</h1>
        <p className="text-gray-600">{book.author} — {book.genre}</p>
        <p className="mt-2 text-yellow-500">{renderStars(book.averageRating || 0)} ({book.reviews?.length || 0} reviews)</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Reviews</h2>
        {book.reviews?.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          book.reviews?.map((r) => (
            <div key={r.id} className="mb-4 border-b pb-2">
              <p className="font-semibold">{r.user?.name || 'Anonymous'}</p>
              <p className="text-yellow-500 text-sm">{renderStars(r.rating)}</p>
              <p className="text-gray-700">{r.reviewText}</p>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-4 rounded-md shadow">
        <h3 className="text-lg font-bold">Add Your Review</h3>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review..."
          required
          className="w-full border p-2 rounded-md"
        />
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full border p-2 rounded-md"
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>{r} Star{r > 1 && 's'}</option>
          ))}
        </select>
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default BookDetail;
