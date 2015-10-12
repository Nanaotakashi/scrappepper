/*!
 * scrappepper
 * author: Gary Li @2015
 */

'use strict';

/**
 * Module dependencies.
 */

var stringHelper       = require("./stringHelper")
  , arrayHelper        = require("./arrayHelper")
  , jsonExportHelper   = require("./jsonExportHelper");

// module.exports = { stringHelper: require("./stringHelper")
//      , arrayHelper: require('.arrayHelper.js')
//      , jsonExportHelper: require("./jsonExportHelper")
//    };

// stringHelper
exports.strConvert = function( str ) {
 return stringHelper.strConvert( str );
}
exports.strContain = function( fullString, comparingString ) {
 return stringHelper.strContain( fullString, comparingString );
}
exports.strSanitized = function( str ) {
 return stringHelper.strSanitized( str );
}
// Still in-progress
// exports.strClassify = function( targetedString, regexType ) {
//  return stringHelper.strClassify( targetedString, regexType );
// }
exports.strClassify2Arr = function( targetedString, regexType, spliter ) {
 return stringHelper.strClassify2Arr( targetedString, regexType, spliter );
}

// arrayHelper
exports.arrayChunk = function( dataArray, counter ) {
 return arrayHelper.arrayChunk( dataArray, counter );
}
exports.arrayDividend = function( fullArray, partitionString ) {
  return arrayHelper.arrayDividend( fullArray, partitionString );
}
exports.arrayMode = function( array ) {
  return arrayHelper.arrayMode( array );
}
exports.arrayRemoveByValue = function( array, value ) {
  return arrayHelper.arrayRemoveByValue( array, value );
}

// jsonExportHelper
exports.generateCsv = function( results, config ) {
 jsonExportHelper.generateCsv( results, config);
}
