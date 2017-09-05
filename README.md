# batch-require

[![NPM](https://nodei.co/npm/batch-require.png?downloads=true)](https://nodei.co/npm/batch-require/) 

[![NPM version][https://img.shields.io/npm/v/batch-require.svg?style=flat-square]][https://npmjs.com/package/batch-require]
[![Build status][https://travis-ci.org/yunnysunny/batch-require.svg?branch=master][https://travis-ci.org/yunnysunny/batch-require]]

Sometimes we wanna load a batch of module in a directory. When you have such demand, batch-require gives you a good choice.

## How to use

```
├─long_modules
│      path_1_module.js
│      path_2_module.js
│      path_3_module.js
│
├─mocha
│      test.js
```

```javascript
const path = require('path')
const {expect} = require('chai');
const batchRequire = require('batch-require');

class TestClass {
    constructor(item) {
        for (const key in item) {
            this[key] = item;
        }
    }
}

const modules = batchRequire({
    filenameSuffix:'_module.js',
    basePath:path.join(__dirname,'../long_modules'),
    keyReplaces:{'_':'/'}
});
expect(modules).to.have.property('path/1');
expect(modules['path/1']).to.be.an.instanceof(TestClass);
```

## API
See the [api](doc/api.md) document.

## License

[MIT](LICENSE) 

