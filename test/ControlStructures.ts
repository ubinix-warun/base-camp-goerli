import {
    time,
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

import { BigNumber} from "@ethersproject/bignumber";
import { uint256, uint128, type, unchecked } from "solidity-math";

// TASK: 2

// Create a single contract called ControlStructures. 
// It should not inherit from any other contracts and does not need a constructor. 
// It should have the following functions:


describe("T2: ControlStructures", function () {

    const customRevertErrorMessage =
      "VM Exception while processing transaction:";

    async function deployControlStructuresFixture() {

        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();

        const ControlStructures = await ethers.getContractFactory("ControlStructures");
        const controlStructures = await ControlStructures.deploy();

        return { controlStructures, owner, otherAccount };
    }


    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            const { controlStructures, owner } = await loadFixture(deployControlStructuresFixture);
        
            expect(await controlStructures.owner()).to.equal(owner.address);
        });
    });
  
// Smart Contract FizzBuzz
// Create a function called fizzBuzz that accepts a uint called _number and returns a string memory. The function should return:

// "Fizz" if the _number is divisible by 3
// "Buzz" if the _number is divisible by 5
// "FizzBuzz" if the _number is divisible by 3 and 5
// "Splat" if none of the above conditions are true

    describe("FizzBuzz", function () {
        it("Should return Fizz when given parameters are 3", async function () {
            const { controlStructures } = await loadFixture(deployControlStructuresFixture);

            const  r  = await controlStructures.fizzBuzz(3);

            expect(r).to.be.not.undefined;
            expect(r).to.be.not.null;
            expect(r).to.be.not.NaN;
            expect(r).to.equal("Fizz");

        });
        it("Should return Buzz when given parameters are 5", async function () {
            const { controlStructures } = await loadFixture(deployControlStructuresFixture);

            const  r  = await controlStructures.fizzBuzz(5);

            expect(r).to.be.not.undefined;
            expect(r).to.be.not.null;
            expect(r).to.be.not.NaN;
            expect(r).to.equal("Buzz");

        });
        it("Should return FizzBuzz when given parameters are 15", async function () {
            const { controlStructures } = await loadFixture(deployControlStructuresFixture);

            const  r  = await controlStructures.fizzBuzz(15);

            expect(r).to.be.not.undefined;
            expect(r).to.be.not.null;
            expect(r).to.be.not.NaN;
            expect(r).to.equal("FizzBuzz");

        });
        it("Should return Splat when given parameters are 1", async function () {
            const { controlStructures } = await loadFixture(deployControlStructuresFixture);

            const  r  = await controlStructures.fizzBuzz(1);

            expect(r).to.be.not.undefined;
            expect(r).to.be.not.null;
            expect(r).to.be.not.NaN;
            expect(r).to.equal("Splat");

        });

    });

// Do Not Disturb
// Create a function called doNotDisturb that accepts a _uint called _time, and returns a string memory. It should adhere to the following properties:

// If _time is greater than or equal to 2400, trigger a panic
// If _time is greater than 2200 or less than 800, revert with a custom error of AfterHours, and include the time provided
// If _time is between 1200 and 1259, revert with a string message "At lunch!"
// If _time is between 800 and 1199, return "Morning!"
// If _time is between 1300 and 1799, return "Afternoon!"
// If _time is between 1800 and 2199, return "Evening!"

    describe("doNotDisturb", function () {
        it("Should return AfterHours(3) when given parameters are 3", async function () {
            const { controlStructures } = await loadFixture(deployControlStructuresFixture);

            try {
                const  r  = await controlStructures.doNotDisturb(3);
                expect(r).to.be.not.undefined;
                expect(r).to.be.not.null;
                expect(r).to.be.not.NaN;
                expect(r).to.be.not.empty;

            } catch(error: any) {
                expect(error.message).to.equal(
                    `${customRevertErrorMessage} reverted with custom error 'AfterHours(3)'`
                )
            }

        });
        it("Should return AfterHours(2300) when given parameters are 2300", async function () {
            const { controlStructures } = await loadFixture(deployControlStructuresFixture);

            try {
                const  r  = await controlStructures.doNotDisturb(2300);
                expect(r).to.be.not.undefined;
                expect(r).to.be.not.null;
                expect(r).to.be.not.NaN;
                expect(r).to.be.not.empty;

            } catch(error: any) {
                expect(error.message).to.equal(
                    `${customRevertErrorMessage} reverted with custom error 'AfterHours(2300)'`
                )
            }

        });
        it("Should return reverted with reason string 'At lunch!' when given parameters are 1210", async function () {
            const { controlStructures } = await loadFixture(deployControlStructuresFixture);
        
            try {
                const  r  = await controlStructures.doNotDisturb(1210);
                expect(r).to.be.not.undefined;
                expect(r).to.be.not.null;
                expect(r).to.be.not.NaN;
                expect(r).to.be.not.empty;

            } catch(error: any) {
                expect(error.message).to.equal(
                    `${customRevertErrorMessage} reverted with reason string 'At lunch!'`
                )
            }

        });
        it("Should return 'Morning!' when given parameters are 1000", async function () {
            const { controlStructures } = await loadFixture(deployControlStructuresFixture);

            const  r  = await controlStructures.doNotDisturb(1000);
            expect(r).to.be.not.undefined;
            expect(r).to.be.not.null;
            expect(r).to.be.not.NaN;
            expect(r).to.equal('Morning!');

        });
        it("Should return 'Afternoon!' when given parameters are 1300", async function () {
            const { controlStructures } = await loadFixture(deployControlStructuresFixture);

            const  r  = await controlStructures.doNotDisturb(1300);
            expect(r).to.be.not.undefined;
            expect(r).to.be.not.null;
            expect(r).to.be.not.NaN;
            expect(r).to.equal('Afternoon!');

        });
        it("Should return 'Evening!' when given parameters are 1900", async function () {
            const { controlStructures } = await loadFixture(deployControlStructuresFixture);

            const  r  = await controlStructures.doNotDisturb(1900);
            expect(r).to.be.not.undefined;
            expect(r).to.be.not.null;
            expect(r).to.be.not.NaN;
            expect(r).to.equal('Evening!');

        });

        it("Should return reverted with panic code 0x1 (Assertion error) when given parameters are 2500", async function () {
            const { controlStructures } = await loadFixture(deployControlStructuresFixture);

            try {
                const  r  = await controlStructures.doNotDisturb(2500);
                expect(r).to.be.not.undefined;
                expect(r).to.be.not.null;
                expect(r).to.be.not.NaN;
                expect(r).to.be.not.empty;

            } catch(error: any) {
                expect(error.message).to.equal(
                    `${customRevertErrorMessage} reverted with panic code 0x1 (Assertion error)`
                )
            }
        });
        it("Should assert 'value out-of-bounds' when given parameters are -1", async function () {
            const { controlStructures } = await loadFixture(deployControlStructuresFixture);

            try {
                const  r  = await controlStructures.doNotDisturb(-1);
                expect(r).to.be.not.undefined;
                expect(r).to.be.not.null;
                expect(r).to.be.not.NaN;
                expect(r).to.be.not.empty;

            } catch(error: any) {
                expect(error.message.startsWith("value out-of-bounds (argument=\"_time\", value=-1")).to.be.true;
            }
        });

        // Test Overflow!


    });


});