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

  await iterableMapping.waitForDeployment();

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

async function deploySalesperson(tag: string,contractName: string) {

  const Salesperson = await ethers.getContractFactory("Salesperson");
  // const employeeAlice = await EmployeeAlice.deploy(1000, "Alice", 30000, 112358132139);
  const salesPerson = await Salesperson.deploy(55555, 12345, 20);

  await salesPerson.waitForDeployment();

  console.log(
    `${tag}: ${contractName}(55555, 12345, 20) deployed to ${salesPerson.target}`
  );

}

async function deployEngineeringManager(tag: string,contractName: string) {

  const EngineeringManager = await ethers.getContractFactory("EngineeringManager");
  // const employeeAlice = await EmployeeAlice.deploy(1000, "Alice", 30000, 112358132139);
  const engineeringManager = await EngineeringManager.deploy(54321, 11111, 200000);

  await engineeringManager.waitForDeployment();

  console.log(
    `${tag}: ${contractName}(54321, 11111, 200000) deployed to ${engineeringManager.target}`
  );

}

async function deployInheritanceSubmission(tag: string,contractName: string) {

  const InheritanceSubmission = await ethers.getContractFactory("InheritanceSubmission");
  // const employeeAlice = await EmployeeAlice.deploy(1000, "Alice", 30000, 112358132139);
  const inheritanceSubmission = await InheritanceSubmission.deploy("0x447221702124257bF7a0371c8154865089A59b3C", 
                                    "0x5Be3DA375e58BA68691f86C9474C5564c8e3C86c");

  await inheritanceSubmission.waitForDeployment();

  console.log(
    `${tag}: ${contractName}("0x447221702124257bF7a0371c8154865089A59b3C", 
                "0x5Be3DA375e58BA68691f86C9474C5564c8e3C86c") \r\n\t\t\tdeployed to ${employeePat.target}`
  );

}

async function deployImportsExercise(tag: string,contractName: string) {

  const signers = await ethers.getSigners();

  const SillyStringUtils = await ethers.getContractFactory("SillyStringUtils");
  const sillyStringUtils = await SillyStringUtils.deploy();

  await sillyStringUtils.waitForDeployment();

  console.log(`${sillyStringUtils.target}`)
  const ImportsExercise = await ethers.getContractFactory("ImportsExercise",{
    signer: signers[0],
    libraries: {
      SillyStringUtils: sillyStringUtils.target,
    },
  });
  const importsExercise = await ImportsExercise.deploy();

  await importsExercise.waitForDeployment();

  console.log(
    `${tag}: ${contractName} and SillyStringUtils deployed to ${importsExercise.target}`
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
  // await deployFavoriteRecords("T5", "FavoriteRecords");
  //  T6 -- Adv Fn.
  // await deployContractName("T7", "GarageManager");
  // await deploySalesperson("T8.1", "Salesperson");
  // await deployEngineeringManager("T8.2", "EngineeringManager");
  // await deployInheritanceSubmission("T8", "InheritanceSubmission");
  // await deployImportsExercise("T9", "ImportsExercise");
  await deployContractName("T10", "ErrorTriageExercise");


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
