import React from 'react';
import { Container, Typography, IconButton, Link } from '@mui/material';
import { styled } from '@mui/system';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';

const FooterContainer = styled(Container)(({ theme }) => ({
  backgroundColor: '#000',
  color: '#fff',
  padding: '10px 0',
  position: 'fixed',
  bottom: 0,
  left: 0, // Ensure it starts from the leftmost part of the screen
  width: '100%',
  display: 'flex',
  justifyContent: 'center', // Center children horizontally
  alignItems: 'center',
  flexDirection: 'row',
  boxSizing: 'border-box', // Include padding in width calculations
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

const ContentWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  width: '100%', // Make sure the wrapper takes the full width
  maxWidth: '1200px', // Set a reasonable max width for the content
  boxSizing: 'border-box', // Include padding in width calculations
});

const ContactInfo = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    marginBottom: '10px',
  },
}));

const SocialIcons = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

const LegalLinks = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Footer = () => {
  return (
    <FooterContainer>
      <ContentWrapper>
      <ContactInfo variant="body2">
        support/contact: <br /> saulweiloveman@gmail.com <br /> 
      </ContactInfo>
      <SocialIcons>
        <IconButton color="inherit" aria-label="Facebook" href="https://www.etherscan.io">
          <Facebook />
        </IconButton>
        <IconButton color="inherit" aria-label="Instagram" href="https://www.opensea.io">
          <Instagram />
        </IconButton>
        <IconButton color="inherit" aria-label="Twitter" href="https://www.twitter.com/FrightClub_NFT">
          <Twitter />
        </IconButton>
      </SocialIcons>
      <LegalLinks>
        <Link href="/privacy-policy" underline="none">
          Privacy Policy
        </Link>
        <Link href="/terms-of-service" underline="none">
          Terms of Service
        </Link>
        <Link href="/user-agreement" underline="none">
          User Agreement
        </Link>
      </LegalLinks>
      </ContentWrapper>
    </FooterContainer>
  );
};

export default Footer;