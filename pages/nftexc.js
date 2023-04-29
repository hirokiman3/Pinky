
import styles from "../styles/Theme.module.css";
import { useState,useEffect } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import {
    useSDK,
    useContract,
    useAddress,
    useContractWrite,
    useSigner,
    ConnectWallet,
    
} from "@thirdweb-dev/react";
import Moralis from 'moralis';


export default function nftExc(){
const [status, setStatus] = useState('');

const walletaddress=useAddress()
const signer=useSigner()
const [nftmetadata, setnftmetadata]=useState({})
let [nftres, setnftres]=useState({})

const [formData, setFormData] = useState({});
const [savecontractAddress, setContractAddress] = useState("");
const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_senderTokenContract",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_senderTokenId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_recipient",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_recipientTokenContract",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_recipientTokenId",
				"type": "uint256"
			}
		],
		"name": "exchangeTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "onERC721Received",
		"outputs": [
			{
				"internalType": "bytes4",
				"name": "",
				"type": "bytes4"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "tokenContract",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "senderTokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "recipientTokenId",
				"type": "uint256"
			}
		],
		"name": "TokenExchanged",
		"type": "event"
	}
]
let sdk = new ThirdwebSDK("mumbai");
if(walletaddress){

    sdk = ThirdwebSDK.fromSigner(signer);
   }
   async function startMoralis(){

    try {
        await Moralis.start({
          apiKey: "HwogQehVbqC80vMHm55pJBR6wWL0trILv1cJxLijTekWhyBvMoUydUhRKSYAS2sy"
        });
      
        const response = await Moralis.EvmApi.nft.getNFTMetadata({
          "chain": "0x13881",
          "format": "decimal",
          "mediaItems": true,
          "normalizeMetadata": true,
          "address": formData.nftcontract,
          "tokenId": formData.tokenID
        });
      console.log(response?.raw)

       setnftres(response.raw)

    //   if (nftres=undefined){

    //     setnftres(response.raw)

    //   }

      } catch (e) {
        console.log(e)
      }
   }

async function List(){

    startMoralis()

//  console.log(nftres.normalized_metadata.image)
    
    // const nftcontract = await sdk.getContract(
    //     formData.nftcontract // The address of your smart contract
    //   );
    //   console.log(nftcontract)

    //   const data = await nftcontract.call("approve",
      
    //   ["0x515efdB77f45D0fAF0BB1d2aDA2b15AEA5312Dc0",formData.tokenID]
      
      
    //   );
      console.log(nftres, 
        "nftres")

      console.log(nftres.normalized_metadata)





        // const mainNftData={

        //     address:walletaddress,
          
           
        //     image: nftres.normalized_metadata.image
           



        // }
        
        
        try {
          // Send form data to the API endpoint
          await axios.post('/api/lazymintapi', mainNftData);
          setStatus('Minted');
          } catch (err) {
          setStatus('Error: ' + err);
          }





}

const handleSubmit = async (event) => {
    event.preventDefault();
    List();
   
    
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








return (
    <form onSubmit={handleSubmit} >
        <div className={styles.container}>

      <label >


{/*        
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
        onChange={handleChange} /> */}
      </label>


      
      <br />
      {/* <label>
       
        <input type="text" name="nftContractAddress" placeholder="david property/ being given static atm" className={styles.textInput} style={{ minWidth: "320px" }} onChange={handleChange} />
      </label>
      <label>
       
        <input type="text" name="royalties" placeholder="royalties individual token 500:5%" className={styles.textInput} style={{ minWidth: "320px" }} onChange={handleChange} />
      </label> */}
      <label>
       
        <input type="text" name="nftcontract" value={formData.nftcontract} placeholder="ContractAddress" className={styles.textInput} style={{ minWidth: "320px"}} onChange={handleChange} />
      </label>
      <label>
       
       <input type="text" name="tokenID" value={formData.tokenID} placeholder="tokenID" className={styles.textInput} style={{ minWidth: "320px"}} onChange={handleChange} />
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
          placeholder="transaction"
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