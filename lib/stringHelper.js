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
exports.strConvert              = convertString;
exports.strContain              = strContain;
exports.strSanitized            = strSanitized;
// exports.strClassify             = strClassify;
exports.strClassify2Arr         = strClassify2Arr;

// using example : var str = JSON.stringify(body, null, 2); // spacing level = 2
// function syntaxHighlight(json) {
// Get the name of current function
// var ownName = getCurrentFunctName(arguments.callee);
//     if (typeof json != 'string') {
//          json = JSON.stringify(json, undefined, 2);
//     }
//     json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
//     return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
//         var cls = 'number';
//         if (/^"/.test(match)) {
//             if (/:$/.test(match)) {
//                 cls = 'key';
//             } else {
//                 cls = 'string';
//             }
//         } else if (/true|false/.test(match)) {
//             cls = 'boolean';
//         } else if (/null/.test(match)) {
//             cls = 'null';
//         }
//         return '<span class="' + cls + '">' + match + '</span>';
//     });
// }

function convertString(str) {
	var result = '';
	for (var i = str.length; i > -1 ; i--) {
    result = result + str.charAt(i);
	}
  return result;
}

/*
* Still in-progress
*/
function strClassify( targetedString, regexType ) {

  // Get the name of current function
	var ownName = getCurrentFunctName(arguments.callee);
  /*
   * A simple way to check for HTML strings or ID strings
   */
  // var quickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/;
  // // Run the regex
  // var match = quickExpr.exec(str);
	targetedString = targetedString.trim();
  var patt = new RegExp(strRegex.url);
  var res = patt.exec(targetedString);
  console.log('res = '+res );
  // if (targetedString && regexType) {
  //
  //   var result = [],
  //   splitedString = targetedString.split(spliter),
	// 	regex = {
	// 		email: new RegExp(strRegex.email),
	// 		web: new RegExp(strRegex.url),
	// 		tel: new RegExp(strRegex.tel)
	// 	};
	// 	// string in new RegExp should be without "/" in the beginnings and ends
  //   for (var i = 0; i < splitedString.length; i++) {
  //     var temp = '';
  //     switch (regexType) {
  //       case 'email':
  //         temp = splitedString[i].match(regex.email, "ig");
  //         break;
  //       case 'url':
  //       case 'website':
  //       case 'hyperlinks':
  //         temp = splitedString[i].match(regex.url, "ig");
  //         break;
  //       case 'html5':
  //         temp = splitedString[i].match(htmlTagRegax.html5, "ig");
  //         break;
  //       case 'tel':
  //       case 'phone':
  //         temp = splitedString[i].match(/(\(([0-9]{2,3})\)?([ .-]?)([0-9]{0,12}))/);
  //         break;
  //       default:
  //         // console.log('['+packageConfig.name+'.'+ownName+'()] found error : No suitable Regex Type inputted, please check.');
  //         break;
  //     }
  //     if ( !_.isEmpty(temp) ) { result = result.concat( temp[0] ); };
  //   }
  //
  //   return result;
  //
  // } else {
  //   return false;
  // }
}

function strClassify2Arr( targetedString, regexType, spliter ) {

  if ( _.isEmpty(spliter) ) { spliter = ' '; }
  // Get the name of current function
	var ownName = getCurrentFunctName(arguments.callee);
  /*
   * A simple way to check for HTML strings or ID strings
   */
  // var quickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/;
  // // Run the regex
  // var match = quickExpr.exec(str);
	targetedString = targetedString.trim().replace(new RegExp(htmlTagRegax.br), ' ');
  if (targetedString && regexType) {

    var result = []
      , splitedString = targetedString.split(spliter);

    var regex = {
			email: new RegExp(strRegex.email),
			web: new RegExp(strRegex.url),
			// tel: new RegExp(strRegex.tel)
		  };
		// string in new RegExp should be without "/" in the beginnings and ends
    for (var i = 0; i < splitedString.length; i++) {
      var temp = '';
      switch (regexType) {
        case 'email':
          temp = splitedString[i].match(regex.email, "ig");
          break;
        case 'url':
        case 'website':
          if ( !strContain(splitedString[i], '@') ) { temp = splitedString[i].match(regex.web, "ig"); }
          break;
        case 'html5':
          temp = splitedString[i].match(htmlTagRegax.html5, "ig");
          break;
        // case 'tel':
        // case 'phone':
        //   temp = splitedString[i].match(/(\(([0-9]{2,3})\)?([ .-]?)([0-9]{0,12}))/);
        //   break;
        default:
          console.log('['+packageConfig.name+'.'+ownName+'()] found error : No suitable Regex Type inputted, please check.');
          break;
      }
      if ( !_.isEmpty(temp) ) { result = result.concat( temp[0] ); };
    }

    return result;

  } else {
    console.log('['+packageConfig.name+'.'+ownName+'()] found error : Please ensure the targetedString & regexType inputted with correct values.');
    return false;
  }
}

function strContain( fullString, comparingString ) {
  // Get the name of current function
	var ownName = getCurrentFunctName(arguments.callee);

	if ( typeof fullString === 'string' && typeof comparingString === 'string') {
		if ( fullString.indexOf(comparingString) > -1 ) {
			return true;
		} else {
			return false;
		}
	} else {
		console.log('['+packageConfig.name+'.'+ownName+'()] found error : the input / comparingString may not in type of String.');
		console.log('input = ' + fullString);
		console.log('comparingString = ' + comparingString);
	}
}

function strSanitized( obj ) {
  // Get the name of current function
	var ownName = getCurrentFunctName(arguments.callee);

	// Remove useless tags by list of allowedTags
  // 'strong'
	var allowedTagsObj = {
				allowedTags: ['h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'ul', 'ol', 'nl', 'li', 'strike', 'code', 'hr', 'br', 'div', 'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre']
			};

  if (obj) {
    return sanitizeHtml(entities.decode(obj), allowedTagsObj).replace(/&amp;/ig, "&").replace(/&#xB0;/ig, '°').trim();
  } else {
    return null;
  }
}

function getCurrentFunctName( argumentsCalleeInfo ) {
	// Normally the argumentsCalleeInfo should be called from other function with the "arguments.callee" as the arguments / parameters to this function.
	var fullScript = argumentsCalleeInfo.toString();
  var ownName = fullScript.substr('function '.length);        // trim off "function "
  ownName = ownName.substr(0, ownName.indexOf('('));        // trim off everything after the function name
	return ownName;
}
