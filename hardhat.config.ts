import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import "@nomicfoundation/hardhat-verify";
// FIXED BY ^ import "@nomiclabs/hardhat-etherscan";

require('solidity-coverage');

require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.17',
  },
  networks: {
    // for testnet (Base)
    'base-goerli': {
      url: 'https://goerli.base.org',
      accounts: [process.env.WALLET_KEY as string],
    },
    // for local dev environment
    'local': {
      url: 'http://localhost:8545',
      accounts: [process.env.WALLET_KEY as string],
    },
    // for testnet (Linea)
    'linea-goerli': {
      url: `https://linea-goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.WALLET_KEY as string],
    },
  },
  etherscan: {
    apiKey: {
     // Basescan doesn't require an API key, however
     // Hardhat still expects an arbitrary string to be provided.
     "base-goerli": "PLACEHOLDER_STRING",
     "linea-goerli": "PLACEHOLDER_STRING"
    },
    customChains: [
      {
        network: "base-goerli",
        chainId: 84531,
        urls: {
         apiURL: "https://api-goerli.basescan.org/api",
         browserURL: "https://goerli.basescan.org"
        }
      },
      {
        network: "linea-goerli",
        chainId: 59140,
        urls: {
         apiURL: "https://api-testnet.lineascan.build/api",
         browserURL: "https://goerli.lineascan.build"
        }
      }
    ]
  },
  defaultNetwork: 'hardhat',
};

export default config;