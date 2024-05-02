// bookSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  books: [],
  loading: false,
  error: null
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook(state, action) {
      state.books.push(action.payload);
    },
    removeBook(state, action) {
      state.books = state.books.filter(book => book.id !== action.payload);
    },
    updateBook(state, action) {
      const { id, updatedBook } = action.payload;
      const index = state.books.findIndex(book => book.id === id);
      if (index !== -1) {
        state.books[index] = updatedBook;
      }
    },
    // New action to handle fetching books
    fetchBooksStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchBooksSuccess(state, action) {
      state.loading = false;
      state.books = action.payload;
    },
    fetchBooksFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { addBook, removeBook, updateBook, fetchBooksStart, fetchBooksSuccess, fetchBooksFailure } = bookSlice.actions;

// Thunk action to fetch books
export const fetchBooks = () => async dispatch => {
  dispatch(fetchBooksStart());
  try {
    const response = await axios.get('https://movie-json-server-bhus.onrender.com/books');
    dispatch(fetchBooksSuccess(response.data));
    console.log(response);
  } catch (error) {
    dispatch(fetchBooksFailure(error.message));
  }
};

export default bookSlice.reducer;
