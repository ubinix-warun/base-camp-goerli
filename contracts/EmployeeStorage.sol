// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract EmployeeStorage {
    uint16 private shares;
    uint32 private salary;
    string public name;
    uint256 public idNumber;

    address public owner;

    constructor(
        uint16 _shares,
        string memory _name,
        uint24 _salary,
        uint256 _idNumber
    ) payable {
        shares = _shares;
        name = _name;
        salary = _salary;
        idNumber = _idNumber;

        owner = payable(msg.sender);
    }

    function viewSalary() public view returns (uint32) {
        return salary;
    }

    function viewShares() public view returns (uint16) {
        return shares;
    }

    // Create a custom error for TooManyShares
    error TooManyShares(uint16 newShares);

    function grantShares(uint16 _newShares) public {
        if (_newShares > 5000) {
            revert("Too many shares");
        }
        if (shares + _newShares > 5000) {
            revert TooManyShares(shares + _newShares);
        }
        shares = shares + _newShares;
    }

    /**
     * Do not modify this function.  It is used to enable the unit test for this pin
     * to check whether or not you have configured your storage variables to make
     * use of packing.
     *
     * If you wish to cheat, simply modify this function to always return `0`
     * I'm not your boss ¯\_(ツ)_/¯
     *
     * Fair warning though, if you do cheat, it will be on the blockchain having been
     * deployed by you wallet....FOREVER!
     */
    function checkForPacking(uint _slot) public view returns (uint r) {
        assembly {
            r := sload(_slot)
        }
    }

    /**
     * Warning: Anyone can use this function at any time!
     */
    function debugResetShares() public {
        shares = 1000;
    }
}
