/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
var docco = require('./docco');
var extend = require('util')._extend;
var path = require('path');
var fs = require('fs-extra');

function DoccoPlugin(options){
  if(typeof options !== "object") options = {};
  var resourcesPath = path.join(__dirname, 'resources');
  this.options = extend({
    css: path.join(resourcesPath, 'docco.css'),
    extension: '.js',
    template: path.join(resourcesPath, 'docco.jst'),
    output: path.join(process.cwd(), 'dist/docs'),
    test: /\.js($|\?)/i,
    dir: process.cwd(),
    'public': path.join(resourcesPath, 'public'),
    exclude: /node_modules|bower_components/
  }, options);
}

module.exports = DoccoPlugin;

DoccoPlugin.prototype.apply = function(compiler){
  var self = this;
  var options = self.options;
  
  if(options.dir){
    options.args = scanFolder(options.dir, options);
    docco.document(options);
  }
  
}

function asRegExp(test) {
  if(typeof test === "string") test = new RegExp(test.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"));
  return test;
}
function matchPart(str, test){
  asRegExp(test).test(str)
}
var matchObject = function(file, options){
  if(options.test)
    if(!asRegExp(options.test).test(file)) return false;
  if(options.include)
    if(!asRegExp(options.include).test(file)) return false;
  if(options.exclude)
    if(asRegExp(options.exclude).test(file)) return false;
  return true;
}

function scanFolder(path, options){
    var fileList = [],
        folderList = [],
        walk = function(path, fileList, folderList){
            files = fs.readdirSync(path);
            files.forEach(function(item) {  
                var tmpPath = path + '/' + item,
                    stats = fs.statSync(tmpPath);

                if (stats.isDirectory()) {  
                    walk(tmpPath, fileList, folderList); 
                    folderList.push(tmpPath); 
                } else if(matchObject(tmpPath, options)){
                    fileList.push(tmpPath);
                }  
            });  
        };  

    walk(path, fileList, folderList);

    return fileList
}