import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey,
    clusterApiUrl,
    LAMPORTS_PER_SOL,
  } from "@solana/web3.js";
  import "dotenv/config";
  import { getKeypairFromEnvironment } from "@solana-developers/helpers";
   
  const suppliedToPubkey = process.argv[2] || "5823RjBTLqgrfXieGWWejM9ACvtCQCte8ju7sshHzfGY";
   
  if (!suppliedToPubkey) {
    console.log(`Please provide a public key to send to`);
    process.exit(1);
  }
   
  const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");
  console.log("sender" ,senderKeypair.publicKey)
   
  console.log(`suppliedToPubkey: ${suppliedToPubkey}`);
   
  const toPubkey = new PublicKey(suppliedToPubkey);
   
  const connection = new Connection(clusterApiUrl("devnet"));

//   const connection = new Connection("https://api.devnet.solana.com", "confirmed");
   
  console.log(
    `✅ Loaded our own keypair, the destination public key, and connected to Solana`,
  );

  const transaction = new Transaction();
   
  const LAMPORTS_TO_SEND = 1 * LAMPORTS_PER_SOL;
   
  const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey,
    lamports: LAMPORTS_TO_SEND,
  });
   
  transaction.add(sendSolInstruction);
   
  const sign = async () => {
    const signature = await sendAndConfirmTransaction(connection, transaction, [
        senderKeypair,
      ]);
      console.log(`Transaction signature is ${signature}!`);
  }
 
  console.log(
    `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `,
  );
  sign()