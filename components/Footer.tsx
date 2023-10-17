import React from 'react';
import { Container, Typography, IconButton, Link } from '@mui/material';
import { styled } from '@mui/system';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';

const FooterContainer = styled(Container)({
  backgroundColor: '#000',
  color: '#fff',
  padding: '10px 0',
  position: 'fixed',  // changed from relative to fixed
  bottom: 0,  // added to fix the footer to the bottom
  width: '100%',
  display: "flex",
  justifyContent: "space-between",  // changed from center to space-between
  alignItems: "center",
  minHeight: "10vh",
});

const SocialIcons = styled('div')({
  '& > *': {
    margin: '0 5px',  // adjusted margin values
  },
});

const LegalLinks = styled('div')({
  '& > *': {
    color: '#f00',
    textDecoration: 'none',
    margin: '20px 5px',  // adjusted margin values
  },
});

const Footer = () => {
  return (
    <FooterContainer>
      <Typography variant="body2">
        Contact: email@example.com | Phone: 123-456-7890
      </Typography>
      <SocialIcons>
        <IconButton color="inherit" aria-label="Facebook" href="https://www.facebook.com">
          <Facebook />
        </IconButton>
        <IconButton color="inherit" aria-label="Instagram" href="https://www.instagram.com">
          <Instagram />
        </IconButton>
        <IconButton color="inherit" aria-label="Twitter" href="https://www.twitter.com">
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
    </FooterContainer>
  );
};

export default Footer;
