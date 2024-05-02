import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Modal } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch hook
import { logout } from '../store/authSlice'; // Import logout action
import AddBookModal from  './modal'; // Import the AddBookModal component

const NavBar = () => {
  const dispatch = useDispatch(); // Define dispatch variable
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
  };

  // State to manage modal visibility
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <AppBar style={{backgroundColor: '#32646c'}} position="static"  sx={{ marginBottom: 3 }} >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h6" component="div">
                Your Books Shell
              </Typography>
            </Link>
          </Box>

          {/* Links */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '2vw' }}>
            {/* Add Book button */}
            {isAuthenticated && (
              <Button onClick={handleOpenModal} sx={{ color: 'white' }} variant='outlined'>
                Add Book
              </Button>
            )}

            {/* Authentication buttons */}
            {isAuthenticated ? 
              <Button onClick={handleLogout} sx={{ color: 'white' }} variant='outlined'>Logout</Button>
            :             
              <Link to={'/login'}>
                <Button sx={{ color: 'white' }} variant='outlined'>Login</Button>
              </Link>
            }
          </Box>
        </Toolbar>
      </AppBar>

      {/* Modal for adding a book */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="add-book-modal-title"
        aria-describedby="add-book-modal-description"
      >
        <AddBookModal handleCloseModal={handleCloseModal} />
      </Modal>
    </>
  );
};

export default NavBar;
