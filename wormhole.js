import { wormhole, Wormhole, signSendWait } from '@wormhole-foundation/sdk';
import evm from '@wormhole-foundation/sdk/evm';
import solana from '@wormhole-foundation/sdk/solana';
import { getSigner } from './helpers/helpers.js';
import { bridgeToken } from './wormhole1.js';
import { config } from 'dotenv';

config();
const myWalletAddress = process.env.MY_WALLET_ADDRESS;


(async function () {



  try {
    // Initialize the Wormhole object for the Testnet environment and add supported chains (EVM and Solana)
    const wh = await wormhole('Testnet', [evm, solana], {
      chains: {
        Polygon: {
          rpc: "https://rpc-amoy.polygon.technology"
        },
        Holesky: {
          rpc: "https://1rpc.io/holesky"
        },
        Solana: {
          rpc: "https://api.testnet.solana.com"
        },
        BaseSepolia: {
          rpc: "https://sepolia.base.org"
        },
        ArbitrumSepolia: {
          rpc: "https://arbitrum-sepolia.blockpi.network/v1/rpc/private"
        }

      }
    });
    console.log("executing bridge ")
    // Set up source and destination chains
    const sendChain = wh.getChain('ArbitrumSepolia');
    const balance = await sendChain.getBalance(myWalletAddress, "native")
    //log balance 
    console.log("eth balance ", balance);

    const rcvChain = wh.getChain('Holesky');
    console.log("executing signer ")
    // Configure the signers
    const source = await getSigner(sendChain);
    const destination = await getSigner(rcvChain);
    //log source chain add
    console.log("source chain address ", source.address.address['address']);

    // //log destination chain add
    // console.log("destination chain address ", destination.address.address['address']);
    // const senderAddress = source.address.address['address'];
    // const receiverAddress = destination.address.address['address'];
    // Define the transfer amount (in the smallest unit, so adjust according to your token's decimals)
    const amt = BigInt(0.0000001 * 1e18) // Example amount

    const automatic = false; // Set to true for automatic transfer

    const myTokenAddress = "0x8BC0A9C0CD6709466395cD9f652C0896C65b3CA0";
    const holeskyUSBDTokenAddress = "0x5F4aF136342B4A56fB2dAb7B8a453F9CB8900663";
    const ArbitrumSepoliaUSBDTokenAddress = "0x5F4aF136342B4A56fB2dAb7B8a453F9CB8900663";
    const tokenAddress = ArbitrumSepoliaUSBDTokenAddress
    // Create the TokenId for the native token
    // const token = Wormhole.tokenId(sendChain.chain, 'native')
    const token = Wormhole.tokenId(sendChain.chain, 'native')

    //log token 
    console.log("token ", token);
    // Create the transfer object
    const xfer = await wh.tokenTransfer(
      // { chain: sendChain.chain, address: tokenAddress }, // Replace with your token address
      token,
      amt,
      source.address,
      destination.address,
      automatic
    );


    console.log('Transfer object created:', xfer);

    // Initiate the transfer on the source chain (Solana)
    console.log('Starting Transfer');
    //log signer 
    console.log("signer ", source.signer);
    const srcTxids = await xfer.initiateTransfer(source.signer);
    
    console.log(`Debited token successfully at src chain , tx id : `, srcTxids);

    // const vaa =await wh.getVaa(srcTxids[1]);
    // //log vaa
    // console.log('vaa , : ', vaa);
    // Wait for Attestation (VAA) if manual
    if (!automatic) {
      const timeout = 2400 * 1000; // Timeout in milliseconds (60 seconds)
      console.log('Waiting for Attestation');
      const attestIds = await xfer.fetchAttestation(timeout);
      console.log(`Got Attestation: `, attestIds);
    }

    // Complete the transfer on the destination chain (Ethereum)
    console.log('Completing Transfer');
    const dstTxids = await xfer.completeTransfer(destination.signer);
    console.log(`Completed Transfer: `, dstTxids);


    console.log('Transfer status: ', xfer);


  } catch (error) {
    //log error 
    console.log("error is : ", error);
  } finally {
    // process.exit(0);
  }
});

bridgeToken({
  connectedWallets: {
    source: {
      chain: 'ArbitrumSepolia',
      address: '0xf71E2171F7Ec4Ff8D022025BC579AFFBDc2d2493',
    },
    destination: {
      chain: 'Holesky',
      address: '0xf71E2171F7Ec4Ff8D022025BC579AFFBDc2d2493',
    }
  },
  sourceToken: {
    address: '0x5F4aF136342B4A56fB2dAb7B8a453F9CB8900663',
    decimals: 18,
  },
  targetToken: {
    address: '0x5F4aF136342B4A56fB2dAb7B8a453F9CB8900663',
    decimals: 18,
  },
  amount: BigInt(1 * 1e18),
})()