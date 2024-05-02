// App.js
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Books from './components/Books';
import SingleBook from './components/SingleBook';
import EditBook from './components/EditBook';
import Login from './components/Login';
import { fetchBooks } from './store/bookSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks()); // Dispatch action to fetch books
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/books/:id" element={<SingleBook />} />
        <Route path="/books/:id/edit" element={<EditBook />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<h3>Page Not Found</h3>} />
      </Routes>
    </div>
  );
}

export default App;
