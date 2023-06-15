// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract BasicMath {

    uint constant MAX_UINT = type(uint).max;

    address public owner;

    constructor() {
        owner = (msg.sender);
    }

    function adder(uint _a, uint _b) public pure returns (uint, bool) {
        if(_a > MAX_UINT - _b) {
            return (0, true); // Overflow would occur, return error
        }
        return (_a + _b, false);
    }

    function subtractor(uint _a, uint _b) public pure returns (uint, bool) {
        if(_b > _a) {
            return (0, true); // Underflow would occur, return error
        }
        return (_a - _b, false); // No underflow
    }

}