// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract DEX {
    uint256 public placeholderRate;

    constructor(uint256 _placeholderRate) {
        placeholderRate = _placeholderRate * 10 ** 2;
    }

    function getRate() public view returns (uint256 rate) {
        return placeholderRate;
    }
}
