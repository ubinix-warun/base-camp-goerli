import {
    time,
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

import { BigNumber} from "@ethersproject/bignumber";
import { uint256, uint128, type, unchecked } from "solidity-math";

// TASK: 7

// Create a contract called GarageManager. Add the following in storage:

// A public mapping called garage to store a list of Cars (described below), indexed by address
// Add the following types and functions.

// Car Struct
// Implement a struct called Car. It should store the following properties:

// make
// model
// color
// numberOfDoors

describe("T7: GarageManager", function () {

    const customRevertErrorMessage =
      "VM Exception while processing transaction:";

    async function deployGarageManager() {

        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();

        const GarageManager = await ethers.getContractFactory("GarageManager");
        const garageManager = await GarageManager.deploy();

        return { garageManager, owner, otherAccount };
    }


    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            const { garageManager, owner } = await loadFixture(deployGarageManager);
        
            expect(await garageManager.owner()).to.equal(owner.address);
        });
    });        

    describe("GarageManager", function () {

// Add Car Garage
// Add a function called addCar that adds a car to the user's collection in the garage. It should:

// Use msg.sender to determine the owner
// Accept arguments for make, model, color, and number of doors, and use those to create a new instance of Car
// Add that Car to the garage under the user's address
// Get All Cars Belonging to a User
// Add a function called getMyCars. It should return an array with all of the cars owned by the calling user.

// Get User Cars
// Add a function called getUserCars. It should return an array with all of the cars for any given address.

        it("Should add Record and got 'CCA' when call addCar()", async function () {

            const { garageManager, owner } = await loadFixture(deployGarageManager);

            await garageManager.addCar("CCA", "SSCC","Grayspace",4);

            const r = await garageManager.getUserCars(owner);

            expect(r).to.be.not.undefined;
            expect(r).to.be.not.null;
            expect(r).to.be.not.NaN;
            expect(r.length).to.equal(1);
            expect(r[0][0]).to.equal("CCA");

        });

// Update Car
// Add a function called updateCar. It should accept a uint for the index of the car to be updated, and arguments for all of the Car types.

// If the sender doesn't have a car at that index, it should revert with a custom error BadCarIndex and the index provided.
// Otherwise, it should update that entry to the new properties.

        it("Should update Record to 'CCB' when call updateCar()", async function () {

            const { garageManager, owner } = await loadFixture(deployGarageManager);

            await garageManager.addCar("CCA", "SSCC","Grayspace",4);

            await garageManager.updateCar(0, "CCB", "SSCC","Grayspace",4);

            const r = await garageManager.getUserCars(owner);

            expect(r).to.be.not.undefined;
            expect(r).to.be.not.null;
            expect(r).to.be.not.NaN;
            expect(r.length).to.equal(1);
            expect(r[0][0]).to.equal("CCB");

        });

        it("Should revert with BadCarIndex error when call updateCar() out-of-range", async function () {

            const { garageManager, owner } = await loadFixture(deployGarageManager);

            try {

                await garageManager.addCar("CCA", "SSCC","Grayspace",4);

                await garageManager.updateCar(1, "CCB", "SSCC","Grayspace",4);
    
                const r = await garageManager.getUserCars(owner);
    
                expect(r).to.be.not.undefined;
                expect(r).to.be.not.null;
                expect(r).to.be.not.NaN;
                expect(r.length).to.equal(1);
                expect(r[0][0]).to.equal("CCB");

            } catch(error: any) {
                expect(error.message).to.equal(
                    `${customRevertErrorMessage} reverted with custom error 'BadCarIndex(1)'`
                )
            }

        });

// Reset My Garage
// Add a public function called resetMyGarage. It should delete the entry in garage for the sender.

        it("Should reset myGarage when call resetMyGarage()", async function () {

            const { garageManager, owner } = await loadFixture(deployGarageManager);

            await garageManager.addCar("CCA", "SSCC","Grayspace",4);
            await garageManager.addCar("CCB", "SSCC","Oceanblue",5);
            await garageManager.resetMyGarage();

            const r = await garageManager.getUserCars(owner);

            expect(r).to.be.not.undefined;
            expect(r).to.be.not.null;
            expect(r).to.be.not.NaN;
            expect(r.length).to.equal(0);

        });


    });  

});
