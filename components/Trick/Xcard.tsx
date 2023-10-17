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



const XCard: React.FC = ({  }) => {
 
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