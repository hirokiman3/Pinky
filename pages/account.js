import React, { useContext, useState,useEffect } from "react";
import {
      useSDK,
      useContract,
      useAddress,
      useContractWrite,
      
} from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { MediaRenderer } from "@thirdweb-dev/react";
import { ChainId, NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { useRef } from "react";
import styles from "../styles/Theme.module.css";
import { v4 as uuidv4 } from 'uuid';
import { useNFT } from "@thirdweb-dev/react";
import axios from 'axios';

const FormExample = () => {
const [data, setData] = useState([])
  const walletaddress=useAddress()
  const contract =  "0x54c0e3bD955Afe6091F9e1403780288B7c61575d"
  const asdk = ThirdwebSDK.fromPrivateKey("561bfc90be6ca87e5e5e932fbf9b22fc482bfd35649d23e972a554e6e18ef407", "mumbai");
  const { contract: nftCollection } = useContract(
    "0x54c0e3bD955Afe6091F9e1403780288B7c61575d",
    "nft-collection"
  );
  const sdk = new ThirdwebSDK("mumbai");

  const abi=[
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "buy",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "cancelListing",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "createListing",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_nftAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_paymentTokenAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_feePercentage",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        }
      ],
      "name": "ListingCancelled",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        }
      ],
      "name": "ListingCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "releasePayment",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "SaleCompleted",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_feePercentage",
          "type": "uint256"
        }
      ],
      "name": "updateFeePercentage",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "FEE_DENOMINATOR",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "feePercentage",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "nft",
      "outputs": [
        {
          "internalType": "contract IERC721",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paymentToken",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "tokenIdToListing",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "active",
          "type": "bool"
        },
        {
          "internalType": "address",
          "name": "seller",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  async function getNFTs(){
 try{         

const contract = await sdk.getContract("0x54c0e3bD955Afe6091F9e1403780288B7c61575d");
const nfts = await contract.erc721.getOwned(walletaddress);
console.log(nfts)
setData(nfts)

} catch (err) {
    
 
}
  }
getNFTs()

  const handleChange = (event) => {
    console.log(event.target.name, event.target.value)
    
    setFormData({

      ...formData,
      [event.target.name]: event.target.value
      
    }
    )
    ;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    DeployContract();

    
  }
async function createListing(){







}

  return(



    <div>
<>

{data.length && data.map(item =>{

return<>
<form style={{width:500 }} >
<MediaRenderer style={{width:800, minHeight:700, maxHeight:900}} src={item.metadata.image} />
<h1 style={{fontSize:30, marginLeft:900, marginTop:-400, width:500}}>Name: {item.metadata.name}</h1>
<h1 style={{fontSize:30, marginLeft:900, width:500}}>Description {item.metadata.description}</h1>
<h1 style={{fontSize:30, marginLeft:900, width:500}}>Token ID: {item.metadata.id}</h1>
<h1 style={{fontSize:15, marginLeft:900, width:500}}>contract: {contract}</h1>

{/* <button className={styles.mainButton} onClick={createListing}>List</button> */}
</form>
</>

})}





</>



    </div>
)
}

export default FormExample;