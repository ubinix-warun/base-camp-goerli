// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract ArraysExercise {

    uint[] public numbers = [1,2,3,4,5,6,7,8,9,10];

    address[] public senders;
    uint[] public timestamps;

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

    function saveTimestamp(uint _unixTimestamp) public {
        
        senders.push(payable(msg.sender));
        timestamps.push(_unixTimestamp);
    }

    // This function use More more gas!
    function afterY2K() public view returns ( uint[] memory, address[] memory){

        uint arrSize = 0;
        for (uint i = 0; i < timestamps.length; i++) {
             if(timestamps[i] > 946702800)
             {
                arrSize++;
             }
        } 

        address [] memory sendersAfterY2K = new address[](arrSize);
        uint [] memory timeStampsAfterY2K = new uint[](arrSize);
        
        uint w = 0;
        for (uint r = 0; r < timestamps.length; r++) {
             if(timestamps[r] > 946702800)
             {
                sendersAfterY2K[w] = senders[r];
                timeStampsAfterY2K[w] = timestamps[r];
                w++;
             }
        } 

        return (timeStampsAfterY2K, sendersAfterY2K);

    } 

    function resetSenders() public {
        delete senders;
    }

    function resetTimestamps() public {
        delete timestamps;
    }

}