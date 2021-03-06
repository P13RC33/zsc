/*
 Copyright (c) 2018 ZSC Dev Team
*/

import Receipt from './receipt.js';
import Transaction from './transaction_raw.js';
const Web3 = require('web3');
// private member
const account = Symbol('account');

const contractAbi = Symbol('contractAbi');
const contractAddress = Symbol('contractAddress');

const web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/0a2f1fc6246240f0b1e12aec6f3d8ed7"));
window.web3 = web3;

export default class LogisticsCore {
    constructor(_abi, _contractAddr) {
        this[account] = "0x6A76fb522F948CfB7d6d929408D6aD5876E7139F";
        this[contractAbi] = _abi;
        this[contractAddress] = _contractAddr; 
    }

    setup(_account, _key, _coreAddr, _func) {
        let handler = this;
        let contractInstance = web3.eth.contract(this[contractAbi]).at(this[contractAddress]);
        let data = contractInstance.setup.getData(_coreAddr);

        contractInstance.setup.estimateGas(_coreAddr, function(error, result) {
            if (!error) {
                let transaction = new Transaction(_account, _key);
                if('undefined' != typeof transaction) {
                    transaction.do("transaction", data, result, handler[contractAddress], _func);
                }
            } else {
                console.log(error);
                if (null != _func) {
                    _func(error);
                }
            }
        });
    }

    getLogisticsInfo(_num, _func) {
        let handler = this;
        let contractInstance = web3.eth.contract(this[contractAbi]).at(this[contractAddress]);

        // estimate gas
        // The MetaMask Web3 object does not support synchronous methods without a callback parameter
        contractInstance.getLogisticsInfo.estimateGas(_num, function(error, result) {
            if(!error) {
                let gasRequired = result;
                // get gas price
                // MetaMask Web3 object does not support synchronous methods without a callback parameter
                web3.eth.getGasPrice(function(error, result) {
                    if(!error) {
                        console.log("============= Logistics.getLogisticsInfo(string) ==============");
                        console.log("from:    ", handler[account]);
                        console.log("gas:     ", gasRequired);
                        console.log("gasPrice:", result.toString(10));
                        console.log("===============================================================");
                        // call 'Logistics.getLogisticsInfo(string)'
                        contractInstance.getLogisticsInfo.call(_num, {from: handler[account], gas: gasRequired, gasPrice: result}, function(error, result) { 
                            if(!error) {
                                console.log("[Parcel]:", result);
                                if (null != _func) {
                                    _func(null, result);
                                }
                            } else {
                                console.log(error);
                                if (null != _func) {
                                    _func(error);
                                }
                            }
                        });
                    } else {
                        console.log(error);
                        if (null != _func) {
                            _func(error);
                        }
                    }
                });
            } else {
                console.log(error);
                if (null != _func) {
                    _func(error);
                }
            }
        });
    }
}