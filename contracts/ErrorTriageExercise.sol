// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract ErrorTriageExercise {
    address public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    /**
     * Finds the difference between each uint with it's neighbor (a to b, b to c, etc.)
     * and returns a uint array with the absolute integer difference of each pairing.
     */
    function diffWithNeighbor(
        uint _a,
        uint _b,
        uint _c,
        uint _d
    ) public pure returns (uint[] memory) {
        int[] memory intResults = new int[](3);
        uint[] memory results = new uint[](3);

        intResults[0] = int(_a) - int(_b);
        intResults[1] = int(_b) - int(_c);
        intResults[2] = int(_c) - int(_d);

        for (uint i = 0; i < 3; i++) {
            intResults[i] = intResults[i] < 0
                ? intResults[i] * -1
                : intResults[i];
            results[i] = uint(intResults[i]);
        }

        return results;
    }

    /**
     * Changes the _base by the value of _modifier.  Base is always > 1000.  Modifiers can be
     * between positive and negative 100;
     */
    function applyModifier(
        uint _base,
        int _modifier
    ) public pure returns (uint) {
        return uint(int(_base) + _modifier);
    }

    /**
     * Pop the last element from the supplied array, and return the modified array and the popped
     * value (unlike the built-in function)
     */
    uint[] arr;

    function popWithReturn() public returns (uint) {
        uint index = arr.length - 1;
        uint value = arr[index];
        arr.pop();
        return value;
    }

    // The utility functions below are working as expected
    function addToArr(uint _num) public {
        arr.push(_num);
    }

    function getArr() public view returns (uint[] memory) {
        return arr;
    }

    function resetArr() public {
        delete arr;
    }
}
