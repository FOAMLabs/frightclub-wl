import React from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system"; // Import the styled utility
import { useSession } from "next-auth/react";
import { DiscordSignInButton } from "../discordAuthButton";

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

interface DiscordCardProps {
  onStartDiscordApi: () => void;
}

const DiscordCard: React.FC<DiscordCardProps> = ({ onStartDiscordApi }) => {
  function DiscordVerification() {
    const { data: session } = useSession();

    if (session && session.user) {
      return (
        <div>
          <h1>You are signed in as {session.user.name}</h1>
        </div>
      );
    }
    return null; // return null if session or session.user is undefined
  }
  
  return (
    <CenteredCardContainer>
      <StyledCard>
        <CardContent>
          <Typography variant="h5" component="div">
            Verify Your Discord Account
          </Typography>
          <Typography variant="body2">
            Read Only... We only keep your username
          </Typography>
      
          <DiscordSignInButton />
      
         {/*  {DiscordVerification()} Call the XVerification function here */}
        </CardContent>
      </StyledCard>
    </CenteredCardContainer>
  );
};

export default DiscordCard;
