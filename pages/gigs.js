import { useAddress, useSDK } from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";
import React, { useState, useEffect } from 'react';
import { MediaRenderer } from "@thirdweb-dev/react";

export default function getOwned(){
const address=useAddress()
const sdk = new ThirdwebSDK("mumbai");
const [data, setData] = useState([])
const contract = "0x9650CF55b186ECfcf6cC55B8769AE20ce292ffb8"
const getMint = () => {

    (async()=> {
        try { 
const contract = await sdk.getContract("0x9650CF55b186ECfcf6cC55B8769AE20ce292ffb8");
const nfts = await contract.erc721.getAll();
console.log(nfts)
setData(nfts)

} catch (err) {
    console.log(err)
    }})()


}

useEffect(()=> {
    getMint()
         
          
    }, [])


return(



    <div>
<>

{data.length && data.map(item =>{

return<>
<form style={{width:500 }}>
<MediaRenderer style={{width:200}} src={item.metadata.image}/>
<h1 style={{fontSize:20}}>{item.metadata.name}</h1>
<h1 style={{fontSize:10}}>owned by {item.owner} </h1>
<h1 style={{fontSize:10}}>contract address {contract} </h1></form>
</>

})}





</>












    </div>
)
}
