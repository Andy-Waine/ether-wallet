const { task } = require("hardhat/config");

require("@nomicfoundation/hardhat-toolbox");

task(
  'accounts',
  'Prints a list of all accounts and their balances',
  async (taskArgs, hre) => {
    //uses ethers within hardhat runtime environment
    const accounts = await hre.ethers.getSigners()
    
    for (const account of accounts) {
      const balance = await account.getBalance()

      //log appears in terminal after running 'npx hardhat accounts'
      console.log(account.address, ":", balance);
    }
  }
)

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  paths: {
    sources: './contracts',
    artifacts: './src/artifacts'
  },
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainID: 1337
    },
    goerli: {
      url: 'https://goerli-testnet-node-url.com',
      // accounts: [privateKey1, privateKey2]
    }
  }
};
