import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
`;

const Header = () => (
  <HeaderContainer>
    <Title>Our Love Story</Title>
  </HeaderContainer>
);

export default Header;
