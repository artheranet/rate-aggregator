// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./mocks/DEX.sol";

/// @custom:security-contact julien.beranger@arthera.net
contract RateAggregator {
    address public dex1;
    address public dex2;

    constructor(address _dex1, address _dex2) {
        dex1 = _dex1;
        dex2 = _dex2;
    }

    function updateRate() public view returns (uint256 rate) {
        uint256 rateFromDex1 = DEX(dex1).getRate();
        uint256 rateFromDex2 = DEX(dex2).getRate();
        return (rateFromDex1 + rateFromDex2) / 2;
    }
}
