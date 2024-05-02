import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  Button
} from "@mui/material";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { setSortOption } from "../store/authSlice";
import Navbar from './Navbar';

const Books = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    science_fiction: false,
    novel: false,
    thriller: false,
    motivational: false,
  });

  const sortOption = useSelector(state => state.auth.sortOption); 
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []); 

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://movie-json-server-bhus.onrender.com/books"
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const newFilters = { ...filters, [name]: checked };
  
    // If only one checkbox can be selected at a time
    if (checked) {
      Object.keys(newFilters).forEach((key) => {
        if (key !== name) {
          newFilters[key] = false;
        }
      });
    }
  
    setFilters(newFilters);
  };

  const handleSortOption = (event) => {
    dispatch(setSortOption(event.target.value));
  };

  const filteredBooks = data.filter((book) => {
    if (
      !filters.novel &&
      !filters.science_fiction &&
      !filters.thriller &&
      !filters.motivational
    ) {
      return true;
    }
    if (filters.novel && book.category === "Novel") {
      return true;
    }
    if (filters.science_fiction && book.category === "Science_Fiction") {
      return true;
    }
    if (filters.thriller && book.category === "Thriller") {
      return true;
    }
    if (filters.motivational && book.category === "Motivational") {
      return true;
    }
    return false;
  });

  const sortedBooks = [...filteredBooks]; 
  if (sortOption === 'asc') {
    sortedBooks.sort((a, b) => a.release_year - b.release_year);
  } else if (sortOption === 'desc') {
    sortedBooks.sort((a, b) => b.release_year - a.release_year);
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Box>Error: {error.message}</Box>;
  }

  

  return (
    <Box p={3} bgcolor="#f0f0f0" backgroundColor="#bde2e4">
  <Navbar />
  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
    {/* Filter Section */}
    <Box>
      <Typography>Filter by Category</Typography>
      <Box mb={2} style={{padding: '20px'}}>
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.novel}
              onChange={handleCheckboxChange}
              name="novel"
            />
          }
          label="Novel"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.science_fiction}
              onChange={handleCheckboxChange}
              name="science_fiction"
            />
          }
          label="Science_Fiction"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.thriller}
              onChange={handleCheckboxChange}
              name="thriller"
            />
          }
          label="Thriller"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.motivational}
              onChange={handleCheckboxChange}
              name="motivational"
            />
          }
          label="Motivational"
        />
      </Box>
    </Box>
    {/* Sort Section */}
    <Box>
      <Typography>Sort by Year</Typography>
      <Box mb={2} style={{padding: '20px'}}>
        <Select  
          value={sortOption}
          onChange={handleSortOption}
          variant="outlined"
        >
          <MenuItem value="asc" >Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </Box>
    </Box>
  </Box>
  <Grid container spacing={3} justifyContent="center" >
    {sortedBooks.map((book) => (
      <Grid item key={book.id} xs={12} sm={6} md={4} lg={3}  >
       <Card sx={{ height: "100%", display: "flex", flexDirection: "column", borderColor: "#8fcdd1", borderWidth: 2, borderStyle: "solid", backgroundColor: "#fef2f5" }}>

          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              {book.title}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Author: {book.author}
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
              Book Name: {book.book_name}
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
              Published Year: {book.release_year}
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
              Category: {book.category}
            </Typography>
          </CardContent>
          <Box display="flex" justifyContent="center" pb={2}>
            <Link to={`/books/${book.id}`}>
            <Button variant="contained" color="primary" style={{ width: "100%", backgroundColor: "#3f939b" }}>
            Details
            </Button>

            </Link>
          </Box>
        </Card>
      </Grid>
    ))}
  </Grid>
</Box>

  );
};

export default Books;
