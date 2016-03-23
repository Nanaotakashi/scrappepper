<!-- wooden pepper grinders  -->

## Installation

  **Bash**
```
  $ npm install scrappepper
```

## Features

  * Friendly text, array manipulation (still under-developing)
  * Simplified file exporting : CSV file
  <!-- * Support the express server  (pending) -->
  * Scalable for applying on the webscrapping application development

## How to use
  **For JS,**

  ```js
    var pepper = require('scrappepper');
  ```

  **generateCsv( json, exportFileConfig )**

  __&#8226; Function(s):__ export to the CSV file

  __&#8226; fields:__ if valued as [], function will grap the json data structure by ownself.
  __&#8226; nested:__ defaulted as true.

  ```js
    // [ Simply use ]
    var exportFileConfig = { exportFullPath: 'exports/bigdata.csv' };
    pepper.generateCsv(results, exportFileConfig);

    // [ Advanced use ]
    var exportFileConfig = {
      exportFullPath: 'exports/bigdata.csv',
      fields: [], // OR [ANY fieldnames u liked, but should matched with the key(s) in JSON!!]
      nested: true
    }
    pepper.generateCsv(results, exportFileConfig);

  ```

  **arrayChunk( array, counter )**

  __&#8226; Function(s):__ Chunk 1D-array by counter, and returns 2D-array

  __&#8226; array__: 1D-array
  __&#8226; counter:__ number of values your want to group with and put them on the 2nd level array.

  **arrayDividend( array, partitionString )**

  __&#8226; Function(s):__ Also return 2D-array, but the 1D-array chunked by the indication of "partitionString".

  ```js
    // [ Simply use ]
    var array = ['abc', 'def', 'partition', 'asdfaf', 'partition', 'akdslkasnm', 'mkljtor']
    console.log( pepper.arrayDividend( array, 'partition' ) );

    // RESULT >>
    // [ ['abc', 'def'], ['asdfaf'], ['akdslkasnm', 'mkljtor'] ]
  ```

  **arrayMode( array )**

  __&#8226; Function(s):__ Return the most frequent / mode value (string)

  ```js
    // [ Simply use ]
    var array = ['abc', 'def', 'partition', 'asdfaf', 'partition', 'akdslkasnm', 'mkljtor']
    console.log( pepper.arrayMode(array) );

    // RESULT >>
    // 'partition'
  ```

  **arrayRemoveByValue( array, value )**

  __&#8226; Function(s):__ Remain all array, except the value.

  ```js
    // [ Simply use ]
    var arr = ['a', 'b', 'c', 'd', 'a'];
    console.log( pepper.arrayRemoveByValue(arr , 'a') );

    // RESULT >>
    // [ 'b', 'c', 'd' ]
  ```

  **strConvert( string )**

  __&#8226; Function(s):__ Convert all sequence of characters

  ```js
    // [ Simply use ]
    console.log( pepper.strConvert('abc') );

    // RESULT >>
    // 'cba'
  ```

  **strContain( fullString, comparingString )**

  __&#8226; Function(s):__ Return ture or false

  ```js
    // [ Simply use ]
    console.log( pepper.strContain('abc', 'a') );
    console.log( pepper.strContain('abc', 'd') );

    // RESULT >>
    // true
    // false
  ```

  **strSanitized( str )**

  __&#8226; Function(s):__ Remove HTML DOM entitles and decode the HTML names.

  ```js
    // [ Simply use ]
    console.log( pepper.strSanitized('<strong>abc &amp; laksj</strong>') );

    // RESULT >>
    // 'abc & laksj'
  ```

  **strClassify2Arr( targetedString, regexType, spliter )**

  __&#8226; Function(s):__ Get the string, return the array after the regexType classification.

  __&#8226; regexType:__ 'email' / 'url' / 'website'
  __&#8226; spliter:__ default as ' '  

  ```js
    // [ Simply use ]
    var str = 'abc ald@gmail.com akjs13 ask@gmail.com 123123';
    console.log( pepper.strClassify2Arr(str, 'email', ' ') );

    // RESULT >>
    // ['ald@gmail.com', 'ask@gmail.com']
  ```

## Release History
- **v0.0.9** *23 Mar 2016*
  - Update the Readme.md & 'stringHelper.strSanitized'
- **v0.0.7**, **v0.0.8** *12 Oct 2015*
  - Update the Readme.md & github ref
- **v0.0.4 ~ v0.0.6** *11 Oct 2015*
  - Update the Readme.md
- **v0.0.2**, **v0.0.3** *09 Oct 2015*
  - Update the Readme.md
- **v0.0.1**, *09 Oct 2015*
  - For "jsonExportHelper", added the function as below
    'generateCsv'
  - For "arrayHelper", added the functions as below
    'arrayChunk', 'arrayDividend', 'arrayMode', 'arrayRemoveByValue'
  - For "stringHelper", added the functions as below
    'strConvert ', 'strContain', 'strSanitized', 'strClassify2Arr'
