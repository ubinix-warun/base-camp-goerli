// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract ArraysExercise {

    uint[] public numbers = [1,2,3,4,5,6,7,8,9,10];

    address public owner;

    constructor() payable {
        owner = payable(msg.sender);
    }

    function getNumbers() public view returns (uint[] memory) {
        return numbers;
    }

    function resetNumbers() public {
        numbers = [1,2,3,4,5,6,7,8,9,10];
    }

    function appendToNumbers(uint[] memory _toAppend) public {
        for (uint i = 0; i < _toAppend.length; i++) {
             numbers.push(_toAppend[i]);
        }
    }
}