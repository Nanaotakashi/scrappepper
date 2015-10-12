var json2csv = require('json2csv')
	,	_ = require('lodash')
	,	fs = require('fs');
var packageConfig = require("../package.json");

// Declar what functions and variables as the public sharing to external caller(s).
exports.generateCsv = generateCsv;
// exports.generateExcel =  // under-development

// module-level variables
// __filename = "/Users/pradatorG/workspace/megaexpo/webscrapping/node_modules/scrappepper/lib/json2File.js"
// __dirname = "/Users/pradatorG/workspace/megaexpo/webscrapping/node_modules/scrappepper/lib"

/*
* fileConfig = {
* [fields: array],
* [fields_default: defaulted as string 'dynamic', or string 'static'], **'dynamic': according to the json data structure && 'static': fully following the "fields" array value.
* [exportFullPath: string],
* [nested: defaulted as true value]
* };
*/
function generateCsv(jsonToExport, fileConfig) {

	// some defaulted value if null / empty
	if ( _.isEmpty(fileConfig.nested) ) { fileConfig.nested = true }
	// if ( _.isEmpty(fileConfig.fields_default) ) { fileConfig.fields_default = 'dynamic'}
	if ( _.isEmpty(fileConfig.fields) ) {
		fileConfig.fields_default = 'dynamic';
	} else {
		fileConfig.fields_default = 'static';
	}

	// Get the name of current function
	var ownName = getCurrentFunctName(arguments.callee);

	// according to fileConfig.fields_default value to default the fileConfig.fields value.
	switch (fileConfig.fields_default) {
		case 'dynamic':
			fileConfig.fields = getObjKeys(jsonToExport);
			break;
		case 'static':
			if ( _.isEmpty(fileConfig.fields) )
			{
				console.log('['+packageConfig.name+'.'+ownName+'()] found error : fileConfig.fields cannot be empty. (hint: Array value)');
			}
			break;
		default:
			console.log('['+packageConfig.name+'.'+ownName+'()] found error : fileConfig.fields_default has\'t defaulted correctly. (hint: "dynamic" / "static")');
			break;
	}

	if ( Object.prototype.toString.call(fileConfig.fields) === '[object Array]') {

		json2csv({ data: jsonToExport, fields: fileConfig.fields, nested: fileConfig.nested }, function(err, csv) {
			if (err) console.log(err);
			fs.writeFile(fileConfig.exportFullPath, csv, function(err) {
				if (err) throw err;
				if ( !_.isEmpty(fileConfig.fields) && !_.isEmpty(jsonToExport) ) {
					console.log(' *** ' + jsonToExport.length + ' Records found, the CSV file saved at path : ' + fileConfig.exportFullPath);
					console.log(' *** [ the fields: '+ fileConfig.fields.join(', ') +' ]');
				} else {
					if ( !_.isEmpty(fileConfig.fields) ) { console.log('['+packageConfig.name+'.'+ownName+'()] found error : fileConfig.fields is empty.'); }
					if ( !_.isEmpty(jsonToExport) ) { console.log('['+packageConfig.name+'.'+ownName+'()] found error : jsonToExport is empty.'); }
				}
			});
		});

	} else {
		console.log('['+packageConfig.name+'.'+ownName+'()] found error : Fields are empty, please input the fields for exporting CSV files.');
	}

}

function getObjKeys( jsonToExport ) {
	// Get the name of current function
	var ownName = getCurrentFunctName(arguments.callee);

	if ( Object.prototype.toString.call(jsonToExport) === '[object Array]') {
		var keys = [];
		for (var i = 0; i < jsonToExport.length; i++) {
			for(var k in jsonToExport[i]) {
				if ( !_.includes(keys, k) ) {
					keys.push(k);
				}
			}
		}
		return keys;
	} else {
		console.log('['+packageConfig.name+'.'+ownName+'()] found error : Array is null, empty or anormal format to collect the keys\' names ');
		return false;
	}
}

function getCurrentFunctName( argumentsCalleeInfo ) {
	// Normally the argumentsCalleeInfo should be called from other function with the "arguments.callee" as the arguments / parameters to this function.
	var fullScript = argumentsCalleeInfo.toString();
  var ownName = fullScript.substr('function '.length);        // trim off "function "
  ownName = ownName.substr(0, ownName.indexOf('('));        // trim off everything after the function name
	return ownName;
}
