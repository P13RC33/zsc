<?php
/*
Copyright (c) 2018, ZSC Dev Team
*/
?>

<?php

include("zsc_system_modules.php");

class ZscHtmlModules extends ZscSystemModules {
    public function __construct(){
        parent::__construct();
    }

    public  function __destruct() {
    }

    public function loadHeader() {
        $databaseAdr = "dddd";
        $text='<br><br>
        <div align="center">
        <table align="center" style="width:400px;min-height:30px">
           <tr>
            <td align="center"><a href="adm_create_contract.php">Create contract</a></td>
            <td align="center"><a href="adm_configure_logrecorder.php">Configure LogRecorder</a></td>
            <td align="center"><a href="adm_control_apis_adv.php">Control system</a></td>
            <td align="center"><a href="adm_manage_users.php">Users</a></td>
            <td align="center"><a href="adm_templates.php">Templats</a></td>
            <td align="center"><a href="adm_agreements.php">Templats</a></td>
          </tr>
        </table>
        </div>';
        return $text;
    }
    
    public function loadScriptFiles() {
        $text = '
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    
        <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="../WebClient/web3.js/dist/web3.js"></script>
        <script type="text/javascript" src="../WebClient/web3js.js"></script>
        <script type="text/javascript" src="./js/createContract.js"></script>
        <script type="text/javascript" src="./js/setupFunctions.js"></script>
        <script type="text/javascript" src="./js/zsc_user_management.js"></script>
        <script type="text/javascript" src="./js/compiled_database.js"></script>
        <script type="text/javascript" src="./js/compiled_factory_pro.js"></script>
        <script type="text/javascript" src="./js/compiled_apis_adv.js"></script>
        <script type="text/javascript" src="./js/compiled_adm_adv.js"></script>
        <script type="text/javascript" src="./js/compiled_wallet_manager.js"></script>
        <script type="text/javascript" src="./js/compiled_loger.js"></script>';
        return $text;
    }
    
    public function loadAllAdrs() {
        $modules = ZscBase::getModuleArray();
        $num = count($modules);

        $text  = '<div class="well">';
        for ($x = 0; $x < $num; $x++) {
            $name = $modules[$x];
            $text .=    '<text id = "'.$name.'Adr">'.$name.' address: '.parent::readModuleAddress($name).'</text> <br>';
        }
        $text .= '</div>';

        /*
        $text = '<div class="well">
            <text id = "LogRecorderAdr">LogRecorder address: '.parent::readModuleAddress("LogRecorder").'</text> <br>   
            <text id = "AdmAdvAdr">LogRecorder address: '.parent::readModuleAddress("LogRecorder").'</text> <br>                                   
            <text id = "DBDatabaseAdr">DBDatabase address: '.parent::readModuleAddress('DBDatabase').'</text> <br>                   
            <text id = "FactoryProAdr">FactoryPro address: '.parent::readModuleAddress('FactoryPro').'</text> <br>               
            <text id = "FactoryTmpAdr">FactoryTmpAdr address: '.parent::readModuleAddress('FactoryTmp').'</text> <br>               
            <text id = "FactoryAgrAdr">FactoryAgrAdr address: '.parent::readModuleAddress('FactoryAgr').'</text> <br>               
            <text id = "ControlApisAdvAdr">ControlApis address:'.parent::readModuleAddress('ControlApisAdv').'</text>               
        </div>';
        */
        return $text;
    }

    public function loadZscTokenAddress($func) {
        $text = '';
        $text .= '<text>Fill in ZSC token address </text>';
        $text .= '<input type="text" id="zscTokenAddress"></input>'
        $text .= '<button type="button" onClick="'.$func.'(\'zscTokenAddress\')">Confirm</button> <br>';
        return $text;
    }
    
    public function loadCreateContract($func) {
        $modules = ZscBase::getModuleArray();
        $num = count($modules);

        $text = '';
        for($x = 0; $x < $num; $x++) {
            $name = $modules[$x];
            $text .= '<text>Step - '.$x.': Create '.$name.'</text>';
            $text .= '<div class="well">';
            $text .= '   <text> Name: </text>';
            $text .= '   <input type="text" id="'.$name.'Name" value = "zsc_'.$name.'"></input>';
            $text .= '   <button type="button" onClick="'.$func.'(\''.$name.'\',\''.$name.'Name\')">Create</button> <br>';
            $text .= '   <text id="'.$name.'Log"></text> <br>';
            $text .= '</div>';
        }
        return $text;
    }
    
    public function loadRegisterLogRecorderHtml($func) {
        $logedModules = ZscBase::getLogedModuleArray();
        $num = count($logedModules);
    
        $text = '<div class="well">';
    
        for($x = 0; $x < $num; $x++) {
            $name = $logedModules[$x];
            //<button type="button" onClick="registerToLogRecorder('AdmAdv','RegisterAdmAdvHash')">Register AdmAdv</button> 
            $text .= '<button type="button" onClick="'.$func.'(\''.$name.'\',\'Register'.$name.'Hash\')">Register '.$name.'</button>';
            //<text id="SetLogAdmAdvHash"></text><br> <br>
            $text .= '<text id="Register'.$name.'Hash"></text> <br> <br>';
        }
    
        $text .= '</div>';
    
        return $text;
    }

    public function loadSetLogRecorderHtml($func) {
        $logedModules = ZscBase::getLogedModuleArray();
        $num = count($logedModules);
    
        $text = '<div class="well">';
    
        for($x = 0; $x < $num; $x++) {
            $name = $logedModules[$x];
            //<button type="button" onClick="setLogRecorderToListener('AdmAdv','SetLogAdmAdvHash')">Set Loger to DBDatabase</button> 
            $text .= '<button type="button" onClick="'.$func.'(\''.$name.'\',\'SetLog'.$name.'Hash\')">SetLog '.$name.'</button>';
            //<text id="SetLogAdmAdvHash"></text><br> <br>
            $text .= '<text id="SetLog'.$name.'Hash"></text> <br> <br>';
        }
    
        $text .= '</div>';
    
        return $text;
    }

    public function loadInitModules($func) {
        $modules = array("AdmAdv", "PosAdv", "WalletManager", "DBDatabase", "FactoryPro", "FactoryRec", "FactoryTmp", "FactoryAgr", "ControlApisAdv", "ControlApisAdv", "ControlApisAdv", "ControlApisAdv", "ControlApisAdv", "ControlApisAdv", "ControlApisAdv", "ControlApisAdv"); 
        $extraInfo = array("null",  "null",  "null",         "null",        "null",       "null",       "null",       "null",      "WalletManager",    "DBDatabase",     "AdmAdv",            "PosAdv",        "FactoryPro",     "FactoryRec",       "FactoryTmp",   "FactoryAgr");

        $num = count($modules);
    
        $text = '';
    

        for($x = 0; $x < $num; $x++) {
            $name = $modules[$x];
            $extra = $extraInfo[$x];
            $hashId = $name.'Hash'.$x;
            $action = '';
            $object = '';
            if ($extra == "null") {
                $action = "Init ";
                $object = $name;
            } else {
                $action = "Set ";
                $object = $extra;
            }
            /*
            <text>Step - 1 </text>
            <button type="button" onClick="initSystemModule('DBDatabase', 'null','DBDatabaseHash')">Init DBDatabase</button> 
            <text id="DBDatabaseHash"></text><br>
            */
            $text .= '<text>Step - '.($x+1).' </text>';
            $text .= '<button type="button" onClick="'.initSystemModule.'(\''.$name.'\', \''.$extra.'\',\''.$hashId.'\')">'.$action.$object.'</button>';
            $text .= '<text id="'.$hashId.'"></text><br><br>';
        }
    
        return $text;
    }
}
?>

