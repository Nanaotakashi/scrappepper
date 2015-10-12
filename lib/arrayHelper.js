// Convert the Xml Entities to punctuation
var sanitizeHtml  = require('sanitize-html')
  , _ = require('lodash');
var entities_ 	  = require('entities');         // encode & decode XML/HTML entities with ease
var Entities      = require('html-entities').AllHtmlEntities
  , entities      = new Entities();
var strRegex = require("../maps/strRegex.json")
  , htmlTagRegax = require("../maps/htmlTagRegax.json")
  , packageConfig = require("../package.json");


// Declar what functions and variables as the public sharing to external caller(s).
exports.arrayDividend           = arrayDividend;
exports.arrayChunk              = arrayChunk;
exports.arrayMode               = arrayMode;
exports.arrayRemoveByValue      = arrayRemoveByValue;

function arrayChunk( dataArray, counter ) {
  // Get the name of current function
	var ownName = getCurrentFunctName(arguments.callee);
  var result = [];

  if ( _.isEmpty(dataArray) ) {
    console.log('['+packageConfig.name+'.'+ownName+'()] found error : "dataArray" should not null or empty.');
    console.log(dataArray);
    return false;
  }
  if ( counter <= 0 ) {
    console.log('['+packageConfig.name+'.'+ownName+'()] found error : "counter" should not equal to OR smaller than 0');
    console.log(counter);
    return false;
  }

  for ( i=0,j=dataArray.length; i<j; i+=counter ) {
    result = dataArray.slice(i,i+counter);
  }
  return result;
}

function arrayMode(array)
{
    if (array.length == 0)
    	return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for (var i = 0; i < array.length; i++)
    {
    	var el = array[i];
    	if (modeMap[el] == null)
    		modeMap[el] = 1;
    	else
    		modeMap[el]++;
    	if (modeMap[el] > maxCount)
    	{
    		maxEl = el;
    		maxCount = modeMap[el];
    	}
    }
    return maxEl;
}

function arrayDividend( fullArray, partitionString ) {
  // Get the name of current function
	var ownName = getCurrentFunctName(arguments.callee);

	if ( !_.isEmpty(fullArray) ) {

    if ( partitionString == null || partitionString == '' ) { var partitionString = arrayMode(fullArray); }
    var outerArray = [];
    var innerArray = [];
    for (var i = 0; i < fullArray.length; i++) {

      if ( fullArray[i] != partitionString) {
        if ( !_.isEmpty(fullArray[i]) ) {
          if ( i !== fullArray.length-1 ) {
            innerArray.push( fullArray[i] );
          } else {
            // console.log(innerArray)
            innerArray = [];
            innerArray.push( fullArray[i] );
            outerArray.push( innerArray );
          }
        }
      } else {
        outerArray.push(innerArray);
        innerArray = [];
      }
    }
    return outerArray;
	} else {
		console.log('['+packageConfig.name+'.'+ownName+'()] found error : the fullArray is empty.');
		console.log('fullArray = ' + fullArray);
	}
}

function arrayRemoveByValue( array, value ) {
  for(var i = array.length - 1; i >= 0; i--) {
    if(array[i] === value) {
       array.splice(i, 1);
    }
  }
  return array;
}

function getCurrentFunctName( calleeInfo ) {
	// Normally the calleeInfo should be called from other function with the "arguments.callee" as the arguments / parameters to this function.
	var fullScript = calleeInfo.toString();
  var ownName = fullScript.substr('function '.length);        // trim off "function "
  ownName = ownName.substr(0, ownName.indexOf('('));        // trim off everything after the function name
	return ownName;
}
