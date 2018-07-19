#!/usr/bin/env node
const parser= require('solidity-parser-antlr');
const Web3 = require("web3");
const web3 = new Web3(Web3);
const fs = require('fs');
const asciiTable = require('ascii-table');


if(process.argv.length < 3) {
  console.log("Error: Missing argument for sol file to scan");
  process.exit(1);
}
var target = process.argv[2];


var content = fs.readFileSync(target, 'UTF-8');
contract = parser.parse(content);


var table = new asciiTable(target);
table.setHeading('Contract', 'Function Proto', 'Selector','Visibility', 'StateMut', 'Returns', 'Modifiers');

contract.children.forEach(function(c){
	if (c.type == "ContractDefinition" ) {

		if (c.baseContracts.length){
			var bs = "is "+parseBase(c.baseContracts).join(',');
		}

		table.addRow(c.name, null, null, null, null, null, bs);
		c.subNodes.forEach(function(f) {
			if(f.type == 'FunctionDefinition'){
				var ff = parseFunction(c,f);
				table.addRow(ff.contract, ff.funcProto, ff.selector, ff.visibility, ff.state, ff.returns, ff.modifiers);
			}
		})
	}
})


console.log(table.toString());

function parseFunction(contract, func){
	var cName  = contract.name;
	var params = [];
	var retparams = [];
	var funcProto = "";
	var selector = "";
	var modifiers = [];

	if(func.isConstructor == true){
		funcName = "constructor";
	}
	else{
		funcName = func.name;
	}
	ps =  func.parameters.parameters;
	params = parseParameter(ps);

	funcProto = funcName + "(" + params.join(',') + ")";

	if (funcProto != "()" && !funcProto.startsWith("constructor")){
		selector = web3.sha3(funcProto).substring(2,10);
	}

	rets =  func.returnParameters;
	if( rets){
		retparams = parseParameter(rets.parameters);
	}


	rets = retparams.join(',');


	if(func.modifiers){
		func.modifiers.forEach(function(m){
			modifiers.push(m.name)
		})
	}


  return {
    contract:   cName,
    funcProto:   funcProto,
    selector: selector,
    visibility: func.visibility,
    state:   func.stateMutability,
    returns:    rets==''?"null":rets,
    modifiers:  modifiers.join(',')
  }
}



function parseParameter(ps){
	var params= [];
	if( ps!=null && ps.length ){
		ps.forEach(function(param) {
			var tname = param.typeName;

			if (tname.type == 'ElementaryTypeName'){
				if( tname.name == "uint"){
					params.push("uint256");
				}
				else{
					params.push(tname.name);
				}
			}else{
				if (tname.type == 'ArrayTypeName'){
					if( tname.baseTypeName.name == "uint"){
						params.push("uint256[]");
					}
					else{
						params.push(tname.baseTypeName.name+"[]");
					}
				}
			}


		})

	}
	return params;

}

function parseBase(baseCs){
	var bs=[];
	baseCs.forEach( function(b) {
		bs.push(b.baseName.namePath);
	})
	return bs;
}


