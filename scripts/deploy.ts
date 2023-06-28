import { ethers } from "hardhat";

async function deployLock() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = ethers.parseEther("0.001");

  const lock = await ethers.deployContract("Lock", [unlockTime], {
    value: lockedAmount,
  });

  await lock.waitForDeployment();

  console.log(
    `Lock with ${ethers.formatEther(
      lockedAmount
    )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
  );
}

async function deployEmployeePat(tag: string,contractName: string) {

  const EmployeePat = await ethers.getContractFactory("EmployeeStorage");
  // const employeeAlice = await EmployeeAlice.deploy(1000, "Alice", 30000, 112358132139);
  const employeePat = await EmployeePat.deploy(1000, "Pat", 50000, 112358132134);

  await employeePat.waitForDeployment();

  console.log(
    `${tag}: ${contractName}(1000, "Pat", 50000, 112358132134) deployed to ${employeePat.target}`
  );

}

async function deployFavoriteRecords(tag: string,contractName: string) {

  const signers = await ethers.getSigners();

  const IterableMapping = await ethers.getContractFactory("IterableMapping");
  const iterableMapping = await IterableMapping.deploy();

  const FavoriteRecords = await ethers.getContractFactory("FavoriteRecords",{
    signer: signers[0],
    libraries: {
        IterableMapping: iterableMapping.target,
    },
  });
  const favoriteRecords = await FavoriteRecords.deploy();

  await favoriteRecords.waitForDeployment();

  console.log(
    `${tag}: ${contractName} and IMap deployed to ${favoriteRecords.target}`
  );

}


async function deployContractName(tag: string,contractName: string) {
  const contract = await ethers.deployContract(contractName);

  await contract.waitForDeployment();

  console.log(`${tag}: ${contractName} deployed to ${contract.target}`
  );
}


async function main() {
  // await deployLock();
  // await deployContractName("T1", "BasicMath");
  // await deployContractName("T2", "ControlStructures");
  // await deployContractName("T3", "EmployeeStorage");
  // await deployEmployeePat("T3", "EmployeeStorage");
  // await deployContractName("T4", "ArraysExercise");
  await deployFavoriteRecords("T5", "FavoriteRecords");

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
