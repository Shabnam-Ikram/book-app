import React, { useState } from 'react';
import { Button, Grid, Paper, Input } from '@mui/material';
import { useDispatch } from 'react-redux'; // Importing useDispatch hook
import { addBook } from '../store/bookSlice'; // Importing the addBook action
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const dispatch = useDispatch(); // Initializing useDispatch hook
  const [book_name, setBook_name] = useState('');
  const [author, setAuthor] = useState('');
  const [chapterName, setChapterName] = useState('');
  const [chapterPages, setChapterPages] = useState('');
  const [category, setCategory] = useState('');
  const [release_year, setRelease_year] = useState('');
  const [coverPhoto, setCoverPhoto] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newBook = {
      book_name,
      author,
      release_year,
      category,
      chapters: [{
        name: chapterName,
        pages: chapterPages
      }],
      cover_photo: coverPhoto
    };

    try {
      const response = await fetch('https://movie-json-server-bhus.onrender.com/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBook)
      });

      if (!response.ok) {
        throw new Error('Failed to add book');
      }

      // Book added successfully
      console.log('Book added successfully');
      navigate('/')

      // Dispatching the addBook action with the new book data
      dispatch(addBook(newBook));

      // Clearing input fields after successful submission
      setBook_name('');
      setAuthor('');
      setRelease_year('');
      setCategory('');
      setChapterName('');
      setChapterPages('');
      setCoverPhoto('');
    } catch (error) {
      console.error('Error adding book:', error.message);
      // Handle error here
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={6}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="Book Name"
              fullWidth
              value={book_name}
              onChange={(e) => setBook_name(e.target.value)}
            />
            <Input
              placeholder="Author"
              fullWidth
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <Input
              placeholder="Release Year"
              fullWidth
              value={release_year}
              onChange={(e) => setRelease_year(e.target.value)}
            />
            <Input
              placeholder="Category"
              fullWidth
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <Input
              placeholder="Chapter Name"
              fullWidth
              value={chapterName}
              onChange={(e) => setChapterName(e.target.value)}
            />
            <Input
              placeholder="Chapter Pages"
              fullWidth
              value={chapterPages}
              onChange={(e) => setChapterPages(e.target.value)}
            />
            <Input
              placeholder="Cover Photo URL"
              fullWidth
              value={coverPhoto}
              onChange={(e) => setCoverPhoto(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Book
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AddBook;