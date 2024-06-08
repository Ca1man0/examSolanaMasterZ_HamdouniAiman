// In this script we will have the possibility to give on my personal wallet some Solana
import { 
    Keypair, 
    Connection, 
    LAMPORTS_PER_SOL 
} from "@solana/web3.js";

// Import my key from the wallet json
import wallet from "./walletAiman.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// We have to create a connection to the blockchain dev net
const connection = new Connection("https://api.devnet.solana.com", "finalized");


// This function ables me the possibility to receive 1 SOL
(async () => {
    try {
        const airdropSignature = await connection.requestAirdrop(
            keypair.publicKey,      
            1 * LAMPORTS_PER_SOL    
        );
        console.log(`Yes, you can see the transition: https://explorer.solana.com/tx/${airdropSignature}?cluster=devnet`);
    } catch (error) {
        console.error(error);
    }
})();
