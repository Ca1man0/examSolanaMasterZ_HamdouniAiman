
//This script can enable the creation of keygen

import { Keypair } from "@solana/web3.js";

const keypair = Keypair.generate();

console.log("Public key:", keypair.publicKey.toBase58());
console.log("Private key:", keypair.secretKey.toString());

//We are going to print our wallet key

console.log(`Now you generate your wallet: ${keypair.publicKey.toBase58()} \n\n We have to save this key in my personal wallet: [${keypair.secretKey}]`)
