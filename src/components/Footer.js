import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  text-align: center;
  margin-top: 2rem;
  padding: 1rem 0;
  border-top: 1px solid #eee;
`;

const Footer = () => (
  <FooterContainer>
    <p>Created with love for you ❤️</p>
  </FooterContainer>
);

export default Footer;
