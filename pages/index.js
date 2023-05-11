import React, { useContext, useState } from "react";
import {
      useSDK,
      useContract,
      useAddress,
      useContractWrite,
      useSigner,
      ConnectWallet,
      
} from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

import { ChainId, NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { useRef,useEffect } from "react";
import styles from "../styles/Theme.module.css";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';








const FormExample = () => {
  const {contract:marketplacecontract} = useContract("0x05Ac9CE9CCfEb31776E6FBc41acB163aa9676270", "marketplace")
  const [marketplaceformData, setmarketplaceFormData] = useState({
    assetContractAddress: '',
    tokenId: '',
    startTimestamp: new Date(),
    listingDurationInSeconds: '999999999',
    quantity: '1',
    currencyContractAddress: '',
    buyoutPricePerToken: ''
  });
  const [listingid,setlistingid] = useState('')
  const [selectedValue, setSelectedValue] = useState("task");

  const walletaddress=useAddress()

  const [connectedaddress,setconnectedaddress] = useState('')
  const [savecontractAddress, setContractAddress] = useState("");
  const [imagedb, setImagedb] = useState('')

  const [status, setStatus] = useState('');
  
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
  

  if(walletaddress&&signer){

    sdk = ThirdwebSDK.fromSigner(signer);
   }
 
   const handleDropdownChange = (event) => {
    setSelectedValue(event.target.value);
  };

  //nfts as task 

  const handleChange = (event) => {
    console.log(event.target.name, event.target.value)
    

    setFormData({

      ...formData,
      [event.target.name]: event.target.value
      
    }
    )
    ;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    DeployContract();

  }









  //marketplace starts from here 









  const handleChangemarketplace = (event) => {
    setmarketplaceFormData({
      ...marketplaceformData,
      [event.target.name]: event.target.value,
    });
  };

  const marketplacehandleSubmit = async (event) => {
    console.log(marketplaceformData)
    event.preventDefault();
    try{
    const tx = await marketplacecontract.direct.createListing(marketplaceformData);
    const listingId = tx.id;
    console.log(`Listing created successfully with ID: ${listingId}`);
    setlistingid(listingId)
    } catch(error){
    
      console.log(error);
    }
    const marketplaceListing={
        tokenID:listingid,
        listingType: selectedValue
    }

    try {
      // Send form data to the API endpoint
      await axios.post('/api/lazymintapi', marketplaceListing);
      setStatus('Minted');
      } catch (err) {
      setStatus('Error: ' + err);
      }




  };


  


  async function DeployContract(event){
     const img = await sdk.storage.upload(file);
     setImagedb(img);
    

     setconnectedaddress(walletaddress)
    const uuid = uuidv4()
    const metadata = {  
    name: formData.nftName,
    description: formData.nftDescription,
    image: img,
    fee_recipient: formData.royaltyfeeaddress,
    seller_fee_basis_points: parseInt(formData.royalties),
    "attributes": [
      {
        "trait_type": "type",
        "value": "Main-NFT"
      },{
        "trait_type": "ID",
        "value": uuid
      },
      {
        "trait_type": "Price",
        "value": formData.price
      },
    ]
    

    }

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
      const taskListing = {
        address:walletaddress,
        name: formData.name,
        description:formData.description,
        image: img,
        price: formData.price,
        collectionAddress: "0x54c0e3bD955Afe6091F9e1403780288B7c61575d",
        tokenID: mintedTokenId,
        listingType: selectedValue
      }
      try {
        // Send form data to the API endpoint
        await axios.post('/api/lazymintapi', taskListing);
        setStatus('Minted');
        } catch (err) {
        setStatus('Error: ' + err);
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
    <>
    <select
      name="dropdown"
      className={styles.dropdown}
      style={{ minWidth: 200, marginTop:100}}
      value={selectedValue}
      onChange={handleDropdownChange}
    >
      <option value="task">Task</option>
      <option value="marketplace">ERC721 - ERC20</option>
      <option value="nftexc">ERC721 - ERC721</option>
    </select>


{/* 
this is for task */}




    {selectedValue === "task" && (
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

       
        <input type="text" name="name" placeholder="Gig Title" value={formData.name}
          required
         className={styles.textInput}             
         style={{ minWidth: "320px",marginTop: 50}}
        onChange={handleChange} />
      </label>
      <label>
      <input type="text" name="price" placeholder="Price in Reciprocoin"
          required
          value={formData.price}
         className={styles.textInput}             
         style={{ minWidth: "320px",marginTop: 10}}
        onChange={handleChange} />
      </label>
      
      <br />
      
      <label>
       
        <input type="text" name="description" value={formData.description} placeholder="Gig Description" className={styles.textInput} style={{ minWidth: "520px", minHeight:"200px" }} onChange={handleChange} />
      </label>
      
    
     <br />
     <label>
        <input
          name="tokenID"
          type="text"
          value={savecontractAddress}
          readOnly
          className={styles.textInput}
          style={{minWidth:320}}
          placeholder="Token ID Generated"
         
        />

      </label>
     
<br/>
      <button className={styles.mainButton}
      type="submit"
      
      >Submit</button>
     
      </div>
        
    </form>
    )}


{selectedValue === "marketplace" && (

<div className={styles.container}>
<form onSubmit={marketplacehandleSubmit}>
  <label>
    
    <input
      type="text"
      name="assetContractAddress"
      className={styles.textInput}
      style={{minWidth:320}}
      placeholder="Contract Address"
      value={marketplaceformData.assetContractAddress}
      onChange={handleChangemarketplace}
    />
  </label>
  <br />
  <label>
    
    <input
      type="text"
      name="tokenId"
      className={styles.textInput}
      style={{minWidth:320}}
      placeholder="TokenID"
      value={marketplaceformData.tokenId}
      onChange={handleChangemarketplace}
    />
  </label>
  <br />



  <label>

    <input
      type="text"
      name="currencyContractAddress"
      className={styles.textInput}
      style={{minWidth:320}}
      placeholder="currencyContractAddress"
      value={marketplaceformData.currencyContractAddress}
      onChange={handleChangemarketplace}
    />
  </label>
  <br />
  <label>
    <input
      type="text"
      name="buyoutPricePerToken"
      className={styles.textInput}
      style={{minWidth:320}}
      placeholder="buyoutPricePerToken"
      value={marketplaceformData.buyoutPricePerToken}
      onChange={handleChangemarketplace}
    />
  </label>
  <br/>

  <br />
  <button type="submit" className={styles.mainButton}>Create Listing</button>
</form>
</div>








)}


  </>
  );
}

export default FormExample;