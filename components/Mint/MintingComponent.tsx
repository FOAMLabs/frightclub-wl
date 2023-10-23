import React, { useState, useEffect, useMemo } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import { FrightClubABI } from "../../utils/frightclub";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import Snackbar, { snackbarClasses } from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import MerkleTree from 'merkletreejs';
import keccak256 from 'keccak256';
import { WlAddresses } from '../../utils/WlAddresses';
import Image from "next/image";
import { Box } from "@mui/material";


import {
  useAccount,
  usePrepareContractWrite,
  useWaitForTransaction,
  useContractWrite,
  useContractRead,
} from "wagmi";

enum MintStage {
  WhitelistOnly,
  Public,
  
}

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
    const [mintStage, setMintStage] = useState<MintStage>(MintStage.WhitelistOnly);
    const { connectModalOpen } = useConnectModal(); 
    const [isWalletConnected, setIsWalletConnected] = useState<boolean>(true); 
    const addresses = WlAddresses;
    const leaves = useMemo(() => addresses.map(x => keccak256(x)), [addresses]);
    const tree = useMemo(() => new MerkleTree(leaves, keccak256, { sortPairs: true }), [leaves]);
    const buf2hex = (x: Buffer): string => '0x' + x.toString('hex');
  
    console.log(buf2hex(tree.getRoot()));
  
    const [leaf, setLeaf] = useState<string>(''); // Set initially to an empty string
    const [_merkleProof, setMerkleProof] = useState<string[]>([]); // Set initially to an empty array
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
    
    useEffect(() => {
      if (address) {
        const newLeaf = keccak256(address).toString('hex');
        setLeaf(newLeaf);
        const newProof = tree.getProof(newLeaf).map(({ data }) => buf2hex(data));
        setMerkleProof(newProof);
      }
    }, [address, tree]);
    

    
  const contractConfig = {
    address: "0xbBb60CeBdE66a7062B7B57A2b6Ae747041562510",
    FrightClubABI,
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

  const { write, error: whitelistMintError, } = useContractWrite({
    address: '0x46b77a64dCeE752dd4F9e5b26A5273B2e182e57A',
    abi: FrightClubABI,
    functionName:'whitelistMint',
    args:[BigInt(_mintAmount),(_merkleProof)],
    value: BigInt(mintAmountInWei)
  });


  const { config: writeConfig } = usePrepareContractWrite({
    address: '0x46b77a64dCeE752dd4F9e5b26A5273B2e182e57A',
    abi: FrightClubABI,
    functionName: "mint",
    args: [BigInt(_mintAmount)],
    value: BigInt(mintAmountInWei),
  });

  const {
    data: mintData,
    write: mint,
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

  
  const mintNFT = async () => {
    try {
      if (mintStage === MintStage.WhitelistOnly) {
        // If the mint stage is WhitelistOnly, use the whitelistMint function
        if (write) {  // Assuming `write` is the function to handle whitelist minting
          await write();
          if (whitelistMintError?.message.includes('The total cost (gas * gas fee + value)')){
            setSnackbarError("You Gotta Get Some More Ethereum... Happy Halloween")
          }
          if (whitelistMintError?.message.includes('Address already claimed!')) {
            setSnackbarError("boo... you already minted")
        }else if (whitelistMintError?.message.includes('Invalid proof!')){
            setSnackbarError("You are not on the whitelist!");
          } 
          
        } else {
          console.error('Whitelist mint function is not available.');
        }
      } else if (mintStage === MintStage.Public) {
        // If the mint stage is Public, use the mint function
        if (mint) {
          await mint();
          // ... additional logic for handling public minting
        } else {
          console.error('Mint function is not available.');
        }
      } else {
        console.error('Invalid mint stage.');
      }
  
      // Check if the transaction was successful (no error thrown)
      if (txData && !txError) {
        return;
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

