// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

library IterableMapping {
    // https://solidity-by-example.org/app/iterable-mapping
    // Iterable mapping from address to uint;
    struct Map {
        string[] keys;
        mapping(string => bool) values;
        mapping(string => uint) indexOf;
        mapping(string => bool) inserted;
    }

    function get(
        Map storage map,
        string memory key
    ) public view returns (bool) {
        return map.values[key];
    }

    function getKeyAtIndex(
        Map storage map,
        uint index
    ) public view returns (string memory) {
        return map.keys[index];
    }

    function size(Map storage map) public view returns (uint) {
        return map.keys.length;
    }

    function set(Map storage map, string memory key, bool val) public {
        if (map.inserted[key]) {
            map.values[key] = val;
        } else {
            map.inserted[key] = true;
            map.values[key] = val;
            map.indexOf[key] = map.keys.length;
            map.keys.push(key);
        }
    }

    function remove(Map storage map, string memory key) public {
        if (!map.inserted[key]) {
            return;
        }

        delete map.inserted[key];
        delete map.values[key];

        uint index = map.indexOf[key];
        string memory lastKey = map.keys[map.keys.length - 1];

        map.indexOf[lastKey] = index;
        delete map.indexOf[key];

        map.keys[index] = lastKey;
        map.keys.pop();
    }

    function getKeys(Map storage map) public view returns (string[] memory) {
        return map.keys;
    }

    function clear(Map storage map) public {
        for (uint i = 0; i < map.keys.length; i++) {
            remove(map, map.keys[i]);
        }
    }

    function isExistsKey(
        Map storage map,
        string memory key
    ) public view returns (bool) {
        if (!map.inserted[key]) {
            return false;
        }
        return true;
    }
}

contract FavoriteRecords {
    using IterableMapping for IterableMapping.Map;

    IterableMapping.Map private approvedRecords;
    mapping(address => IterableMapping.Map) private userFavorites;
    address[] addressesOfFavs;

    address public owner;

    constructor() {
        approvedRecords.set("Thriller", true);
        approvedRecords.set("Back in Black", true);
        approvedRecords.set("The Bodyguard", true);
        approvedRecords.set("The Dark Side of the Moon", true);
        approvedRecords.set("Their Greatest Hits (1971-1975)", true);
        approvedRecords.set("Hotel California", true);
        approvedRecords.set("Come On Over", true);
        approvedRecords.set("Rumours", true);
        approvedRecords.set("Saturday Night Fever", true);

        owner = payable(msg.sender);
    }

    function getApprovedRecords() public view returns (string[] memory) {
        string[] memory allRecords = new string[](approvedRecords.size());

        for (uint i = 0; i < allRecords.length; i++) {
            allRecords[i] = approvedRecords.getKeyAtIndex(i);
        }

        return allRecords;
    }

    function addRecord(string memory _record) public {
        if (approvedRecords.isExistsKey(_record)) // exists
        {
            if (userFavorites[msg.sender].size() == 0) {
                addressesOfFavs.push(msg.sender);
            }
            userFavorites[msg.sender].set(_record, true);
        }
    }

    function getUserFavorites(address user) public view returns (string[] memory) {
        return getUserRecords(user);
    }

    function getUserRecords(address user) public view returns (string[] memory) {
        string[] memory userRecords = new string[](
            userFavorites[user].size()
        );

        for (uint i = 0; i < userFavorites[user].size(); i++) {
            userRecords[i] = userFavorites[user].getKeyAtIndex(i);
        }

        return userRecords;
    }

    function resetUserFavorites() public {
        userFavorites[msg.sender].clear();
    }
}
