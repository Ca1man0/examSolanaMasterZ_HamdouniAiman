// Now we will transfer our token
import { 
    Keypair, 
    Connection,
    PublicKey,
    LAMPORTS_PER_SOL
} from "@solana/web3.js";

import {
    getOrCreateAssociatedTokenAccount,
    transfer,
} from "@solana/spl-token";

import wallet from "./walletAiman.json";

// Let's pass our private key
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Let's connect to dev chain
const connection = new Connection("https://api.devnet.solana.com", "finalized");

//Put the mint address here
const mint = new PublicKey("FFdSz1s2NwfUHen3wCfPKHpcc6SvZk7yJqDWvLEekTgz");

//Put the associated token account here
const fromAta = new PublicKey("C5jow75ZR4bikAoKHjmcX1E71P2rp8eNhngK34axN66w");

//Generate a keypair for the transfer
const to = Keypair.generate();
console.log("To: ", to.publicKey.toBase58());

(async () => {
        const tokenAccount = await getOrCreateAssociatedTokenAccount (
            connection,
            keypair, // Who pay for this transfer
            mint,
            to.publicKey //Who receive the token
        );
                  
        const toAta = tokenAccount.address; //associated token account = ata | qui chiedo address
        console.log("Associated token account: ", toAta.toBase58());
        const amount = 5*LAMPORTS_PER_SOL; //Now I want to pass 5k token
        await transfer(
            connection,
            keypair, 
            fromAta,
            toAta,
            keypair, // this is the signer
            amount
        );
        console.log("Transfer token", amount, "from this address", fromAta.toBase58(), "to this address ", toAta.toBase58());
})()
