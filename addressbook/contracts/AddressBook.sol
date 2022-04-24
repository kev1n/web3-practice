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
    function addAddress(address yourAddress, address theirAddress, string memory alia) public {
        require(msg.sender == yourAddress);
        _addresses[yourAddress].push(theirAddress);
        _aliases[yourAddress][theirAddress] = alia;
    }

    function removeAddress() public {
        
    }

    //Gets the alias for your address
    function getAlias() public{
    
    }
}