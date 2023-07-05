import {
    time,
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

import { BigNumber} from "@ethersproject/bignumber";
import { uint256, uint128, type, unchecked } from "solidity-math";

// TASK: 10

describe("T10: ErrorTriageExercise", function () {

    const customRevertErrorMessage =
      "VM Exception while processing transaction:";

    async function deployErrorTriageExercise() {

        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();

        const ErrorTriageExercise = await ethers.getContractFactory("ErrorTriageExercise");
        const errorTriageExercise = await ErrorTriageExercise.deploy();

        return { errorTriageExercise, owner, otherAccount };
    }


    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            const { errorTriageExercise, owner } = await loadFixture(deployErrorTriageExercise);
        
            expect(await errorTriageExercise.owner()).to.equal(owner.address);
        });
    });        

    describe("ErrorTriageExercise", function () {


        it("Should return [0,0,0] when call diffWithNeighbor()", async function () {

            const { errorTriageExercise, owner } = await loadFixture(deployErrorTriageExercise);

            const r = await errorTriageExercise.diffWithNeighbor(1,1,1,1);

            expect(r).to.be.not.undefined;
            expect(r).to.be.not.null;
            expect(r).to.be.not.NaN;
            expect(r.length).to.equal(3);

            expect(r[0]).to.equal(0);
            expect(r[1]).to.equal(0);
            expect(r[2]).to.equal(0);

        });

        it("Should return 2 when call applyModifier(1,1)", async function () {

            const { errorTriageExercise, owner } = await loadFixture(deployErrorTriageExercise);

            const r = await errorTriageExercise.applyModifier(1,1);

            expect(r).to.be.not.undefined;
            expect(r).to.be.not.null;
            expect(r).to.be.not.NaN;
            expect(r).to.equal(2);

        });


        it("Should return [1,2] when call getArr()", async function () {

            const { errorTriageExercise, owner } = await loadFixture(deployErrorTriageExercise);
            
            await errorTriageExercise.addToArr(1);
            await errorTriageExercise.addToArr(2);
            // const r = await errorTriageExercise.popWithReturn();

            const r = await errorTriageExercise.getArr();

            expect(r).to.be.not.undefined;
            expect(r).to.be.not.null;
            expect(r).to.be.not.NaN;
            expect(r[0]).to.equal(1);
            expect(r[1]).to.equal(2);

        });

        // it("Should return 2 when call popWithReturn()", async function () {

        //     const { errorTriageExercise, owner } = await loadFixture(deployErrorTriageExercise);
            
        //     await errorTriageExercise.addToArr(1);
        //     await errorTriageExercise.addToArr(2);
        //     const r = await errorTriageExercise.popWithReturn();

        //     // const r = await errorTriageExercise.getArr();

        //     console.log(r);
        //     expect(r).to.be.not.undefined;
        //     expect(r).to.be.not.null;
        //     expect(r).to.be.not.NaN;
        //     // expect(r[0]).to.equal(1);
        //     // expect(r[1]).to.equal(2);
        //     expect(r).to.equal(2);

        // });

    });  

});