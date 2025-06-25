// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract SimpleCounter {
    uint256 public count = 0;

    event SimpleCounterCreated(address simpleCounter);

    constructor() {
        emit SimpleCounterCreated(address(this));
    }

    function increment() public {
        count += 1;
    }

    function decrement() public {
        require(count > 0, "Counter cannot go below zero");
        count -= 1;
    }

    function getCount() public view returns (uint256) {
        return count;
    }
}
