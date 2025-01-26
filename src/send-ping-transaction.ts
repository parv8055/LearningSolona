import "dotenv/config";
import {
    getKeypairFromEnvironment,
    airdropIfRequired,
} from "@solana-developers/helpers";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, Transaction, TransactionInstruction } from "@solana/web3.js";

const payer = getKeypairFromEnvironment("SECRET_KEY");
const connection = new Connection(clusterApiUrl("devnet"));

// const newbal = async () => {
//     const newBalance = await airdropIfRequired(
//         connection,
//         payer.publicKey,
//         2 * LAMPORTS_PER_SOL,
//         0.5 * LAMPORTS_PER_SOL,
//     );
// }

// newbal()

const PING_PROGRAM_ADDRESS = "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa";
const PING_PROGRAM_DATA_ADDRESS = "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod";

const transaction = new Transaction();
const programId = new PublicKey(PING_PROGRAM_ADDRESS);
const pingProgramDataId = new PublicKey(PING_PROGRAM_DATA_ADDRESS);

const instruction = new TransactionInstruction({
    keys: [
        {
            pubkey: pingProgramDataId,
            isSigner: false,
            isWritable: true,
        },
    ],
    programId,
});

transaction.add(instruction);
const sign = async () => {
    const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [payer],
    );

    console.log(`✅ Transaction completed! Signature is ${signature}`);
}

sign()