// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract GarageManager {
    address public owner;

    struct Car {
        string make;
        string model;
        string color;
        uint numberOfDoors;
    }

    mapping(address => Car[]) private garage;

    // Create a custom error for BadCarIndex
    error BadCarIndex(uint idx);

    constructor() {
        owner = payable(msg.sender);
    }

    function addCar(
        string memory _make,
        string memory _model,
        string memory _color,
        uint _numberOfDoors
    ) public {
        garage[msg.sender].push(Car(_make, _model, _color, _numberOfDoors));
    }

    function getUserCars(
        address _userAddress
    ) public view returns (Car[] memory) {
        return garage[_userAddress];
    }

    function updateCar(
        uint _idx,
        string calldata _make,
        string calldata _model,
        string calldata _color,
        uint _numberOfDoors
    ) public {
        if (_idx >= garage[msg.sender].length || _idx < 0)
            revert BadCarIndex(_idx);

        garage[msg.sender][_idx] = Car(_make, _model, _color, _numberOfDoors);
    }

    function resetMyGarage() public {
        delete garage[msg.sender];
    }
}
