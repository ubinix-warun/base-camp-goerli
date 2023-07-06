# Base 🔵 Camp -- Base Goerli

> Base Camp's curriculum has been expertly crafted to equip you with the skills and knowledge needed to build and deploy smart contracts on Base, or any EVM-compatible chain, including Ethereum, Optimism, and many more. Plus, you'll be eligible to earn NFTs as you complete each module, showcasing your mastery of the material.


Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
npx hardhat coverage
```

### Complie & Deploy to Base Goerli 

```shell
npx hardhat compile
npx hardhat run scripts/deploy.ts --network base-goerli

>> Lock with 0.001ETH and unlock timestamp 1686628428 deployed to <deployed address>

npx hardhat verify --network base-goerli <deployed address>

>> The contract <deployed address> has already been verified.
>> https://goerli.basescan.org/address/<deployed address>#code

npm run standard
npm run format

```

### Note -- Setup toolkit and libraries

<details>
  <summary>Install Hardhat and OpenZeppelin.</summary>
  
```shell
# Hardhat Toolkit.

npm install --save-dev hardhat
npm install --save-dev @nomicfoundation/hardhat-toolbox
npm install --save-dev @nomicfoundation/hardhat-verify

# OpenZeppelin Libraries.

npm install --save-dev dotenv 
npm install --save-dev solidity-math
npm install --save-dev solidity-coverage

npm install --save @openzeppelin/contracts

```
</details>
<details>
  <summary>Install Mocha-Chai, eslint and prettier (sol).</summary>
  
```shell

# Test Framework.

npm install mocha --save-dev
npm install chai --save-dev
npm install mocha -g

npm run test

# Coding Standard.

npm install --save-dev prettier prettier-plugin-solidity
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

npm run lint
npm run prettier
npm run eslint
npm run eslint-fix

```

</details>

</details>
<details>
  <summary>Install Solidity analyzer (mythril).</summary>
  
```shell
conda create -n py39-sol-analysis python=3.9
conda activate py39-sol-analysis

pip3 install mythril

myth analyze contracts/ArraysExercise.sol 
>> The analysis was completed successfully. No issues were detected.

```

</details>
