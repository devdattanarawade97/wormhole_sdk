
```markdown
# Cross-Chain token transfer using Wormhole SDK

This project demonstrates how to bridge tokens from Ethereum to Solana using the Wormhole SDK. The process involves initializing signers for both chains, initiating a transfer on the source chain (Ethereum), waiting for an attestation, and then completing the transfer on the destination chain (Solana).

## Setup

Before running the project, ensure that you have the following:

1. **Node.js** (version >= 14.x)
2. **Wormhole SDK** installed via npm
3. Environment variables set for private keys

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the project and add your private keys for Ethereum and Solana:

   ```bash
   SOL_PRIVATE_KEY=<your-solana-private-key>
   ETH_PRIVATE_KEY=<your-ethereum-private-key>
   MY_WALLET_ADDRESS=<your-wallet-address>
   ```

## Code Walkthrough

### Main Script (`wormhole.js`)

The code demonstrates a simple token transfer between Ethereum and Solana using the Wormhole SDK.

1. **Environment Variables**: The private keys for Solana and Ethereum are fetched from environment variables using the `dotenv` package.

2. **Signer Setup**: The `getSigner` function initializes the appropriate signer based on the blockchain platform (Ethereum or Solana) by utilizing the `evm` and `solana` modules from the Wormhole SDK.

3. **Wormhole Initialization**: The Wormhole object is initialized with the Testnet environment and supported chains (`Ethereum` and `Solana`).

4. **Token Transfer**: A transfer is initiated from Ethereum to Solana. The amount to transfer is specified in the smallest unit (e.g., Wei for Ethereum), and the transfer is either automatic or manual.

5. **Attestation**: If the transfer is manual, the program waits for an attestation (VAA) before completing the transfer.

6. **Completion**: After the attestation is confirmed (if applicable), the transfer is completed on the destination chain (Solana).

### Helper Functions

- **`getEnv`**: Fetches environment variables, throwing an error if the key is missing.
- **`getSigner`**: Sets up the signer for Ethereum or Solana depending on the chain being used.

## Running the Script

1. Ensure that your `.env` file is correctly configured with your private keys.
2. Run the script:

   ```bash
   node wormhole.js
   ```

   This will initiate a token transfer from Ethereum to Solana. The script will log the progress, including the creation of the transfer object, initiation of the transfer, and the completion status.

## Example Output

```bash
executing bridge
executing signer
Transfer object created: <TransferObject>
Starting Transfer
Started Transfer: <TxId>
Waiting for Attestation
Got Attestation: <AttestationId>
Completing Transfer
Completed Transfer: <TxId>
Transfer status: <TransferStatus>
```

## Error Handling

- Ensure that both the Ethereum and Solana wallets are funded and connected properly.
- If you encounter issues, check that the private keys are correctly set in the `.env` file.
- Any unsupported blockchain platforms will trigger an error during the signer setup.

## Notes

- The example assumes you are using Ethereum and Solana Testnets.
- The transfer amount is set in the smallest unit (e.g., Wei or Lamports), so make sure to adjust the token decimals as per your specific token.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```

### Key Fixes:
1. Closed the unclosed code block in the **Installation** section.
2. Ensured consistent indentation for code blocks.
3. Maintained proper Markdown syntax throughout the document.