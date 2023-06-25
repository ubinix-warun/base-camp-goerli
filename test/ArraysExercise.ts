import {
    time,
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

import { BigNumber} from "@ethersproject/bignumber";
import { uint256, uint128, type, unchecked } from "solidity-math";

// TASK: 4

// Review the contract in the starter snippet called ArraysExercise. 
// It contains an array called numbers that is initialized with
//   the numbers 1–10. Copy and paste this into your file.

describe("T4: ArraysExercise", function () {

    const customRevertErrorMessage =
      "VM Exception while processing transaction:";

    async function deployArraysExerciseFixture() {

        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();

        const ArraysExercise = await ethers.getContractFactory("ArraysExercise");
        const arraysExercise = await ArraysExercise.deploy();

        return { arraysExercise, owner, otherAccount };
    }

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            const { arraysExercise, owner } = await loadFixture(deployArraysExerciseFixture);
        
            expect(await arraysExercise.owner()).to.equal(owner.address);
        });
    });

    describe("Validations", function () {

        const defaultArray = [
            1n, 2n, 3n, 4n,  5n,
            6n, 7n, 8n, 9n, 10n
          ];

        const appendArray = [
             2n,  3n,  5n,  8n, 13n,
            21n, 35n, 56n, 91n, 147n
        ];

// Return a Complete Array 
// The compiler automatically adds a getter for individual elements in the array, 
// but it does not automatically provide functionality to retrieve the entire array.

// Write a function called getNumbers that returns the entire numbers array.

        it("Should return default array[] when call getNumbers()", async function () {
            const { arraysExercise } = await loadFixture(deployArraysExerciseFixture);

            const  r  = await arraysExercise.getNumbers();
            
            expect(r).to.be.not.undefined;
            expect(r).to.be.not.null;
            expect(r).to.be.not.NaN;
            expect(r).to.eql(defaultArray);

        });

// Reset Numbers 
// Write a public function called resetNumbers that resets the numbers array to its initial value, holding the numbers from 1-10.

    it("Should return default array[] when call resetNumbers(), then getNumbers()", async function () {
        const { arraysExercise } = await loadFixture(deployArraysExerciseFixture);

        await arraysExercise.resetNumbers();
        
        const  r  = await arraysExercise.getNumbers();

        expect(r).to.be.not.undefined;
        expect(r).to.be.not.null;
        expect(r).to.be.not.NaN;
        expect(r).to.eql(defaultArray);

    });

// Append to an Existing Array ----
// Write a function called appendToNumbers that takes a uint[] calldata array 
//  called _toAppend, and adds that array to the storage array called numbers, already present in the starter.

    it("Should return appened array[] when call appendToNumbers(), then getNumbers()", async function () {
        const { arraysExercise } = await loadFixture(deployArraysExerciseFixture);

        await arraysExercise.appendToNumbers(appendArray);
        
        defaultArray.push(...appendArray);
        
        const  r  = await arraysExercise.getNumbers();

        expect(r).to.be.not.undefined;
        expect(r).to.be.not.null;
        expect(r).to.be.not.NaN;
        expect(r).to.eql(defaultArray);

    });

// Timestamp Saving ---------------
// At the contract level, add an address array called senders and a uint array 
// called timestamps.

// Write a function called saveTimestamp that takes a uint 
// called _unixTimestamp as an argument. When called, it should add the address of the caller to the end of senders and the _unixTimeStamp to timestamps.

// Timestamp Filtering -----------
// Write a function called afterY2K that takes no arguments.
//  When called, it should return two arrays.

// The first should return all timestamps that are more recent 
// than January 1, 2000, 12:00am. To save you a click, the Unix timestamp for this date and time is 946702800.

// The second should return a list of senders addresses corresponding to those timestamps.

// Resets ------------------------
// Add public functions called resetSenders and 
//  resetTimestamps that reset those storage variables.

    });


});