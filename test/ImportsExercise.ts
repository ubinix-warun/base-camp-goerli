import {
    time,
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

import { BigNumber} from "@ethersproject/bignumber";
import { uint256, uint128, type, unchecked } from "solidity-math";

// TASK: 9

describe("T9: ImportsExercise", function () {

    const customRevertErrorMessage =
      "VM Exception while processing transaction:";

    async function deployImportsExercise() {

        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();

        const ImportsExercise = await ethers.getContractFactory("ImportsExercise");
        const importsExercise = await ImportsExercise.deploy();

        return { importsExercise, owner, otherAccount };
    }


    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            const { importsExercise, owner } = await loadFixture(deployImportsExercise);
        
            expect(await importsExercise.owner()).to.equal(owner.address);
        });
    });        

    describe("ImportsExercise", function () {

        it("Should return obj when call getHaiku()", async function () {

            const { importsExercise, owner } = await loadFixture(deployImportsExercise);


            const  r  = await importsExercise.getHaiku();


            expect(r).to.be.not.undefined;
            expect(r).to.be.not.null;
            expect(r).to.be.not.NaN;
            expect(r).to.be.not.empty;
            expect(r.length).to.equal(3);

        });

        it("Should return the haiku when call saveHaiku()", async function () {

            const { importsExercise, owner } = await loadFixture(deployImportsExercise);


            await importsExercise.saveHaiku("If any one can", "Help you", "Really love that shit");

            const  r  = await importsExercise.getHaiku();


            expect(r).to.be.not.undefined;
            expect(r).to.be.not.null;
            expect(r).to.be.not.NaN;
            expect(r).to.be.not.empty;
            expect(r.length).to.equal(3);

            expect(r[0]).to.equal("If any one can");
            expect(r[1]).to.equal("Help you");
            expect(r[2]).to.equal("Really love that shit");

        });

        it("Should return the haiku  🤷 when call saveHaiku()", async function () {

            const { importsExercise, owner } = await loadFixture(deployImportsExercise);


            await importsExercise.saveHaiku("If any one can", "Help you", "Really love that shit");

            const  r  = await importsExercise.shruggieHaiku();

            expect(r).to.be.not.undefined;
            expect(r).to.be.not.null;
            expect(r).to.be.not.NaN;
            expect(r).to.be.not.empty;
            expect(r.length).to.equal(3);

            expect(r[0]).to.equal("If any one can");
            expect(r[1]).to.equal("Help you");
            expect(r[2]).to.equal("Really love that shit 🤷");

        });

    });  

});