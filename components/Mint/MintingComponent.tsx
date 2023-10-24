import React, { useState, useEffect, useMemo } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import Snackbar, { snackbarClasses } from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import Image from "next/image";
import { Box } from "@mui/material";


import {
  useAccount,
  usePrepareContractWrite,
  useWaitForTransaction,
  useContractWrite,
  useContractRead,
} from "wagmi";



const StyledCard = styled(Card)({
    maxWidth: 300,
    margin: "0 auto",
    padding: 20,
    textAlign: "center",
    borderRadius: 25,
    marginTop: "50px", 
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
  });
  
const MintNFTComponent = () => {

    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarError, setSnackbarError] = useState<string | null>(null);

    const [totalSupply, setTotalSupply] = useState<number>(0); 
    const [maxMintAmountPerTx] = useState<number>(3); 
    const [_mintAmount, setMintAmount] = useState<number>(1);
    const { isConnected, address } = useAccount();
    const { connectModalOpen } = useConnectModal(); 
    const [isWalletConnected, setIsWalletConnected] = useState<boolean>(true); 


    useEffect(() => {
      console.log("connectModalOpen:", connectModalOpen);
      if (connectModalOpen) {
        setIsWalletConnected(true);
      }
    }, [connectModalOpen]);

    const account = useAccount({
        onConnect({ address, connector, isReconnected }) {
          console.log("Connected", { address, connector, isReconnected });
        },
      });
    
    
  const contractConfig = {
    address: "0xbBb60CeBdE66a7062B7B57A2b6Ae747041562510",
    abi:[{"inputs":[{"internalType":"string","name":"_tokenName","type":"string"},{"internalType":"string","name":"_tokenSymbol","type":"string"},{"internalType":"uint256","name":"_cost","type":"uint256"},{"internalType":"uint256","name":"_maxSupply","type":"uint256"},{"internalType":"uint256","name":"_maxMintAmountPerTx","type":"uint256"},{"internalType":"string","name":"_hiddenMetadataUri","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ApprovalCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"ApprovalQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"ApprovalToCurrentOwner","type":"error"},{"inputs":[],"name":"ApproveToCaller","type":"error"},{"inputs":[],"name":"BalanceQueryForZeroAddress","type":"error"},{"inputs":[],"name":"InvalidQueryRange","type":"error"},{"inputs":[],"name":"MintToZeroAddress","type":"error"},{"inputs":[],"name":"MintZeroQuantity","type":"error"},{"inputs":[],"name":"OwnerQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"TransferCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"TransferFromIncorrectOwner","type":"error"},{"inputs":[],"name":"TransferToNonERC721ReceiverImplementer","type":"error"},{"inputs":[],"name":"TransferToZeroAddress","type":"error"},{"inputs":[],"name":"URIQueryForNonexistentToken","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"isPaused","type":"bool"}],"name":"ContractPaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"enum FrightClubV1.FaceState","name":"newState","type":"uint8"}],"name":"FaceStateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"newUri","type":"string"}],"name":"HiddenMetadataUriUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newMaxMintAmount","type":"uint256"}],"name":"MaxMintAmountPerTxUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newMaxSupply","type":"uint256"}],"name":"MaxSupplyUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newCost","type":"uint256"}],"name":"MintingCostUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"isRevealed","type":"bool"}],"name":"Revealed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"enum FrightClubV1.FaceState","name":"state","type":"uint8"},{"indexed":false,"internalType":"string","name":"newBaseURI","type":"string"}],"name":"StateBaseURIUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"newSuffix","type":"string"}],"name":"UriSuffixUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"isEnabled","type":"bool"}],"name":"WhitelistMintEnabledUpdated","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentState","outputs":[{"internalType":"enum FrightClubV1.FaceState","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"explicitOwnershipOf","outputs":[{"components":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint64","name":"startTimestamp","type":"uint64"},{"internalType":"bool","name":"burned","type":"bool"}],"internalType":"struct IERC721A.TokenOwnership","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"explicitOwnershipsOf","outputs":[{"components":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint64","name":"startTimestamp","type":"uint64"},{"internalType":"bool","name":"burned","type":"bool"}],"internalType":"struct IERC721A.TokenOwnership[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"hiddenMetadataUri","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxMintAmountPerTx","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"merkleRoot","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_mintAmount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_mintAmount","type":"uint256"},{"internalType":"address","name":"_receiver","type":"address"}],"name":"mintForAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"revealed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_cost","type":"uint256"}],"name":"setCost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"enum FrightClubV1.FaceState","name":"_state","type":"uint8"}],"name":"setFaceState","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_hiddenMetadataUri","type":"string"}],"name":"setHiddenMetadataUri","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxMintAmountPerTx","type":"uint256"}],"name":"setMaxMintAmountPerTx","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_merkleRoot","type":"bytes32"}],"name":"setMerkleRoot","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_state","type":"bool"}],"name":"setPaused","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_state","type":"bool"}],"name":"setRevealed","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"enum FrightClubV1.FaceState","name":"_state","type":"uint8"},{"internalType":"string","name":"_baseURI","type":"string"}],"name":"setStateBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_uriSuffix","type":"string"}],"name":"setUriSuffix","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_state","type":"bool"}],"name":"setWhitelistMintEnabled","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"enum FrightClubV1.FaceState","name":"","type":"uint8"}],"name":"stateBaseURIs","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tokenFaceState","outputs":[{"internalType":"enum FrightClubV1.FaceState","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"tokensOfOwner","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"stop","type":"uint256"}],"name":"tokensOfOwnerIn","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"uriSuffix","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"whitelistClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_mintAmount","type":"uint256"},{"internalType":"bytes32[]","name":"_merkleProof","type":"bytes32[]"}],"name":"whitelistMint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"whitelistMintEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}],
  } as const;

  const { data: maxMintAmountPerTxData } = useContractRead({
    ...contractConfig,
    functionName: "maxMintAmountPerTx",
    watch: true,
  });

  const { data: totalSupplyData } = useContractRead({
    ...contractConfig,
    functionName: "totalSupply",
    watch: true,
  });

  const { data: costData } = useContractRead({
    ...contractConfig,
    functionName: "cost",
    watch: true,
  });

  const decimalNumber = 0.02;
  const mintAmountInWei = BigInt(decimalNumber * _mintAmount * 1e18); // 1e18 is used to convert to Wei



  const { config: writeConfig } = usePrepareContractWrite({
    ...contractConfig,
    functionName: "mint",
    args: [BigInt(_mintAmount)],
    value: BigInt(mintAmountInWei),
  });

  const {
    data: mintData,
    write,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
    error: mintError,
  } = useContractWrite(writeConfig);

  const {
    data: txData,
    error: txError,
  } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  const calculateCostInEth = (amount: number) => {
    const costInEth = 0.02 * amount;
    return `${costInEth} ETH`;
  };

  // Function to handle incrementing the mint amount
  const incrementMintAmount = () => {
    if (_mintAmount < maxMintAmountPerTx) {
      setMintAmount(_mintAmount + 1);
    }
  };

  // Function to handle decrementing the mint amount
  const decrementMintAmount = () => {
    if (_mintAmount > 1) {
      setMintAmount(_mintAmount - 1);
    }
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  
  // Mint NFT function
  const mintNFT = async () => {
    try {
      if (write) {
        // You can customize arguments, gas, and other transaction parameters here.
        // Call the mint function from your smart contract
        await write();
      }
    } catch (error) {
      if (typeof error === "string") {
        console.error(error);
      } else if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred.");
      }
    }
  };
  function formatAddress(address?: string) {
    // Define how many characters you want to keep before and after the dots.
    const charactersToKeep = 4;
  
    if (!address) {
      return "Address not available";
    }
  
    // Check if the address is long enough to format.
    if (address.length > 2 * charactersToKeep) {
      const start = address.slice(0, charactersToKeep);
      const end = address.slice(-charactersToKeep);
      return `${start}...${end}`;
    } else {
      return address;
    }
  }

  return (
    <StyledCard>
      <CardContent>
      <Box sx={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 1,
          marginBottom: 1,
          maxWidth: "100%",
          borderRadius: "10px"
        }}>
          <Image src="/logo.svg" alt="Logo" width={200} height={80} />
        </Box>
      </CardContent>
      <CardContent>
        <video width="100%" autoPlay loop muted>
          <source src="/PreReveal.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </CardContent>

      <CardContent>
        <Typography variant="h6" component="div" align="center">
          address<br />
        </Typography>
        <Typography variant="h4" component="div" align="center">
          {formatAddress(address)}
        </Typography>
      </CardContent>

      <CardContent>
        <Grid container alignItems="center" justifyContent="center" spacing={1}>
          <Grid item>
            <Button
              variant="contained"
              onClick={decrementMintAmount}
              disabled={_mintAmount <= 1 || isMintLoading}
              sx={{
                backgroundColor: "#B31414",
                "&:hover": {
                  // The styles you want when the button is hovered can go here.
                  // This is optional and just an example.
                  backgroundColor: "#9F1111",
                },
                "&:active": {
                  backgroundColor: "black",
                }
              }}
            >
              -
            </Button>
          </Grid>
          <Grid item>
            <Typography variant="h6" component="div" align="center">
              {_mintAmount}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={incrementMintAmount}
              sx={{
                backgroundColor: "#B31414",
                "&:hover": {
                  // The styles you want when the button is hovered can go here.
                  // This is optional and just an example.
                  backgroundColor: "#9F1111",
                },
                "&:active": {
                  backgroundColor: "black",
                }
              }}
              disabled={_mintAmount >= maxMintAmountPerTx || isMintLoading}
            >
              +
            </Button>
          </Grid>
        </Grid>
      </CardContent>

      <CardContent>
        <Grid container alignItems="center" justifyContent="center" spacing={1}>
          <Grid item>
            <Typography>{calculateCostInEth(_mintAmount)}</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={mintNFT}
              sx={{
                backgroundColor: "#B31414",
                "&:hover": {
                  // The styles you want when the button is hovered can go here.
                  // This is optional and just an example.
                  backgroundColor: "#9F1111",
                },
                "&:active": {
                  backgroundColor: "black",
                }
              }}
            
              disabled={_mintAmount <= 0 || isMintLoading}
            >
              Mint NFT
            </Button>
          </Grid>
        </Grid>
      </CardContent>

      {/* Display mint and transaction errors */}
      {mintError && (
        <Typography color="error" align="center">
          Mint Error: {mintError.message}
        </Typography>
      )}

        {snackbarError && (
          <Snackbar open={!!snackbarError} autoHideDuration={6000} onClose={() => setSnackbarError(null)}>
            <MuiAlert onClose={() => setSnackbarError(null)} severity="error">
              {snackbarError}
            </MuiAlert>
          </Snackbar>
        )}

      {txError && (
        <Snackbar open={!!txError} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <MuiAlert onClose={handleSnackbarClose} severity="error">
            {txError.message}
          </MuiAlert>
        </Snackbar>
      )}

      {/* Show loading indicator during minting */}
      {isMintLoading && (
        <Typography color="primary" align="center">
          Minting in progress...
        </Typography>
      )}
    </StyledCard>
  );
};

export default MintNFTComponent;

