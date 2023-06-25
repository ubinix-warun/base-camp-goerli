
import {
    time,
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

import { BigNumber} from "@ethersproject/bignumber";
import { uint256, uint128, type, unchecked } from "solidity-math";

// TASK: 1

// Create a contract called BasicMath. 
// It should not inherit from any other contracts and does not need a constructor. 
// It should have the following two functions:

describe("T1: BasicMath", function () {

    async function deployBasicMathFixture() {

        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();

        const BasicMath = await ethers.getContractFactory("BasicMath");
        const basicMath = await BasicMath.deploy();

        return { basicMath, owner, otherAccount };
    }


    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            const { basicMath, owner } = await loadFixture(deployBasicMathFixture);
        
            expect(await basicMath.owner()).to.equal(owner.address);
        });
    });
  
    // Adder
    // A function called adder. It must:

    // Accept two uint arguments, called _a and _b
    // Return a uint sum and a bool error
    // If _a + _b do not overflow, it should return the sum and an error of false
    // If _a + _b overflow, it should return 0 as the sum, and an error of true

    describe("Adder", function () {
        it("Should return 2 when given parameters are 1 and 1 and !overflow", async function () {
            const { basicMath } = await loadFixture(deployBasicMathFixture);

            const  [r, b]  = await basicMath.adder(1, 1);

            expect(r).to.be.not.undefined;
            expect(r).to.be.not.null;
            expect(r).to.be.not.NaN;
            expect(r).to.equal(2);
            expect(b).to.equal(false);

        });
        it("Should return 5 when given parameters are 3 and 2 and !overflow", async function () {
            const { basicMath } = await loadFixture(deployBasicMathFixture);

            const  [r, b]  = await basicMath.adder(3, 2);

            expect(r).to.be.not.undefined;
            expect(r).to.be.not.null;
            expect(r).to.be.not.NaN;
            expect(r).to.equal(5);
            expect(b).to.equal(false);

        });
        // it("Should return 0 and overflow when given parameters are MAX and 1 and overflow", async function () {
        //     const { basicMath } = await loadFixture(deployBasicMathFixture);
        //     const a = BigNumber.from(Number.MAX_SAFE_INTEGER);
        //     const  [r, b]  = await basicMath.adder(a, 1);

        //     expect(r).to.be.not.undefined;
        //     expect(r).to.be.not.null;
        //     expect(r).to.be.not.NaN;
        //     expect(r).to.equal(0);
        //     expect(b).to.equal(false);

        // });


    });

// Subtractor
// A function called subtractor. It must:

// Accept two uint arguments, called _a and _b
// Return a uint difference and a bool error
// If _a - _b does not underflow, it should return the difference and an error of false
// If _a - _b underflows, it should return 0 as the difference, and an error of true

    describe("Subtractor", function () {
        it("Should return 1 when given parameters are 3 and 2 and !overflow", async function () {
            const { basicMath } = await loadFixture(deployBasicMathFixture);

            const  [r, b]  = await basicMath.subtractor(3, 2);

            expect(r).to.be.not.undefined;
            expect(r).to.be.not.null;
            expect(r).to.be.not.NaN;
            expect(r).to.equal(1);
            expect(b).to.equal(false);

        });
    });

});