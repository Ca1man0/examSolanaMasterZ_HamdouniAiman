//Now in this script we have to mint the token
import { 
    Keypair, 
    Connection,
    PublicKey,
    LAMPORTS_PER_SOL
} from "@solana/web3.js";

//We generate token account for the minting
import {
    mintTo,
    getOrCreateAssociatedTokenAccount
} from "@solana/spl-token";

import wallet from "./walletAiman.json";

//Let's pass our private key
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Let's connect to dev chain
const connection = new Connection("https://api.devnet.solana.com", "finalized");

//The mint address generated from spl_init.ts
const mint = new PublicKey("FFdSz1s2NwfUHen3wCfPKHpcc6SvZk7yJqDWvLEekTgz");

//Function to mint our token
(async () => {
        const tokenAccount = await getOrCreateAssociatedTokenAccount (
            connection,
            keypair,
            mint,
            keypair.publicKey
        )
        console.log("Mint address is this:", mint.toBase58());            
        const ata = tokenAccount.address; //We need the address to mint this token
        console.log("Associated token account generated: ", ata.toBase58());
        const amount = 10*LAMPORTS_PER_SOL; // Now we will mint 1 token
        await mintTo(
            connection,
            keypair, // Who pay
            mint,
            ata,
            keypair.publicKey, // the authority is our wallet
            amount
        );
        console.log("Minted", amount, "to", ata.toBase58());
})()
