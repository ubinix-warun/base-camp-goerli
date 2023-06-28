
import {
    time,
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

import { BigNumber} from "@ethersproject/bignumber";
import { uint256, uint128, type, unchecked } from "solidity-math";

// TASK: 3

// Create a single contract called EmployeeStorage. 
// It should not inherit from any other contracts. 
// It should have the following functions:

describe("T3: EmployeeStorage", function () {

    const customRevertErrorMessage =
      "VM Exception while processing transaction:";

// State Variables
// The contract should have the following state variables, optimized to minimize storage:

// * A private variable shares storing the employee's number of shares owned
//   * Employees with more than 5,000 shares count as directors and are 
//     stored in another contract
// * Public variable name which store the employee's name
// * A private variable salary storing the employee's salary
//   * Salaries range from 0 to 1,000,000 dollars
// * A public variable idNumber storing the employee's ID number
//   * Employee numbers are not sequential, so this field should allow any 
//     number up to 2^256-1

// Constructor
// When deploying the contract, 
// utilize the constructor to set: (shares, name, salary, idNumber)

// For the purposes of the test, you must deploy the contract with the following values:
// * shares - 1000
// * name - Pat
// * salary - 50000
// * idNumber - 112358132134

    async function deployEmployeeStorageFixtureWithAlice() {

        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();

        const EmployeeStorage = await ethers.getContractFactory("EmployeeStorage");
        const employeeStorage = await EmployeeStorage.deploy(1000, "Alice", 30000, 112358132139);

        // console.log(await employeeStorage.checkForPacking(0))
        // console.log(await employeeStorage.checkForPacking(1))
        // console.log(await employeeStorage.checkForPacking(2))
        // console.log(await employeeStorage.checkForPacking(3))

        // 16777246000n
        // 112358132139n
        // 29591882003946055267496362720332152801745358025600646668181088590235118338058n
        // 1390849295786071768276380950238675083608645509734n

        return { employeeStorage, owner, otherAccount };
    }

    // async function deployEmployeeStorageFixtureWithAliceIDLongLong() {

    //     // Contracts are deployed using the first signer/account by default
    //     const [owner, otherAccount] = await ethers.getSigners();

    //     const EmployeeStorage = await ethers.getContractFactory("EmployeeStorage");
    //     const employeeStorage = await EmployeeStorage.deploy(1000, "Alice", 30000, 1227501171951206556999188047990405053689155133721);
        
    //     // ----------- = 1227501171951206556999188047990405053689155133721
    //     // Max UINT128 = 340282366920938463463374607431768211455
    //     // Max UINT256 = 115792089237316195423570985008687907853269984665640564039457584007913129639935

    //     return { employeeStorage, owner, otherAccount };
    // }

    describe("Deployment", function () {
        it("Should set the right owner and data(alice) -- Normal", async function () {
            const { employeeStorage, owner } = await loadFixture(deployEmployeeStorageFixtureWithAlice);
        
            // expect(await employeeStorage.shares()).to.equal(1000); // change it to private ()
            expect(await employeeStorage.name()).to.equal("Alice");
            // expect(await employeeStorage.salary()).to.equal(30000); // change it to private ()
            expect(await employeeStorage.idNumber()).to.equal(112358132139);
            expect(await employeeStorage.owner()).to.equal(owner.address);

        });
        // it("Should set the right owner and data(alice) -- ID LongLong", async function () {
        //     const { employeeStorage, owner } = await loadFixture(deployEmployeeStorageFixtureWithAliceIDLongLong);
        
        //     // expect(await employeeStorage.shares()).to.equal(1000); // change it to private ()
        //     expect(await employeeStorage.name()).to.equal("Alice");
        //     // expect(await employeeStorage.salary()).to.equal(30000); // change it to private ()
        //     expect(await employeeStorage.idNumber()).to.equal(112358132139);
        //     expect(await employeeStorage.owner()).to.equal(owner.address);

        // });
    });

// View Salary and View Shares
// Write a function called viewSalary that returns the value in salary.
// Write a function called viewShares that returns the value in shares.

// Grant Shares
// Add a public function called grantShares 
// that increases the number of shares allocated to an employee by _newShares. 
//  It should:
//      Add the provided number of shares to the shares
//          If this would result in more than 5000 shares, 
//                 revert with a custom error called TooManyShares that returns the number of shares the employee would have with the new amount added
//          If the number of _newShares is greater than 5000, 
//                  revert with a string message, "Too many shares"


    describe("EmployeeStorage", function () {
        it("Should return alice's salary when given call viewSalary()", async function () {
            const { employeeStorage, owner } = await loadFixture(deployEmployeeStorageFixtureWithAlice);
        
            expect(await employeeStorage.viewSalary()).to.equal(30000); // change it to private ()
            
        });
        it("Should return alice's shares when given call viewShares()", async function () {
            const { employeeStorage, owner } = await loadFixture(deployEmployeeStorageFixtureWithAlice);
        
            expect(await employeeStorage.viewShares()).to.equal(1000); // change it to private ()
             
        });

        it("Should increase alice's share to 3000 when given parameters are 2000 ", async function () {
            const { employeeStorage, owner } = await loadFixture(deployEmployeeStorageFixtureWithAlice);
        
            try {
                await employeeStorage.grantShares(2000)

                expect(await employeeStorage.viewShares()).to.equal(3000); // change it to private ()
            
            } catch(error: any) {
                expect(error.message).to.equal(
                    `${customRevertErrorMessage} reverted with custom error 'AfterHours(3)'`
                )
            }
             
        });
        it("Should return reverted with CustomError 7000 when given parameters are 2000+4000 ", async function () {
            const { employeeStorage, owner } = await loadFixture(deployEmployeeStorageFixtureWithAlice);
        
            try {
                await employeeStorage.grantShares(2000)
                await employeeStorage.grantShares(4000)

                expect(await employeeStorage.viewShares()).to.equal(1000); 

            } catch(error: any) {
                expect(error.message).to.equal(
                    `${customRevertErrorMessage} reverted with custom error 'TooManyShares(7000)'`
                )
            }
             
        });
        it("Should return reverted with string when given parameters are 6000 ", async function () {
            const { employeeStorage, owner } = await loadFixture(deployEmployeeStorageFixtureWithAlice);
        
            try {
                await employeeStorage.grantShares(6000)

                expect(await employeeStorage.viewShares()).to.equal(1000); 

            } catch(error: any) {
                expect(error.message).to.equal(
                    `${customRevertErrorMessage} reverted with reason string 'Too many shares'`
                )
            }
             
        });

    });

});