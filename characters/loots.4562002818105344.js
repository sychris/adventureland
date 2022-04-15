// Node standard library modules to access home directory and convert path to file:/// URI.
const os = require("os");
const url = require("url");

// Grab your documents folder with your custom CODE directory inside of it.
//const homedir = url.pathToFileURL(os.homedir());
const custom_code_dir =  "D:\coding_projects\adventureland\codes";

// Load the main file from your ES6 module.
import(custom_code_dir + "\merc.2.js");