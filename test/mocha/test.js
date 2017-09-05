const path = require('path')
const {expect} = require('chai');
const batchRequire = require('../../');
class TestClass {
    constructor(item) {
        for (const key in item) {
            this[key] = item;
        }
    }
}

describe('batch require test #',function() {
    it('load directory',function() {
        const modules = batchRequire({
            filenameSuffix:'_module.js',
            basePath:path.join(__dirname,'../simple_modules')
        });
        expect(modules).to.have.property('1');
        expect(modules[1]).to.have.property('key_1_1');
    });

    it('wrapped by a class',function() {
        const modules = batchRequire({
            filenameSuffix:'_module.js',
            basePath:path.join(__dirname,'../simple_modules'),
            className:TestClass
        });
        expect(modules[1]).to.be.an.instanceof(TestClass);
    });

    it('with  key prefix',function() {
        const modules = batchRequire({
            filenameSuffix:'_module.js',
            basePath:path.join(__dirname,'../simple_modules'),
            className:TestClass,
            keyPrefix:'my_'
        });
        expect(modules).to.have.property('my_1');
    });

    it('replace _ with /',function() {
        const modules = batchRequire({
            filenameSuffix:'_module.js',
            basePath:path.join(__dirname,'../long_modules'),
            keyReplaces:{'_':'/'}
        });
        expect(modules).to.have.property('path/1');
    });
});