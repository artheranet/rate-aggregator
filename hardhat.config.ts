import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import * as dotenv from "dotenv";
import "./tasks/mint"
dotenv.config();

const {
  ARTHERA_TESTNET__RPC_ENDPOINT_URL,
  ARTHERA_TESTNET_PRIVATE_KEY  
} = process.env;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.21",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    'hardhat': {
      chainId: 1337,
      allowUnlimitedContractSize: true
    },
    'arthera-testnet': {
      url: ARTHERA_TESTNET__RPC_ENDPOINT_URL,
      accounts: ARTHERA_TESTNET_PRIVATE_KEY !== undefined ? [ARTHERA_TESTNET_PRIVATE_KEY] : [],
    }
  }, 
};

export default config;