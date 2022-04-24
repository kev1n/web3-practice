// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import 'hardhat/console.sol';
contract WavePortal {
    uint totalWaves;
    uint seed;
    address owner;
    mapping (address => uint) lastWon;
    mapping (address => uint) qtyOwed;
    uint totalOwed;

    event NewWave(address indexed from, uint256 timestamp, string message);
    

    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    Wave[] waves;

    constructor() payable {
        owner = msg.sender;
    }

    function wave(string memory _message) public {
        require(lastWon[msg.sender] + 5 minutes < block.timestamp, "Wait another 5 minutes");
        lastWon[msg.sender] = block.timestamp;

        //totalWaves added by 1
        totalWaves += 1;
        //pushing the wave to waves
        waves.push(Wave(msg.sender, _message, block.timestamp));
        //emitting
        emit NewWave(msg.sender, block.timestamp, _message);


        seed = uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty, block.number))) % 100;
        console.log(seed);
        if (seed > 50) {
            uint256 prizeAmount = 0.01 ether;
            qtyOwed[msg.sender] += prizeAmount;
            totalOwed += prizeAmount;
        }
    }

    function getOwedFromAddress(address person) public view returns (uint){
        return qtyOwed[person];
    }

    function withdrawFunds(address payable reciever) public {
        require(qtyOwed[msg.sender] > 0);
        totalOwed -= qtyOwed[msg.sender];
        (reciever).transfer(qtyOwed[msg.sender]);
        qtyOwed[msg.sender] = 0;
        
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint) {
        return totalWaves;
    }


}