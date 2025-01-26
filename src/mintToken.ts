import "dotenv/config";
import {
    Connection,
    Keypair,
    SystemProgram,
    Transaction,
    clusterApiUrl,
    sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
    MINT_SIZE,
    TOKEN_2022_PROGRAM_ID,
    createInitializeMint2Instruction,
    getMinimumBalanceForRentExemptMint,
} from "@solana/spl-token";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");
console.log("sender", senderKeypair.publicKey)

const wallet = senderKeypair;
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Generate keypair to use as address of mint account
const mint = new Keypair();

// Calculate minimum lamports for space required by mint account
(async () => {
    const rentLamports = await getMinimumBalanceForRentExemptMint(connection);
console.log("rent" , rentLamports)
    // Instruction to create a new account with space for the new mint account
    const createAccountInstruction = SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: mint.publicKey,
        space: MINT_SIZE,
        lamports: rentLamports,
        programId: TOKEN_2022_PROGRAM_ID,
    });

    // console.log("createAccountInstruction",createAccountInstruction);


    // Instruction to initialize mint account
const initializeMintInstruction = createInitializeMint2Instruction(
    mint.publicKey,
    2, // decimals
    wallet.publicKey, // mint authority
    wallet.publicKey, // freeze authority
    TOKEN_2022_PROGRAM_ID,
);
// console.log("initializeMintInstruction",initializeMintInstruction)

// Build transaction with instructions to create new account and initialize mint account
const transaction = new Transaction().add(
    createAccountInstruction,
    initializeMintInstruction,
);
const transactionSignature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [
        wallet, // payer
        mint, // mint address keypair
    ],
);
console.log(
    "\nTransaction Signature:",
    `https://solana.fm/tx/${transactionSignature}?cluster=devnet-solana`,
)


// GFCndhfsKUNgzq4incy8KA13jqu3736zK9NM7sZRYVd4

console.log(
    "\nMint Account:",
    `https://solana.fm/address/${mint.publicKey}?cluster=devnet-solana`,
);

})();


