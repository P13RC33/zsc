/**
 Copyright (c) 2018, deduotech.com
 2018-10-19: v0.00.01
 */

pragma solidity ^0.4.21;
// pragma experimental ABIEncoderV2;

import "../../utillib/LibString.sol";
import "../../utillib/LibInt.sol";

contract LogisticsCore {

    using LibString for *;
    using LibInt for *;

    struct Track {
        string type_;
        string time_;
        string country_;
        string city_;
        string facilityName_;
        string timeZone_;
        string desc_;
        string actionCode_;
    }

    struct Brief {
        string transNum_;
        string model_;
        string destinationCountry_;
        string lastStatus_;
    }

    /*************************************************/
    /** @desc num total count */
    uint private numTotalCount_;

    /** @desc uint(num index) => string(original num name) */
    mapping(uint => string) private numNames_;

    /** @desc string(original num name) => uint(num index) */
    mapping(string => uint) private numIndexs_;

    /** @desc string(original num name) => bool(num exist flag) */
    // mapping(string => bool) private numExist_;

    /** @desc string(original num name) => uint(num invalid count) */
    mapping(string => uint) private numInvalidCounts_;
    /*************************************************/

    /** @desc string(valid/invalid num name: original num name + valid/invalid num index) => Brief(brief info)
      * @eg JNTCU0600046683YQ-3 => Brief
      */
    mapping(string => Brief) private briefs_;

    /** @desc string(valid/invalid num name: original num name + valid/invalid num index) => uint(track count)
      * @eg JNTCU0600046683YQ-3 => 4
      */
    mapping(string => uint) private trackCounts_;

    /** @desc string(track name: original num name + valid/invalid num index + track index) => Track(track info)
      * @eg JNTCU0600046683YQ-3-5 => Track
      */
    mapping(string => Track) private tracks_;  

    /** @desc string(valid/invalid num name: original num name + valid/invalid num index) => string[](track temps) */
    mapping(string => string[]) private trackTmps_;

    // Constructor
    function LogisticsCore() public {
        numTotalCount_ = 0;
    }
}