import React from 'react';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
  const handleLogout =  async () => {
    localStorage.clear();
     navigate('/login');
    console.log('Logging out...');
  };

  return (
    <IconButton onClick={handleLogout} style={{ color: 'white' }}>
      <LogoutIcon style={{ color: 'inherit' }} />
    </IconButton>
  );
};

export default Logout;
