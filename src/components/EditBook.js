import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Input, Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateBook } from '../store/bookSlice';
import Loader from '../components/Loader';
import axios from 'axios';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`https://movie-json-server-bhus.onrender.com/books/${id}`);
        setBook(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    fetchBook();

    return () => {
      // Cleanup code if needed
    };
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prevBook => ({
      ...prevBook,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Making the PUT request to update the book data
      await axios.put(`https://movie-json-server-bhus.onrender.com/books/${id}`, book);
      
      // Dispatching the updateBook action with the updated book data
      dispatch(updateBook(id, book));
  
      // Navigate to the homepage after updating the book
      navigate('/');
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  if (isLoading) return <Loader />;
  if (!book) return <div>Error fetching book.</div>;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: 'url("https://hips.hearstapps.com/hmg-prod/images/pile-of-books-with-pages-open-by-wind-royalty-free-image-1600785994.jpg?crop=0.79555xw:1xh;center,top&resize=2048:*")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '20px',
          padding: '20px',
          maxWidth: '600px',
        }}
      >
        <Typography variant='h4' sx={{ textAlign: 'center', marginBottom: '20px' }}>Edit Book</Typography>
        <form onSubmit={handleSubmit}>
          <Input
            name="title"
            placeholder="Title"
            fullWidth
            value={book.book_name || ''} // Use default empty string if title is null
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Input
            name="author"
            placeholder="Author"
            fullWidth
            value={book.author || ''} // Use default empty string if author is null
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Input
            name="release_year"
            placeholder="Release Year"
            fullWidth
            value={book.release_year || ''} // Use default empty string if release_year is null
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Input
            name="category"
            placeholder="Category"
            fullWidth
            value={book.category || ''} // Use default empty string if category is null
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Update Book
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default EditBook;
