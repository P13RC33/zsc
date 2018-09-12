/*
 Copyright (c) 2018 ZSC Dev Team
*/

import Output from './output.js';

//private member
const constractAbi = Symbol('abi');
const constractAddress = Symbol('address');
const addressRaw = Symbol('addressRaw');
const privateKeyRaw = Symbol('privateKeyRaw');

export default class ZSCRaw {
    constructor(abi, address) {
        let isMetaMask = web3.currentProvider.isMetaMask;

        this[constractAbi] = abi;
        this[constractAddress] = address;
        this[addressRaw] = web3.eth.coinbase;
        if (isMetaMask) {
            //this[addressRaw] = "0xbaa43825f1bda3839c5f3038c65c504cb6d962c8";
            this[privateKeyRaw] = "0x5367874f5f72d3e7554e7df202a4f79e1f4ed591c3bc5a78993390f3becf313f";
        } else {
            //this[addressRaw] = "0x15ca13630ce52cd4e209012635f10b396e098296";
            this[privateKeyRaw] = "0x748443675b8cc68e225d4d7f266d2e57a7157e28b55b7cf66409f76a02bd49ca";
        }
    }

    set(_index, _data) {
        let contractInstance = web3.eth.contract(this[constractAbi]).at(this[constractAddress]);

        // estimate gas
        contractInstance.set.estimateGas(_index, _data, function(error, result) {
            if(!error) {
                // set
                contractInstance.set(_index, _data, {gas: result}, function(error, result) { 
                    if(!error) {
                        Output(window.outputElement, 'small', 'red', `[TransactionHash]:${result}`);
                        // get receipt
                        let receipt = web3.eth.getTransactionReceipt(result, function(error, result) {
                            if(!error) {
                                // console.log(result);
                                // Output(window.outputElement, 'small', 'red', result);
                            } else {
                                Output(window.outputElement, 'small', 'red', error);
                            }
                        });
                    } else {
                        Output(window.outputElement, 'small', 'red', error);
                    }
                });
            } else {
                Output(window.outputElement, 'small', 'red', error);
            }
        });
    }

    setRaw(_index, _data) {
        let contractInstance = web3.eth.contract(this[constractAbi]).at(this[constractAddress]);
                   
        let address = this[rawAddress];
        let key = this[privateKey];

        web3.eth.getTransactionCount(this[rawAddress], function(error, nonce) {
            // get function data
            let data = contractInstance.set.getData(_index, _data);

            // estimate gas
            contractInstance.set.estimateGas(_index, _data, {data: data},
                function(error, gasLimit) {
                    if(!error) {
                        // get gas price
                        web3.eth.getGasPrice(function(error, gasPrice){
                            if(!error) {
                                let rawTx = {
                                    gasPrice: web3.toHex(gasPrice),
                                    gasLimit: web3.toHex(gasLimit),
                                    from: address,
                                    nonce: web3.toHex(nonce),
                                    data: data  
                                };

                                let privateKey = EthereumjsUtil.toBuffer(key, 'hex');
                                // let privateKey = key;

                                const tx = new EthereumTx(rawTx);

                                tx.sign(privateKey);

                                let serializedTx = tx.serialize();

                                web3.eth.sendRawTransaction("0x" + serializedTx.toString('hex'), function(err, hash) {
                                    console.log("hash:", hash);
                                    Output(window.outputElement, 'small', 'red', `[TransactionHash]:${hash}`);
                                });
                            } else {
                                Output(window.outputElement, 'small', 'red', error);
                            }
                        });
                    } else {
                        Output(window.outputElement, 'small', 'red', error);
                    }
                });
        });
    }

    get(_index) {
        let contractInstance = web3.eth.contract(this[constractAbi]).at(this[constractAddress]);

        // estimate gas
        contractInstance.get.estimateGas(_index,
            function(error, result) {
                if(!error) {
                    //alert(result);
                    // set
                    contractInstance.get(_index, {gas: result},
                        function(error, result) { 
                            if(!error) {
                                Output(window.outputElement, 'small', 'red', `[Data]:${result}`);
                            } else {
                                Output(window.outputElement, 'small', 'red', error);
                            }
                        });
                } else {
                    Output(window.outputElement, 'small', 'red', error);
                }
            });
    }
}