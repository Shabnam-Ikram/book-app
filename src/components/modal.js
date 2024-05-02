import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

const AddBookModal = ({ handleCloseModal, setBooks }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    releaseYear: '',
    category: '',
    // Add more fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to add a new book
      const response = await axios.post('https://movie-json-server-bhus.onrender.com/books', formData);
      const newBook = response.data; // Get the newly added book data from the response
      alert('Book added successfully!');
      handleCloseModal();
  
      // Update the state with the new book
      setBooks(prevBooks => [...prevBooks, newBook]);
    } catch (error) {
      console.error('Error adding book:', error);
      // alert('Failed to add book. Please try again.');
    }
  };
  

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        maxWidth: 400,
        width: '100%',
        outline: 'none',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Add New Book
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Release Year"
          name="releaseYear"
          value={formData.releaseYear}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          margin="normal"
        />
        {/* Add more fields as needed */}
        <Box mt={2} textAlign="center">
          <Button type="submit" variant="contained" color="primary">
            Add Book
          </Button>
          <Button onClick={handleCloseModal} variant="contained" color="secondary" sx={{ ml: 2 }}>
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddBookModal;
