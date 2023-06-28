import {
    time,
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

import { BigNumber} from "@ethersproject/bignumber";
import { uint256, uint128, type, unchecked } from "solidity-math";

// TASK: 5

// Create a single contract called FavoriteRecords. It should not inherit from any other contracts. It should have the following properties:

// State Variables
// The contract should have the following state variables. 
// It is up to you to decide if any supporting variables are useful.

// A public mapping approvedRecords, which returns true 
// if an album name has been added as described below, and false if it has not
// A mapping called userFavorites that indexes user addresses to a mapping of string record names which returns true or false, depending if the user has marked that album as a favorite
// Loading Approved Albums
// Using the method of your choice, load approvedRecords with the following:

// Thriller
// Back in Black
// The Bodyguard
// The Dark Side of the Moon
// Their Greatest Hits (1971-1975)
// Hotel California
// Come On Over
// Rumours
// Saturday Night Fever

describe("T5: FavoriteRecords", function () {

    const customRevertErrorMessage =
      "VM Exception while processing transaction:";

    async function deployFavoriteRecordsWithIterableMapping() {

        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();

        const IterableMapping = await ethers.getContractFactory("IterableMapping");
        const iterableMapping = await IterableMapping.deploy();

        // const FavoriteRecords = await ethers.getContractFactory("FavoriteRecords");
        const FavoriteRecords = await ethers.getContractFactory("FavoriteRecords", {
            signer: owner,
            libraries: {
                IterableMapping: iterableMapping.target,
            },
          });

        const favoriteRecords = await FavoriteRecords.deploy();

        return { favoriteRecords, owner, otherAccount };
    }


    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            const { favoriteRecords, owner } = await loadFixture(deployFavoriteRecordsWithIterableMapping);
        
            expect(await favoriteRecords.owner()).to.equal(owner.address);
        });
    });        

    describe("FavoriteRecords", function () {

// Get Approved Records
// Add a function called getApprovedRecords. 
// This function should return a list of all of the names currently indexed in approvedRecords.

        it("Should return approvedRecords when call getApprovedRecords()", async function () {
        
            const { favoriteRecords } = await loadFixture(deployFavoriteRecordsWithIterableMapping);

            const  r  = await favoriteRecords.getApprovedRecords();

            expect(r).to.be.not.undefined;
            expect(r).to.be.not.null;
            expect(r).to.be.not.NaN;
            expect(r).to.contains("Thriller");

        });

// Add Record to Favorites
// Create a function called addRecord that accepts an album name as a parameter. 
// If the album is on the approved list, add it to the list under the address of the sender. Otherwise, 
// reject it with a custom error of NotApproved with the submitted name as an argument.

        it("Should add Record and got 'Rumours' when call addRecord()", async function () {

            const { favoriteRecords, owner } = await loadFixture(deployFavoriteRecordsWithIterableMapping);

            await favoriteRecords.addRecord("Rumours");

            const  r  = await favoriteRecords.getUserRecords(owner);

            expect(r).to.be.not.undefined;
            expect(r).to.be.not.null;
            expect(r).to.be.not.NaN;
            expect(r).to.contains("Rumours");
            expect(r.length).to.equal(1);

        });

        it("Should add Record and got !'Rumours' when call addRecord()", async function () {

            const { favoriteRecords, owner } = await loadFixture(deployFavoriteRecordsWithIterableMapping);

            await favoriteRecords.addRecord("Rumours");

            const  r  = await favoriteRecords.getUserRecords(owner);

            expect(r).to.be.not.undefined;
            expect(r).to.be.not.null;
            expect(r).to.be.not.NaN;
            expect(r).to.be.not.contains("Thriller");
            expect(r.length).to.equal(1);

        });

// Users' Lists
// Write a function called getUserFavorites that retrieves the list of favorites for any address.

        it("Should return allFavorites got Rumours when call getUserFavorites()", async function () {

            const { favoriteRecords, owner } = await loadFixture(deployFavoriteRecordsWithIterableMapping);

            await favoriteRecords.addRecord("Rumours");

            const  r  = await favoriteRecords.getUserFavorites(owner);


            expect(r).to.be.not.undefined;
            expect(r).to.be.not.null;
            expect(r).to.be.not.NaN;
            expect(r).to.be.contains("Rumours");
            expect(r.length).to.equal(1);

        });

        it("Should return allFavorites not got Thriller when call getUserFavorites()", async function () {

            const { favoriteRecords, owner } = await loadFixture(deployFavoriteRecordsWithIterableMapping);

            await favoriteRecords.addRecord("Rumours");

            const  r  = await favoriteRecords.getUserFavorites(owner);

            expect(r).to.be.not.undefined;
            expect(r).to.be.not.null;
            expect(r).to.be.not.NaN;
            expect(r).to.be.not.contains("Thriller");
            expect(r.length).to.equal(1);

        });

// Reset My Favorites
// Add a function called resetUserFavorites that resets userFavorites for the sender.

        it("Should return [] when call resetUserFavorites()", async function () {

            const { favoriteRecords, owner } = await loadFixture(deployFavoriteRecordsWithIterableMapping);

            await favoriteRecords.addRecord("Rumours");
            await favoriteRecords.resetUserFavorites();

            const  r  = await favoriteRecords.getUserRecords(owner);

            expect(r).to.be.not.undefined;
            expect(r).to.be.not.null;
            expect(r).to.be.not.NaN;
            expect(r).to.be.empty;

        });

    });  

});