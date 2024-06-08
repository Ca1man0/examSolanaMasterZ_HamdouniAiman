// Initialize the mint of our token
import { 
    Keypair, 
    Connection
} from "@solana/web3.js";

import {createMint} from "@solana/spl-token";

import wallet from "./walletAiman.json";

// We will pass our private key as an argument
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Create a connection to our blockchain
const connection = new Connection("https://api.devnet.solana.com", "finalized");

(async () => {

        const mint = await createMint(
            connection,
            keypair, // This is our wallet
            keypair.publicKey, //Mint authority is the same of our wallet
            null, // We don't need a freez authority
            6, // We decide the number of decimal
        );
        console.log("The mint address is:", mint.toBase58());            

})()
