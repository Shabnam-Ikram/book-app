import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogContentText, Button } from '@mui/material';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem('authToken');

    if (!token) {
      // If token does not exist, show alert dialog
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    navigate('/');
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            Please log in to access this page.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      {children}
    </>
  );
};

export default ProtectedRoute;