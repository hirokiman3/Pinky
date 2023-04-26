import React, { useContext, useState } from "react";
import {
      useSDK,
      useContract,
      useAddress,
      useContractWrite,
      useSigner,
      
} from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

import { ChainId, NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { useRef } from "react";
import styles from "../styles/Theme.module.css";
import { v4 as uuidv4 } from 'uuid';
import { useNFT } from "@thirdweb-dev/react";
import axios from 'axios';
import { Signer } from "ethers";

const FormExample = () => {
  const walletaddress=useAddress()
  
  const asdk = ThirdwebSDK.fromPrivateKey("561bfc90be6ca87e5e5e932fbf9b22fc482bfd35649d23e972a554e6e18ef407", "mumbai");
  const { contract: nftCollection } = useContract(
    "0x54c0e3bD955Afe6091F9e1403780288B7c61575d",
    "nft-collection"
  );
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
  const signer=useSigner()
  let sdk = new ThirdwebSDK("mumbai");
  const [file, setFile] = useState();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({});
  const [savecontractAddress, setContractAddress] = useState("");
  

  if(walletaddress){

    sdk = ThirdwebSDK.fromSigner(signer);
 
   }
 


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

  async function DeployContract(){
     const img = await sdk.storage.upload(file);
  const uuid = uuidv4()
  // const metadata = {  
  //   name: formData.nftName,
  //   description: formData.nftDescription,
  //   image: img,
  //   fee_recipient: formData.royaltyfeeaddress,
  //   seller_fee_basis_points: parseInt(formData.royalties),
  //   "attributes": [
  //     {
  //       "trait_type": "type",
  //       "value": "Main-NFT"
  //     },{
  //       "trait_type": "ID",
  //       "value": uuid
  //     },
  //     {
  //       "trait_type": "Price",
  //       "value": formData.price
  //     },
  //   ]
    

  //   }

    const nftContract = await asdk.getContract(
      "0x54c0e3bD955Afe6091F9e1403780288B7c61575d",
      "nft-collection"
    );

    const address = await nftContract.signature.generate({
      metadata: {
        name: formData.nftName,
        description: formData.nftDescription,
        image: img,
       
      "attributes": [
        {
          "trait_type": "Gig",
          "value": "Reciprocoin"
        },{
          "trait_type": "ID",
          "value": uuid
        },
        {
          "trait_type": "Price",
          "value": formData.price
        }
      
      ]
      },
      to: walletaddress,
      mintStartTime: new Date(0),
    });

    
    const nft = await nftCollection?.signature.mint(address);

    const mintedTokenId = nft.id.toNumber();


    console.log(mintedTokenId);
    setContractAddress(mintedTokenId)
    try{
 
      const marketplacecontract = await sdk.getContract(
        "0x9650CF55b186ECfcf6cC55B8769AE20ce292ffb8", // The address of your smart contract
        abi,
       
      );
      const data = await marketplacecontract.call("createListing",
      
      [mintedTokenId,formData.price]
      
      
      );
        console.log(data)
      }
      catch(err){
    
      console.log(err)
    
      } 

  
     // setContractAddress(address.id);
    // const value=address.id
    // console.log(parseInt(value._hex))
    // const mainNftData = {
    //   address:walletaddress,
    //   mainNftId: uuid,
    //   name: formData.nftName,
    //   image: img,
    //   tokenID: mintedTokenId,
    //   collectionAddress: text_contractaddress
    // }
    // console.table(mainNftData, address.id, address)
    // await axios.post('/api/main-nfts', mainNftData);



}
const uploadFile = () => {
  if (fileInputRef?.current) {
    fileInputRef.current.click();

    fileInputRef.current.onchange = () => {
      if (fileInputRef?.current?.files?.length) {
        const file = fileInputRef.current.files[0];
        setFile(file);
      }
    };
  }
}


  return (
    <form onSubmit={handleSubmit} >
        <div className={styles.container}>

      <label >
      {file ? (
            <img
              src={URL.createObjectURL(file)}
              style={{ cursor: "pointer", maxHeight: 250, borderRadius: 8 }}
              onClick={() => setFile(undefined)}
            />
          ) : (
            <div
              className={styles.imageInput}
              onClick={uploadFile}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                setFile(e.dataTransfer.files[0]);
              }}
            >
              Drag and drop an image here to upload it!
            </div>
          )}
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg"
            id="profile-picture-input"
            ref={fileInputRef}
            style={{ display: "none" }}
          />
          <br/>

       
        <input type="text" name="nftName" placeholder="Gig Title"
          required
         className={styles.textInput}             
         style={{ minWidth: "320px",marginTop: 50}}
        onChange={handleChange} />
      </label>
      <label>
      <input type="text" name="price" placeholder="Price in Reciprocoin"
          required
         className={styles.textInput}             
         style={{ minWidth: "320px",marginTop: 10}}
        onChange={handleChange} />
      </label>


      
      <br />
      {/* <label>
       
        <input type="text" name="nftContractAddress" placeholder="david property/ being given static atm" className={styles.textInput} style={{ minWidth: "320px" }} onChange={handleChange} />
      </label>
      <label>
       
        <input type="text" name="royalties" placeholder="royalties individual token 500:5%" className={styles.textInput} style={{ minWidth: "320px" }} onChange={handleChange} />
      </label> */}
      <label>
       
        <input type="text" name="nftDescription" placeholder="Gig Description" className={styles.textInput} style={{ minWidth: "520px", minHeight:"200px" }} onChange={handleChange} />
      </label>
         {/* <label>
       
        <input type="text" name="royaltyfeeaddress" placeholder="royalty fee recipient" className={styles.textInput} style={{ minWidth: "320px" }} onChange={handleChange} />
      </label>
      <label> */}
       {/* Properties: 
       <input type="text" name="traittype" placeholder="traittype" className={styles.textInput} style={{ minWidth: "320px" }} onChange={handleChange} />
     </label>
     <label>
       
       <input type="text" name="traitvalue" placeholder="traitvalue" className={styles.textInput} style={{ minWidth: "320px" }} onChange={handleChange} />
     </label> */}
    
     <br />
     <label>
        <input
          name="tokenID"
          type="text"
          value={savecontractAddress}
          readOnly
          className={styles.textInput}
          placeholder="Token ID Generated"
          style={{minWidth:320}}
        />

      </label>
      <br/>
      <button className={styles.mainButton}
      type="submit"
      
      >Submit</button>
     
      </div>
        
    </form>

  );
}

export default FormExample;