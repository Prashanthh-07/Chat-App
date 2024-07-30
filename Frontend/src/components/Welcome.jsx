import React from 'react';
import styled from 'styled-components';
import robot from '../assets/robot.gif';
import Logout from './Logout';

function Welcome({ currentUser }) {
  return (
    <Container>
      <LogoutWrapper>
        <Logout />
      </LogoutWrapper>
      <img src={robot} alt='robot' />
      <h1>
        Welcome, <span>{currentUser.username}!</span>
      </h1>
      <h3>Please select a chat for messaging</h3>
    </Container>
  );
}

export default Welcome;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: white;
  gap: 0.5rem;
  position: relative; /* Add this to ensure the LogoutWrapper is positioned relative to Container */
  img {
    height: 20rem;
  }
  span {
    color: #4e00ff;
  }
`;

const LogoutWrapper = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  /* Adjust the top and right values as needed */
`;
