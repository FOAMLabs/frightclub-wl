import React, { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import Image from 'next/image';
import { FrightClubABI } from '../../../utils/frightclub';
import { useAccount, usePrepareContractWrite, useContractWrite, useContractRead } from 'wagmi';
import { Alchemy, Contract, Network } from "alchemy-sdk";


interface MediaType {
  gif: string;
  mp4: string;
  png: string;
  jpeg: string;
  webp: string;
}

interface Nft {
  metadata?: {
    image: string;
    // Other metadata properties if needed
  };
  // Other properties of the NFT object
}

const StyledCard = styled(Card)({
  maxWidth: 540,

  margin: "0 auto",
  padding: 25,
  textAlign: "center",
  borderRadius: 16,
  marginTop: "140px",
  backgroundColor: "rgba(255, 255, 255, 0.4)",
  boxShadow: "0px 8px 7px rgba(0, 255, 30, 0.3)", // Add a subtle shadow
});

const SquareImage = styled('div')({
  width: '20%',
  paddingTop: '40%',
  position: 'relative',
  '& .logo': {
    position: 'absolute',
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    top: '-40px',
  },
});

const NFTComponent = () => {
  const [currentNFT, setCurrentNFT] = useState<string>('');
  const [selectedNFT, setSelectedNFT] = useState<Nft | null>(null); // Store selected NFT data
  const [imgSrc, setImgSrc] = useState<string>('');

  const { address } = useAccount();
  const _tokenId = currentNFT;

  const [selectedFaceState, setSelectedFaceState] = useState<string>('1');

  // Alchemy setup
  const config = {
    apiKey: "ztH6HxLPsi8Bc444sZ3TmXl-OMetnT_o", // Replace with your API key
    network: Network.ETH_GOERLI, // Replace with your network
  };
  const alchemy = new Alchemy(config);

  useEffect(() => {
    const getNftMetadata = async () => {
      const contract = {
        address: '0xbBb60CeBdE66a7062B7B57A2b6Ae747041562510',
        tokenId: _tokenId,
      };
    
      let response = await alchemy.nft.getNftMetadata(contract.address, _tokenId, {});
    
      if (response && response.rawMetadata && response.rawMetadata.metadata) {
        const imageURI = response.rawMetadata.metadata.image;
        setImgSrc(imageURI);
      } else {
        console.error('NFT metadata or image URI is missing');
      }
    };
  
    if (_tokenId) {
      getNftMetadata();
    }
   
  }, [_tokenId, alchemy.nft]);

  const contractRead = useContractRead({
    address: '0xbBb60CeBdE66a7062B7B57A2b6Ae747041562510',
    abi: FrightClubABI,
    functionName: 'tokensOfOwner',
    args: [address],
  });

  const { data: userTokenIDs, isLoading: readIsLoading } = contractRead;

  const handleSwitchChange = (selectedFaceState: string) => {
    setSelectedFaceState(selectedFaceState); // Update the selected face state
  };

  const { config: writeConfig } = usePrepareContractWrite({
    address: '0xbBb60CeBdE66a7062B7B57A2b6Ae747041562510',
    abi: FrightClubABI,
    functionName: 'setFaceState',
    args: [_tokenId, selectedFaceState], // Use the selected face state
  });

  const { write, isLoading: writeIsLoading, isSuccess: writeIsSuccess, isError: writeIsError } = useContractWrite(writeConfig);

  const handleSubmit = async () => {
    try {
      if (write) {
        write(); // Write the transaction with the selected face state
      }
    } catch (error) {
      // Handle unexpected errors
      console.error(error);
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
        <Typography variant="h3" component="div" align="center">
          User Portal
        </Typography>
        <SquareImage>
          {imgSrc && (
            <>
              <CardContent>
                <Typography variant="h6" component="div" align="center">
                  NFT Media
                </Typography>
                <Grid container alignItems="center" justifyContent="center" spacing={1}>
                  <Grid item>
                    <Image src={imgSrc} alt="NFT Media" style={{ maxWidth: '100px' }} />
                  </Grid>
                </Grid>
              </CardContent>
            </>
          )}
        </SquareImage>
      </CardContent>

      <CardContent>
        <Typography variant="h6" component="div" align="center">
          User Wallet: <br />
          </Typography>
          <Typography variant="h5" component="div" align="center">
          {formatAddress(address)}
        </Typography>
        <Grid container justifyContent="center" spacing={1}>
          {contractRead.data && !readIsLoading ? (
            (contractRead.data as number[]).map((tokenID) => (
              <Button key={tokenID} onClick={() => setCurrentNFT(tokenID.toString())}>
                Token ID#{tokenID.toString()}
              </Button>
            ))
          ) : (
            <Typography>Loading token IDs...</Typography>
          )}
        </Grid>
      </CardContent>

      <CardContent>
        <Typography variant="h6" component="div" align="center">
            Facial Expression
        </Typography>
        <Grid container alignItems="center" justifyContent="center" spacing={1}>
          <Grid item>
            <Button
              variant={selectedFaceState === '0' ? 'contained' : 'outlined'}
              onClick={() => handleSwitchChange('0')}
            >
              Joking
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={selectedFaceState === '1' ? 'contained' : 'outlined'}
              onClick={() => handleSwitchChange('1')}
            >
              Scary
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={selectedFaceState === '2' ? 'contained' : 'outlined'}
              onClick={() => handleSwitchChange('2')}
            >
              Serious
            </Button>
          </Grid>
        </Grid>
      </CardContent>
      <CardContent>
        <Button disabled={!write} onClick={handleSubmit}>
          CHANGE EXPRESSION
        </Button>
      </CardContent>
    </StyledCard>
  );
};

export default NFTComponent;
