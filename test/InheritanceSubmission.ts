import {
    time,
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

import { BigNumber} from "@ethersproject/bignumber";
import { uint256, uint128, type, unchecked } from "solidity-math";

// TASK: 8

// Employee
// Create an abstract contract called employee. It should have:

// A public variable storing idNumber
// A public variable storing managerId
// A constructor that accepts arguments for and sets both of these variables
// A virtual function called getAnnualCost that returns a uint

// Salaried
// A contract called Salaried. It should:

// Inherit from Employee
// Have a public variable for annualSalary
// Implement an override function for getAnnualCost that returns annualSalary
// An appropriate constructor that performs any setup, including setting annualSalary
// Hourly
// Implement a contract called Hourly. It should:

// Inherit from Employee
// Have a public variable storing hourlyRate
// Include any other necessary setup and implementation

describe("T8: InheritanceSubmission", function () {

    const customRevertErrorMessage =
      "VM Exception while processing transaction:";

    async function deployInheritanceSubmissionFixture() {

        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();

        const Salesperson = await ethers.getContractFactory("Salesperson");
        const salesperson = await Salesperson.deploy(55555, 12345, 20);

        const EngineeringManager = await ethers.getContractFactory("EngineeringManager");
        const engineeringManager = await EngineeringManager.deploy(54321, 11111, 200000);

        const InheritanceSubmission = await ethers.getContractFactory("InheritanceSubmission");
        const inheritanceSubmission = await InheritanceSubmission.
                    deploy(salesperson.target, engineeringManager.target);

        return { inheritanceSubmission, salesperson, engineeringManager, owner, otherAccount };
    }

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            const { inheritanceSubmission, owner } = await loadFixture(deployInheritanceSubmissionFixture);
        
            expect(await inheritanceSubmission.owner()).to.equal(owner.address);
        });
    });

    describe("Validations", function () {

        it("Should return 20*2080 when call salesperson.getAnnualCost()", async function () {

            const { salesperson, owner } = await loadFixture(deployInheritanceSubmissionFixture);

            const  r  = await salesperson.getAnnualCost();

            expect(r).to.be.not.undefined;
            expect(r).to.be.not.null;
            expect(r).to.be.not.NaN;
            expect(r).to.be.equal(20 * 2080);

        });

        it("Should return 200000 when call engineeringManager.getAnnualCost()", async function () {

            const { engineeringManager, owner } = await loadFixture(deployInheritanceSubmissionFixture);

            const  r  = await engineeringManager.getAnnualCost();


            expect(r).to.be.not.undefined;
            expect(r).to.be.not.null;
            expect(r).to.be.not.NaN;
            expect(r).to.be.equal(200000);

        });

        it("Should return [1234n] when call engineeringManager.addReport()", async function () {

            const { engineeringManager, owner } = await loadFixture(deployInheritanceSubmissionFixture);

            await engineeringManager.addReport(1234);

            const  r  = await engineeringManager.getReports();


            expect(r).to.be.not.undefined;
            expect(r).to.be.not.null;
            expect(r).to.be.not.NaN;
            expect(r).to.be.not.empty;
            expect(r.length).to.be.equal(1);

        });


        it("Should return [] when call engineeringManager.resetReports()", async function () {

            const { engineeringManager, owner } = await loadFixture(deployInheritanceSubmissionFixture);

            await engineeringManager.addReport(1234);
            await engineeringManager.resetReports();

            const  r  = await engineeringManager.getReports();


            expect(r).to.be.not.undefined;
            expect(r).to.be.not.null;
            expect(r).to.be.not.NaN;
            expect(r).to.be.empty;

        });

    });  

});