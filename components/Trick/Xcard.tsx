import React, {useState, useEffect} from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system"; // Import the styled utility
import { signIn } from "next-auth/react";
import { GoogleSignInButton } from "../authButtons";


// Define a styled Card component
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  padding: theme.spacing(2), // Use theme.spacing directly
  textAlign: "center",
}));

// Define a styled Button component
const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2), // Use theme.spacing directly
}));

const CenteredCardContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh", // Ensure the container takes up the full viewport height
});

interface XCardProps {
  onStartXAPI: () => void;
}

const XCard: React.FC<XCardProps> = ({ onStartXAPI }) => {
  function XVerification() {
    const [isVerified, setIsVerified] = useState(false);
  
    useEffect(() => {
      // Check the session for verification status
      fetch('/api/session/check')
        .then(response => response.json())
        .then(data => {
          setIsVerified(data.isVerified);
        });
    }, []);
    
    return isVerified ? (
      <div>
        <h1>You are signed in</h1>
      </div>
    ) : null;
  }
  
  return (
    <CenteredCardContainer>
      <StyledCard>
        <CardContent>
          <Typography variant="h5" component="div">
            Verify one of your social media accounts
          </Typography>
          <Typography variant="body2">
            This Protects us from bots <br />
            and helps us verify your real.
          </Typography>
            <GoogleSignInButton />
        {/*   {XVerification()} Call the XVerification function here */}
        </CardContent>
      </StyledCard>
    </CenteredCardContainer>
  );
};

export default XCard;