// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

library SillyStringUtils {
    struct Haiku {
        string line1;
        string line2;
        string line3;
    }

    function shruggie(
        string memory _input
    ) internal pure returns (string memory) {
        return string.concat(_input, unicode" 🤷");
    }
}

contract ImportsExercise {
    using SillyStringUtils for SillyStringUtils.Haiku;
    SillyStringUtils.Haiku public haiku;

    address public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function getHaiku() public view returns (SillyStringUtils.Haiku memory) {
        return haiku;
    }

    function saveHaiku(
        string memory _line1,
        string memory _line2,
        string memory _line3
    ) public {
        haiku.line1 = _line1;
        haiku.line2 = _line2;
        haiku.line3 = _line3;
    }

    function shruggieHaiku()
        public
        view
        returns (SillyStringUtils.Haiku memory)
    {
        SillyStringUtils.Haiku memory sHaiku = haiku;
        sHaiku.line3 = SillyStringUtils.shruggie(haiku.line3);

        return sHaiku;
    }
}
