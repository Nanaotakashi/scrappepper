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

  ```
    var pepper = require('scrappepper');
  ```

  **generateCsv( json, exportFileConfig)**
  ```
    Function(s) : export to the CSV file

    [ Simply use ]
    var exportFileConfig = { exportFullPath: 'exports/bigdata.csv' };
    pepper.generateCsv(results, exportFileConfig);

    [ Advanced use ]
    var exportFileConfig = {
      exportFullPath: 'exports/bigdata.csv',
      fields: [] / [ANY fieldnames u liked, but should matched with the key(s) in JSON!!],
      exportFullPath: string,
      nested: true
    }
    pepper.generateCsv(results, exportFileConfig);

    **NOTE**
    fields: if valued as [], function will grap the json data structure by ownself.
    nested: defaulted as true.
  ```

  **arrayChunk( array, counter );**

  ```
    Function(s) : Chunk 1D-array by counter, and returns 2D-array

    **NOTE**
    array: 1D-array
    counter: number of values your want to group with and put them on the 2nd level array.
  ```

  **arrayDividend( array, partitionString )**

  ```
    Function(s) : Also return 2D-array, but the 1D-array chunked by the indication of "partitionString".

    [ Simply use ]
    var array = ['abc', 'def', 'partition', 'asdfaf', 'partition', 'akdslkasnm', 'mkljtor']
    console.log( pepper.arrayDividend( array, 'partition' ) );

    RESULT >>
    [ ['abc', 'def'], ['asdfaf'], ['akdslkasnm', 'mkljtor'] ]
  ```

  **arrayMode( array )**

  ```
    Function(s) : Return the most frequent / mode value (string)

    [ Simply use ]
    var array = ['abc', 'def', 'partition', 'asdfaf', 'partition', 'akdslkasnm', 'mkljtor']
    console.log( pepper.arrayMode(array) );

    RESULT >>
    'partition'
  ```

  **arrayRemoveByValue( array, value )**

  ```
    Function(s) : Remain all array, except the value.

    [ Simply use ]
    var arr = ['a', 'b', 'c', 'd', 'a'];
    console.log( pepper.arrayRemoveByValue(arr , 'a') );

    RESULT >>
    [ 'b', 'c', 'd' ]
  ```

    **strConvert( string )**

  ```
    Function(s) : Convert all sequence of characters

    [ Simply use ]
    console.log( pepper.strConvert('abc') );

    RESULT >>
    'cba'
  ```

    **strContain( fullString, comparingString )**

  ```
    Function(s) : Return ture or false

    [ Simply use ]
    console.log( pepper.strContain('abc', 'a') );
    console.log( pepper.strContain('abc', 'd') );

    RESULT >>
    true
    false
  ```

    **strSanitized( str )**

  ```
    Function(s) : Remove some weird xml entitles and useless HTML tags.

    [ Simply use ]
    console.log( pepper.strSanitized('<strong>abc &amp; laksj</strong>') );

    RESULT >>
    'abc & laksj'
  ```

    **strClassify2Arr( targetedString, regexType, spliter )**

  ```
    Function(s) : Get the string, return the array after the regexType classification.

    [ Simply use ]
    var str = 'abc ald@gmail.com akjs13 ask@gmail.com 123123';
    console.log( pepper.strClassify2Arr(str, 'email', ' ') );

    RESULT >>
    ['ald@gmail.com', 'ask@gmail.com']

    **NOTE**
    regexType: 'email' / 'url' / 'website'
    spliter: default as ' '
  ```

## Release History
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
