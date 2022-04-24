//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;


contract AddressBook {

    //maps an address to an address array
    //As an example your address to a list of addresses you are interested in.  This supports multiple people having an address book

    mapping(address => address[]) private _addresses;

 
    //maps an address to another map of address to a string
    //example - your address mapped to a mapping of your address book to its alias

    mapping(address => mapping(address => string)) private _aliases;


    //returns the list of addresses in the _addresses map
    function getAddressArray(address yourAddress) public view returns (address[] memory) {
        return _addresses[yourAddress];
    }

    //adds address to your list of addresses in the _addresses map.
    //Uses push since it is an array
    //adds your address, address and alias to the _aliases map
    function addAddress(address theirAddress, string memory alia) public {
        _addresses[msg.sender].push(theirAddress);
        _aliases[msg.sender][theirAddress] = alia;
    }

    function removeAddress(address theirAddress) public {
        delete(_addresses[msg.sender][indexOf(_addresses[msg.sender], theirAddress)]);
        delete(_aliases[msg.sender][theirAddress]);
    }

    //Gets the alias for a address
    function getAlias(address theirAddress) public view returns (string memory) {
        return _aliases[msg.sender][theirAddress];
    }

    function indexOf(address[] memory ary, address search) public pure returns (uint) {
        for (uint i = 0; i < ary.length; i++) {
            if (ary[i] == search) {
                return i;
            }
        }
        revert("Address not found");
    }
}