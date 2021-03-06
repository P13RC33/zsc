/*
Copyright (c) 2018 ZSC Dev Team
*/

//class zscElement
function ZSCElement(acount, controlApisAdvAdr, controlApisAdvAbi) {
    this.parameNos = 0;
    this.ethBalance = 0;
    this.nodeAddress = 0;
    this.parameterNames = [];
    this.parameterValues = [];
    this.nameTags = [];
    this.valueTags = [];
    this.account = acount;
    this.contractAdr = controlApisAdvAdr;
    this.contractAbi = JSON.parse(controlApisAdvAbi);
    this.gasPrice = bF_getGasPrice();
    this.gasLimit = bF_getGasLimit();
}

ZSCElement.prototype.setElementName = function(nm) { this.enName = nm;}
ZSCElement.prototype.getElementName = function() { return this.enName;}
ZSCElement.prototype.getParaNos = function() { return this.parameNos;}
ZSCElement.prototype.getParaName = function(index) { return this.parameterNames[index];}
ZSCElement.prototype.getParaValue = function(index) { return this.parameterValues[index];}

ZSCElement.prototype.resetAllNameTags = function(gm) {
    for (var i = 0; i < gm.parameNos; ++i) {
        gm.nameTags[i] = false;
    }
}

ZSCElement.prototype.checkAllNameTags = function(gm) {
    for (var i = 0; i < gm.parameNos; ++i) {
        if (gm.nameTags[i] == false) {
            return false;
        }
    }
    return true;
}

ZSCElement.prototype.resetAllValueTags = function(gm) {
    for (var i = 0; i < gm.parameNos; ++i) {
        gm.valueTags[i] = false;
    }
}

ZSCElement.prototype.checkAllValueTags = function(gm) {
    for (var i = 0; i < gm.parameNos; ++i) {
        if (gm.valueTags[i] == false) {
            return false;
        }
    }
    return true;
}

ZSCElement.prototype.doesElementExisit = function(func) {
    var gm = this;
    var callBack = func;
    var myControlApi = web3.eth.contract(gm.contractAbi).at(gm.contractAdr);

    myControlApi.doesElementExist(gm.enName, 
        function(error, ret){ 
            if(!error) callBack(ret);  
            else  console.log("error: " + error);
        });
}

ZSCElement.prototype.loadParameterNamesAndvalues = function(func) {
    var gm = this;
    var callBack = func;

    gm.numParameters(gm, function() {
        gm.resetAllNameTags(gm);
        gm.resetAllValueTags(gm);
        gm.loadParameterNames(gm, function(gm) {
            gm.loadParameterValues(gm, function(gm, index){
                callBack();
            });
        }); 
    });
}

ZSCElement.prototype.numParameters = function(gm, func) {
    var gm = this;
    var callBack = func;
    var myControlApi = web3.eth.contract(gm.contractAbi).at(gm.contractAdr);

    myControlApi.numElementParameters(gm.enName, 
        {from: gm.account},
        function(error, num){ 
            if(!error) { 
                gm.parameNos = num.toString(10); 
                callBack(gm);
            } else {
                console.log("error: " + error);
            }
         });
}

ZSCElement.prototype.loadParameterNames = function(gm, func) {
    var callBack = func;
    var myControlApi = web3.eth.contract(gm.contractAbi).at(gm.contractAdr);

    for (var i = 0; i < gm.parameNos; ++i) {
        gm.loadParameterNameByIndex(gm, i, function(index, para) {
            gm.parameterNames[index] = para;
            gm.nameTags[index] = true;
            if (gm.checkAllNameTags(gm)) {
                callBack(gm, index);
            }
        });
    } 
} 

ZSCElement.prototype.loadParameterNameByIndex = function(gm, index, func) {
    var callBack = func;
    var myControlApi = web3.eth.contract(gm.contractAbi).at(gm.contractAdr);

    myControlApi.getElementParameterNameByIndex(gm.enName, index, 
        {from: gm.account},
        function(error, para){ 
            if(!error) {
                var ret = web3.toUtf8(para);
                func(index, ret);  
            } else { 
                console.log("error: " + error);
            }
        });
}

ZSCElement.prototype.loadParameterValues = function(gm, func) {
    var callBack = func;
    for (var i = 0; i < gm.parameNos; ++i) {
        gm.loadParameterValueByIndex(gm, i, function(gm, index) {
            if (gm.checkAllValueTags(gm)) {
                callBack(gm, index);
            }
        });
    } 
} 

ZSCElement.prototype.loadParameterValueByIndex = function(gm, index, func){ 
    var callBack = func;
    var myControlApi = web3.eth.contract(gm.contractAbi).at(gm.contractAdr);

    myControlApi.getElementParameter(gm.enName, gm.parameterNames[index], 
        {from: gm.account},
        function(error, value){ 
            if(!error) {
                gm.parameterValues[index] = web3.toUtf8(value);
                gm.valueTags[index] = true;
                callBack(gm, index);
            } else { 
                console.log("error: " + error);
            }
        });
}


ZSCElement.prototype.setElementParameter = function(logID, func) {
    var gm = this;
    var callBack = func;
    var myControlApi = web3.eth.contract(gm.contractAbi).at(gm.contractAdr);

    var info = "";
    var count = 0;

    for (var i = 0; i < gm.parameNos; ++i) {
        var value = document.getElementById(gm.parameterNames[i]).value;
        if (value != gm.parameterValues[i]) {
            count ++;
            gm.parameterValues[i] = value;

            info += "{<" + gm.parameterNames[i] + ">" + "<" + value + ">}";
        }
    }

    if (count > 0) {
        myControlApi.setElementMultipleParameters(gm.enName, info,  
            {from: gm.account, gasPrice: gm.gasPrice, gas: gm.gasLimit},
            function(error, result){ 
                if(!error) bF_showHashResult(logID, result, callBack);
                else console.log("error: " + error);
        });
    }
} 



