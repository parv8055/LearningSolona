import "dotenv/config";

import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js";


// const suppliedPublicKey = process.argv[2];
// if (!suppliedPublicKey) {
//   throw new Error("Provide a public key to check the balance of!");
// }

//dev is for development
const connection = new Connection(clusterApiUrl("devnet"));

//this is for mainnet
// const connection = new Connection("https://api.devnet.solana.com", "confirmed");
// const publicKey = new PublicKey("opNS8ENpEMWdXcJUgJCsJTDp7arTXayoBEeBUg6UezP");

  const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");
  const publicKey = senderKeypair.publicKey;

const getBalance = async () => {
    const balance = await connection.getBalance(publicKey);
    const balanceInSol = balance / LAMPORTS_PER_SOL;
    console.log(
        `💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSol}!`,
    );
};

getBalance();

// const keypair = Keypair.generate();

// console.log(`The public key is: `, keypair.publicKey.toBase58());
// console.log(`The secret key is: `, keypair.secretKey);
// console.log(`✅ Finished!`);