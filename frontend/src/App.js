import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BookList from './pages/BookList';
import AddBook from './pages/AddBook';
import BookDetail from './pages/BookDetail';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<BookList />} />
        <Route
          path="/add-book"
          element={<ProtectedRoute><AddBook /></ProtectedRoute>}
        />
        <Route path="/books/:id" element={<BookDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
