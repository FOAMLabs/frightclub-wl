import { useRouter } from "next/router";
import { Button, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import { useSignMessage, useAccount } from "wagmi";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const BackgroundImage = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "black",
  backgroundSize: "cover",
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Overlay = styled("div")({
  background: `
    radialGradient(
      circle at var(--x) var(--y),
      rgba(224, 225, 220, 0.3) 5%,
      rgba(225, 225, 225, 0.2) 10%,
      rgba(30, 30, 0, 0.98) 20%,
      rgba(4, 22, 15, 0.98) 400%,
      rgba(4, 22, 15, 0.97) 100%,
      transparent 5%,
      rgba(3, 2, 15, 0.98) 100%
    )
    no-repeat`,
  backgroundSize: "100% 100%",
  zIndex: 5,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  textAlign: "center",
  borderRadius: "10px",
  color: "#B31414", // Set font color to red
  width: "80%",
  height: "80%",
});

const AddressBox = styled(Box)({
  border: "2px solid white",
  padding: "10px",
  borderRadius: "5px",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "20px 0",
  color: "#B31414", // Set font color to red
});

interface SignMessageResult {
    success: boolean;
    data: string; // You can specify the correct data type if known
  }

  interface WalletConfirmationProps {
    onClose?: () => void;
    updateSignatureStatus?: (status: boolean) => void;
    navigateToVideoComponent?: () => void;
  }
  
  const WalletConfirmation: React.FC<WalletConfirmationProps> = ({
      onClose = () => {},
      updateSignatureStatus = () => {},
      navigateToVideoComponent = () => {},
    }) => {
    const router = useRouter();
  
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState<string>();
  
    const account = useAccount({
      onConnect({ address, connector, isReconnected }) {
        console.log("Connected", { address, connector, isReconnected });
      },
    });
  
    const validationSchema = Yup.object().shape({
      field1: Yup.string().required("Field 1 is required"),
    });
    
  
    const [accountValue] = useState(account?.address || '');
    const message = 'Please sign this message to confirm your wallet address for minting Fright Club. This is a read only gasless transaction and requires no permission or approvals on your wallet. Good luck on the trivia...';
    const { signMessage } = useSignMessage({ message });
  
    const signMessageWithResult = async (): Promise<SignMessageResult> => {
      await signMessage();
      // Assuming your signMessage function returns data upon success, otherwise, replace with actual data.
      const result: SignMessageResult = {
        success: true,
        data: 'Mint is open 10/23/23', // Replace with actual data or remove if not applicable
      };
      return result;
    };
  
    const handleSignMessage = async () => {
      try {
        const result: SignMessageResult = await signMessageWithResult();
  
        if (result.success) {
          setIsSuccess(true);
          setIsError(false);
          setData(result.data);
        } else {
          setIsSuccess(false);
          setIsError(true);
          console.error("Error signing message");
        }
      } catch (error) {
        console.error("Error signing message:", error);
        setIsSuccess(false);
        setIsError(true);
      }
    };
  
    useEffect(() => {
      if (isSuccess) {
        console.log('Signature:', data);
        if (typeof navigateToVideoComponent === 'function') {
          navigateToVideoComponent();
        }
        if (typeof onClose === 'function') {
          onClose();
        }
        if (typeof updateSignatureStatus === 'function') {
          updateSignatureStatus(true);
        }
        // Now, let the useEffect handle the routing
      }
      if (isError) {
        console.error('Error signing message');
      }
    }, [
      isSuccess,
      isError,
      data,
      navigateToVideoComponent,
      onClose,
      updateSignatureStatus,
    ]);
  

    useEffect(() => {
      if (isSuccess) {
        router.push("/Questionairre"); // Redirect to '/trick' only when isSuccess is true
      }
    }, [isSuccess, router]);
  

  return (
    <BackgroundImage>
      <Overlay>
        <Typography variant="h4" gutterBottom>
          Confirm the Ethereum address you want to mint with
        </Typography>

        <Formik
          initialValues={{
            account: accountValue,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            console.log("Form Data:", values);
            handleSignMessage();
            actions.resetForm();
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <AddressBox>{accountValue}</AddressBox>
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={handleSignMessage}
              >
                Verify
              </Button>
            </Form>
          )}
        </Formik>
      </Overlay>
    </BackgroundImage>
  );
};

WalletConfirmation.propTypes = {
  onClose: PropTypes.func,
  updateSignatureStatus: PropTypes.func,
  navigateToVideoComponent: PropTypes.func,
};

WalletConfirmation.defaultProps = {
  onClose: () => {},
  updateSignatureStatus: () => {},
  navigateToVideoComponent: () => {},
};

export default WalletConfirmation;
