<a name="module_batch-require"></a>

## batch-require
<a name="exp_module_batch-require--module.exports"></a>

### module.exports(option) ⇒ <code>Object</code> ⏏
Require a batch of file, and get a map with custom key and the required module. The required module may be warpped by given class name.

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| option | <code>Object</code> |  |
| option.basePath | <code>String</code> | The directory of files to require. |
| [option.filenameSuffix] | <code>String</code> | Only the files end with `option.filenameSuffix` will be processed. The default value is `.js` . |
| [option.className] | <code>Class</code> | The required module will be warpped by the class of `option.className`. The default value is null, which will return the original required module. |
| [option.keyPrefix] | <code>String</code> | The prefix string of the key. |
| option.keyReplaces | <code>Object</code> | A map of data to indicate which characters to be replaced. |

