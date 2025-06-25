// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";

contract OwnableStorage is Ownable {
    uint256 public value;

    event ValueChanged(uint256 oldValue, uint256 newValue);
    event OwnableStorageCreated(address ownableStorage);

    constructor() Ownable(msg.sender) {
        emit OwnableStorageCreated(address(this));
    }

    function setValue(uint256 newValue) public onlyOwner {
        uint256 oldValue = value;
        value = newValue;
        emit ValueChanged(oldValue, newValue);
    }

    function getValue() public view returns (uint256) {
        return value;
    }
}
