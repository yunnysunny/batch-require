const fs = require('fs');
const path = require('path');

/**
 * Require a batch of file, and get a map with custom key and the required module. The required module may be warpped by given class name.
 * 
 * @param {Object} option
 * @param {String} basePath The directory of files to require.
 * @param {String=} option.filenameSuffix Only the files end with `option.filenameSuffix` will be processed. The default value is `.js` .
 * @param {Class=} option.className The required module will be warpped by the class of `option.className`. The default value is null, which will return the original required module.
 * @param {String=} option.keyPrefix The prefix string of the key.
 * @param {Object} option.keyReplaces A map of data to indicate which characters to be replaced.
 * 
 * @returns this
 */
module.exports = function({
    filenameSuffix = '.js',
    keyPrefix = '',
    className=null,
    keyReplaces={},
    basePath
}) {
    const objects = {};

    fs.readdirSync(basePath).filter(function(filename) {
        return filename.endsWith(filenameSuffix);
    }).forEach(function(filename) {
        const requiredModule = require(path.join(basePath, filename));
        let re = null;
        if (keyReplaces) {
            const items = Object.keys(keyReplaces);
            if (items.length > 0) {
                re = new RegExp(items.join('|'),'g');
            }
            
        }
        //key = keyPrefix + filename.replace(itemOfFilename, toReplaceItem)
        const originKey = keyPrefix + filename.replace(filenameSuffix,'');
        const key = re? originKey.replace(re,function(matched){
            return keyReplaces[matched];
        }) : originKey;
        
        if (className) {
            objects[key] = new className(requiredModule);
        } else {
            objects[key] = requiredModule;
        }
        
    });
    return objects;
};


