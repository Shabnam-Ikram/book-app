import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import Loader from '../components/Loader';
import { useSelector } from 'react-redux';

const SingleBook = () => {
  const { id } = useParams(); // Get the id parameter from the URL
  const [book, setBook] = useState(null);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // Get the authentication state from Redux
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`https://movie-json-server-bhus.onrender.com/books/${id}`);
        setBook(response.data);
        console.log(response)
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    fetchBook();

    // Cleanup function
    return () => {
      // Cleanup code if needed
    };
  }, [id]); // Add id as a dependency to re-fetch data when id changes

  // Function to delete a book
  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`https://movie-json-server-bhus.onrender.com/books/${bookId}`);
      setBook(null); // Clear the book state after deletion
      alert(`Deleted book ${bookId} successfully`);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      p={3}
      textAlign="center"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: 'url("https://hips.hearstapps.com/hmg-prod/images/pile-of-books-with-pages-open-by-wind-royalty-free-image-1600785994.jpg?crop=0.79555xw:1xh;center,top&resize=2048:*")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {book ? (
        <Card variant="outlined" sx={{ maxWidth: 600, backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 4, padding: '20px' }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {book.title}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              Author: {book.author}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              Category: {book.category}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              Release Year: {book.release_year}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              Number of Chapters: {book.no_of_chapters}
            </Typography>

            <Box textAlign="center" mt={2}>
              {isAuthenticated && (
                <>
                  <Button
                    component={Link}
                    to={`/books/${id}/edit`}
                    variant="contained"
                    color="primary"
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color='error'
                    onClick={() => handleDelete(book.id)}
                  >
                    Delete
                  </Button>
                </>
              )}
              {!isAuthenticated && (
                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  color="primary"
                >
                  Login to view details
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Loader />
      )}
    </Box>
  );
};

export default SingleBook;
