/*
Copyright (c) 2018 ZSC Dev Team
*/

//class zscWallet
function ZSCTemplate(nm, abi, adr) {
    this.userName = nm;
    this.userType;
    this.tmpNos = 0;
    this.tmpNames = [];
    this.tmpChildrenNos = [];
    this.account = web3.eth.accounts[0];
    this.contractAdr = adr;
    this.contractAbi = JSON.parse(abi);
    this.gasPrice = bF_getGasPrice();
    this.gasLimit = bF_getGasLimit(700);
}

ZSCTemplate.prototype.getUserName = function() {return this.userName;}

ZSCTemplate.prototype.getTmpName = function(index) { return this.tmpName[index];}

ZSCTemplate.prototype.setUserType = function(type) {this.userType = type;}

ZSCTemplate.prototype.loadTempates = function(func) {
    var gm = this;
    var callBack = func;
    var myControlApi = web3.eth.contract(gm.contractAbi).at(gm.contractAdr);

    gm.numTemplates(gm, function(gm) {
        if (gm.tmpNos == 0) {
            callBack();
        } else {
            for (var i = 0; i < gm.tmpNos; ++i) {
                gm.getTmpNameByIndex(gm, i, function(gm, j){
                    gm.numTmpChildrenNos(gm, j, function(gm, index) {
                        if (index == gm.tmpNos - 1) {
                            callBack();
                        }
                    });
                });
            }
        }
    });
}

ZSCTemplate.prototype.numTemplates= function(gm, func) {
    var callBack = func;
    var myControlApi = web3.eth.contract(gm.contractAbi).at(gm.contractAdr);

    myControlApi.numTemplates(gm.userName,
        {from: gm.account},
        function(error, result){ 
            if(!error) {
                gm.tmpNos = result.toString(10);
                callBack(gm);
            } else {
                console.log("error: " + error);
            }
        });
}

ZSCTemplate.prototype.getTmpNameByIndex = function(gm, index, func) {
    var callBack = func;
    var myControlApi = web3.eth.contract(gm.contractAbi).at(gm.contractAdr);
    
    myControlApi.getTemplateNameByIndex(gm.userName, index,
        {from: gm.account},
        function(error, result){ 
            if(!error) {
                gm.tmpNames[index] = web3.toUtf8(result);
                func(gm, index);
            } else {
                console.log("error: " + error);
            }
        });
}

ZSCTemplate.prototype.numTmpChildrenNos = function(gm, index, func) {
    var callBack = func;
    var myControlApi = web3.eth.contract(gm.contractAbi).at(gm.contractAdr);
    
    myControlApi.numElementChildren(gm.userName, gm.tmpNames[index],
        {from: gm.account},
        function(error, result){ 
            if(!error) {
                gm.tmpChildrenNos[index] = result.toString(10);
                func(gm, index);
            } else {
                console.log("error: " + error);
            }
        });
}

/* zsc API:
   function createElement(bytes32 _userName, uint _typeInUint, bytes32 _enName, bytes32 _extraInfo, address _extraAdr) public returns (address) 
*/

ZSCTemplate.prototype.creatNewTemplate = function(logId, func) {
    var gm = this;
    var callBack = func;
    var myControlApi = web3.eth.contract(gm.contractAbi).at(gm.contractAdr);

    var tmpName = gm.userName + "-tmp-" + this.tmpNos
    
    //createElement(bytes32 _userName, bytes32 _factoryType, bytes32 _enName, bytes32 _extraInfo, address _extraAdr) public returns (address) {
    myControlApi.createElementNode("template", gm.userName, tmpName, "null", 
        {from: gm.account, gasPrice: gm.gasPrice, gas: gm.gasLimit},
        function(error, result){ 
            if(!error) {
                bF_showHashResult(logId, result, callBack);
            } else {
                console.log("error: " + error);
            }
        });
}

ZSCTemplate.prototype.enableAsAgreement = function(tmpIndex, func) {
    var gm = this;
    var callBack = func;
    var myControlApi = web3.eth.contract(gm.contractAbi).at(gm.contractAdr);

    var agrName = gm.tmpNames[tmpIndex] + "-agr-" + gm.tmpChildrenNos[tmpIndex];
    var extra = gm.tmpNames[tmpIndex];

    //createElementNode(bytes32 _factoryType, bytes32 _userName, bytes32 _enName, bytes32 _extraInfo, address _extraAdr) public returns (address) {
    myControlApi.createElementNode("agreement", gm.userName, agrName, extra,
        {from: gm.account, gasPrice: gm.gasPrice, gas: gm.gasLimit},
        function(error, result){ 
            if(!error) {
                bF_showHashResult("CreateNewAgreementHash", result, callBack);
            } else {
                console.log("error: " + error);
            }
        });
}
