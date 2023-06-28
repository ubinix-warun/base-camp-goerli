// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract ControlStructures {
    address public owner;

    constructor() {
        owner = (msg.sender);
    }

    // Create a custom error for AfterHours
    error AfterHours(uint256 time);

    function fizzBuzz(uint256 _number) public pure returns (string memory) {
        if (_number % 3 == 0 && _number % 5 == 0) {
            return "FizzBuzz";
        } else if (_number % 3 == 0) {
            return "Fizz";
        } else if (_number % 5 == 0) {
            return "Buzz";
        } else {
            return "Splat";
        }
    }

    function doNotDisturb(uint256 _time) public pure returns (string memory) {
        // If _time is greater than or equal to 2400, trigger a panic
        assert(_time < 2400);

        // If _time is greater than 2200 or less than 800, revert with a custom error of AfterHours
        if (_time > 2200 || _time < 800) {
            revert AfterHours(_time);
        } else if (_time >= 1200 && _time <= 1259) {
            revert("At lunch!");
        } else if (_time >= 800 && _time < 1200) {
            return "Morning!";
        } else if (_time >= 1300 && _time <= 1799) {
            return "Afternoon!";
        } else if (_time >= 1800 && _time <= 2199) {
            return "Evening!";
        } else {
            revert("Invalid time");
        }
    }
}
