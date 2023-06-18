# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
npx hardhat coverage

npx hardhat compile
npx hardhat run scripts/deploy.ts --network base-goerli

>> Lock with 0.001ETH and unlock timestamp 1686628428 deployed to <deployed address>

npx hardhat verify --network base-goerli <deployed address>

>> The contract <deployed address> has already been verified.
>> https://goerli.basescan.org/address/<deployed address>#code


```


```shell
npm install --save-dev hardhat
npm install --save-dev @nomicfoundation/hardhat-toolbox
npm install --save-dev @nomicfoundation/hardhat-verify
npm install --save-dev dotenv solidity-math

npm install --save @openzeppelin/contracts

npm install mocha -- save-dev
npm install chai -- save-dev
npm install mocha -g

npm run test

npm install --save-dev solidity-coverage

```