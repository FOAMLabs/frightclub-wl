import React, { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import Image from 'next/image';
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
  maxWidth: 440, // Adjusted the card width
  margin: "0 auto",
  padding: 20,
  textAlign: "center",
  borderRadius: 25,
  marginTop: "130px", // Adjusted the top margin
  backgroundColor: "rgba(255, 255, 255, 0.4)",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
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
        address: '0x46b77a64dCeE752dd4F9e5b26A5273B2e182e57A',
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
    address: '0x46b77a64dCeE752dd4F9e5b26A5273B2e182e57A',
    abi: [{"inputs":[{"internalType":"string","name":"_tokenName","type":"string"},{"internalType":"string","name":"_tokenSymbol","type":"string"},{"internalType":"uint256","name":"_cost","type":"uint256"},{"internalType":"uint256","name":"_maxSupply","type":"uint256"},{"internalType":"uint256","name":"_maxMintAmountPerTx","type":"uint256"},{"internalType":"string","name":"_hiddenMetadataUri","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ApprovalCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"ApprovalQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"ApprovalToCurrentOwner","type":"error"},{"inputs":[],"name":"ApproveToCaller","type":"error"},{"inputs":[],"name":"BalanceQueryForZeroAddress","type":"error"},{"inputs":[],"name":"InvalidQueryRange","type":"error"},{"inputs":[],"name":"MintToZeroAddress","type":"error"},{"inputs":[],"name":"MintZeroQuantity","type":"error"},{"inputs":[],"name":"OwnerQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"TransferCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"TransferFromIncorrectOwner","type":"error"},{"inputs":[],"name":"TransferToNonERC721ReceiverImplementer","type":"error"},{"inputs":[],"name":"TransferToZeroAddress","type":"error"},{"inputs":[],"name":"URIQueryForNonexistentToken","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"isPaused","type":"bool"}],"name":"ContractPaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"enum FrightClubV1.FaceState","name":"newState","type":"uint8"}],"name":"FaceStateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"newUri","type":"string"}],"name":"HiddenMetadataUriUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newMaxMintAmount","type":"uint256"}],"name":"MaxMintAmountPerTxUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newMaxSupply","type":"uint256"}],"name":"MaxSupplyUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newCost","type":"uint256"}],"name":"MintingCostUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"isRevealed","type":"bool"}],"name":"Revealed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"enum FrightClubV1.FaceState","name":"state","type":"uint8"},{"indexed":false,"internalType":"string","name":"newBaseURI","type":"string"}],"name":"StateBaseURIUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"newSuffix","type":"string"}],"name":"UriSuffixUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"isEnabled","type":"bool"}],"name":"WhitelistMintEnabledUpdated","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentState","outputs":[{"internalType":"enum FrightClubV1.FaceState","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"explicitOwnershipOf","outputs":[{"components":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint64","name":"startTimestamp","type":"uint64"},{"internalType":"bool","name":"burned","type":"bool"}],"internalType":"struct IERC721A.TokenOwnership","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"explicitOwnershipsOf","outputs":[{"components":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint64","name":"startTimestamp","type":"uint64"},{"internalType":"bool","name":"burned","type":"bool"}],"internalType":"struct IERC721A.TokenOwnership[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"hiddenMetadataUri","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxMintAmountPerTx","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"merkleRoot","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_mintAmount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_mintAmount","type":"uint256"},{"internalType":"address","name":"_receiver","type":"address"}],"name":"mintForAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"revealed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_cost","type":"uint256"}],"name":"setCost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"enum FrightClubV1.FaceState","name":"_state","type":"uint8"}],"name":"setFaceState","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_hiddenMetadataUri","type":"string"}],"name":"setHiddenMetadataUri","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxMintAmountPerTx","type":"uint256"}],"name":"setMaxMintAmountPerTx","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_merkleRoot","type":"bytes32"}],"name":"setMerkleRoot","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_state","type":"bool"}],"name":"setPaused","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_state","type":"bool"}],"name":"setRevealed","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"enum FrightClubV1.FaceState","name":"_state","type":"uint8"},{"internalType":"string","name":"_baseURI","type":"string"}],"name":"setStateBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_uriSuffix","type":"string"}],"name":"setUriSuffix","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_state","type":"bool"}],"name":"setWhitelistMintEnabled","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"enum FrightClubV1.FaceState","name":"","type":"uint8"}],"name":"stateBaseURIs","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tokenFaceState","outputs":[{"internalType":"enum FrightClubV1.FaceState","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"tokensOfOwner","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"stop","type":"uint256"}],"name":"tokensOfOwnerIn","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"uriSuffix","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"whitelistClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_mintAmount","type":"uint256"},{"internalType":"bytes32[]","name":"_merkleProof","type":"bytes32[]"}],"name":"whitelistMint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"whitelistMintEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}],
    functionName: 'tokensOfOwner',
    args: [address],
  });

  const { data: userTokenIDs, isLoading: readIsLoading } = contractRead;

  const handleSwitchChange = (selectedFaceState: string) => {
    setSelectedFaceState(selectedFaceState); // Update the selected face state
  };

  const { config: writeConfig } = usePrepareContractWrite({
    address: '0x46b77a64dCeE752dd4F9e5b26A5273B2e182e57A',
    abi: [{"inputs":[{"internalType":"string","name":"_tokenName","type":"string"},{"internalType":"string","name":"_tokenSymbol","type":"string"},{"internalType":"uint256","name":"_cost","type":"uint256"},{"internalType":"uint256","name":"_maxSupply","type":"uint256"},{"internalType":"uint256","name":"_maxMintAmountPerTx","type":"uint256"},{"internalType":"string","name":"_hiddenMetadataUri","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ApprovalCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"ApprovalQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"ApprovalToCurrentOwner","type":"error"},{"inputs":[],"name":"ApproveToCaller","type":"error"},{"inputs":[],"name":"BalanceQueryForZeroAddress","type":"error"},{"inputs":[],"name":"InvalidQueryRange","type":"error"},{"inputs":[],"name":"MintToZeroAddress","type":"error"},{"inputs":[],"name":"MintZeroQuantity","type":"error"},{"inputs":[],"name":"OwnerQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"TransferCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"TransferFromIncorrectOwner","type":"error"},{"inputs":[],"name":"TransferToNonERC721ReceiverImplementer","type":"error"},{"inputs":[],"name":"TransferToZeroAddress","type":"error"},{"inputs":[],"name":"URIQueryForNonexistentToken","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"isPaused","type":"bool"}],"name":"ContractPaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"enum FrightClubV1.FaceState","name":"newState","type":"uint8"}],"name":"FaceStateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"newUri","type":"string"}],"name":"HiddenMetadataUriUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newMaxMintAmount","type":"uint256"}],"name":"MaxMintAmountPerTxUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newMaxSupply","type":"uint256"}],"name":"MaxSupplyUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newCost","type":"uint256"}],"name":"MintingCostUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"isRevealed","type":"bool"}],"name":"Revealed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"enum FrightClubV1.FaceState","name":"state","type":"uint8"},{"indexed":false,"internalType":"string","name":"newBaseURI","type":"string"}],"name":"StateBaseURIUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"newSuffix","type":"string"}],"name":"UriSuffixUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"isEnabled","type":"bool"}],"name":"WhitelistMintEnabledUpdated","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentState","outputs":[{"internalType":"enum FrightClubV1.FaceState","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"explicitOwnershipOf","outputs":[{"components":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint64","name":"startTimestamp","type":"uint64"},{"internalType":"bool","name":"burned","type":"bool"}],"internalType":"struct IERC721A.TokenOwnership","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"explicitOwnershipsOf","outputs":[{"components":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint64","name":"startTimestamp","type":"uint64"},{"internalType":"bool","name":"burned","type":"bool"}],"internalType":"struct IERC721A.TokenOwnership[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"hiddenMetadataUri","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxMintAmountPerTx","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"merkleRoot","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_mintAmount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_mintAmount","type":"uint256"},{"internalType":"address","name":"_receiver","type":"address"}],"name":"mintForAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"revealed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_cost","type":"uint256"}],"name":"setCost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"enum FrightClubV1.FaceState","name":"_state","type":"uint8"}],"name":"setFaceState","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_hiddenMetadataUri","type":"string"}],"name":"setHiddenMetadataUri","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxMintAmountPerTx","type":"uint256"}],"name":"setMaxMintAmountPerTx","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_merkleRoot","type":"bytes32"}],"name":"setMerkleRoot","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_state","type":"bool"}],"name":"setPaused","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_state","type":"bool"}],"name":"setRevealed","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"enum FrightClubV1.FaceState","name":"_state","type":"uint8"},{"internalType":"string","name":"_baseURI","type":"string"}],"name":"setStateBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_uriSuffix","type":"string"}],"name":"setUriSuffix","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_state","type":"bool"}],"name":"setWhitelistMintEnabled","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"enum FrightClubV1.FaceState","name":"","type":"uint8"}],"name":"stateBaseURIs","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tokenFaceState","outputs":[{"internalType":"enum FrightClubV1.FaceState","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"tokensOfOwner","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"stop","type":"uint256"}],"name":"tokensOfOwnerIn","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"uriSuffix","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"whitelistClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_mintAmount","type":"uint256"},{"internalType":"bytes32[]","name":"_merkleProof","type":"bytes32[]"}],"name":"whitelistMint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"whitelistMintEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}],
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
