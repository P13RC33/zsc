/*
 Copyright (c) 2018, ZSC Dev Team
*/

import "./pet_erc721.sol";

pragma solidity ^0.4.21;

contract PetBreeding is PetERC721 {

    uint256 autoBirthFee = 2 finney;
    uint256 pregnantPets;

    function PetBreeding() public PetERC721() {}


}