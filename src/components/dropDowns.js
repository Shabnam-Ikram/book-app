// SortDropdown.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { setSortOption } from '../store/authSlice';
import { Button, Menu, MenuItem } from '@mui/material';

const SortDropdown = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortOption = (option) => {
    dispatch(setSortOption(option));
    handleClose();
  };

  return (
    <>
      <Button onClick={handleClick} variant="outline">
        Sort by Year
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleSortOption('asc')}>Ascending</MenuItem>
        <MenuItem onClick={() => handleSortOption('desc')}>Descending</MenuItem>
      </Menu>
    </>
  );
};

export default SortDropdown;
