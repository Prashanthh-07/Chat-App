import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import Logout from '../components/Logout'; // Ensure the path is correct
import SetAvatar from './SetAvatar'; // Ensure the path is correct

export default function ProfilePage({ currentUser, onLogout }) {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAvatarClick = () => {
    setIsEditing(true);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  // Check if we are on the /setAvatar route
  const isSetAvatarPage = location.pathname === '/setAvatar';

  return (
    <Container>
      <div className="header">
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        <div className="avatar-container">
          {isSetAvatarPage || isEditing ? (
            <SetAvatar />
          ) : (
            <div
              className="avatar"
              onClick={handleAvatarClick}
            >
              <img
                src={`data:image/svg+xml;base64,${currentUser.avatarImage}`}
                alt="avatar"
              />
            </div>
          )}
        </div>
      </div>
      <div className="profile-info">
        <h2>{currentUser.username}</h2>
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #131324;
  color: white;

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    position: relative;
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;

    .avatar-container {
      position: relative;

      .avatar {
        cursor: pointer;
        img {
          height: 8rem;
          border-radius: 50%;
        }
      }
    }
  }

  .profile-info {
    text-align: center;
  }
`;

const LogoutButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: #ff0000;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
`;
