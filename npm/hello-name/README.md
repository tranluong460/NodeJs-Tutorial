# hello-name
A simple Node.js package that greets users by name.

## Installation 
npm install hello-name install from a local tarball
npm install ./hello-name-1.0.0.tgz

# Usage 
const {hello} = require('hello-name');
console.log(hello("World"));
console.log(hello("May"));

### `hello-name`
Return a greeting message

-**Parameters:**
    -`name`(string): The name to greet
-**Return:**(string) A greeting message in the format "Hello, {name}!"

## License