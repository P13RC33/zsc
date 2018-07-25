/*
 Copyright (c) 2018, ZSC Dev Team
*/

import "./pet_control.sol";

pragma solidity ^0.4.21;

contract PetBase is PetControl {

    struct PetInfo {
        uint256 genes_;
        uint64 birthTime_;
        uint64 cooldownEndBlock_;
        uint32 matronId_;
        uint32 sireId_;
        uint32 siringWithId_;
        uint16 cooldownIndex_;
        uint16 generation_;
    }

    PetInfo[] pets_;
    mapping (uint256 => address) indexToOwner_;
    mapping (address => uint256) ownerToCount_;
    mapping (uint256 => address) indexToApproved_;
    mapping (uint256 => address) indexToSireApproved_;

    uint256 secondsPerBlock_ = 15;

    uint32[14] public cooldowns_ = [
        uint32(1 minutes),
        uint32(2 minutes),
        uint32(5 minutes),
        uint32(10 minutes),
        uint32(30 minutes),
        uint32(1 hours),
        uint32(2 hours),
        uint32(4 hours),
        uint32(8 hours),
        uint32(16 hours),
        uint32(1 days),
        uint32(2 days),
        uint32(4 days),
        uint32(7 days)
    ];

    function PetBase() public PetControl() {}

    function setSecondsPerBlock(uint256 _secs) external onlyCLevel {
        require(_secs < cooldowns_[0]);
        secondsPerBlock_ = _secs;
    }
}