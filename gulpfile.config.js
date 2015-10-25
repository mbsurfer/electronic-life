'use strict';
var GulpConfig = (function () {
    function GulpConfig() {

        this.source = './src/';
        this.sourceApp = this.source + 'app/';

        this.dist = './dist/';

        this.tsOutputPath = this.dist + 'app/';
        this.allJavaScript = [this.sourceApp + 'assets/js/**/*.js'];

        //make sure modules are loaded first for concat
        this.allTypeScript = this.sourceApp + '**/*.ts';

        this.typings = './typings/';
        this.libraryTypeScriptDefinitions = this.typings + '**/*.d.ts';
        this.appTypeScriptReferences = this.typings + 'typescriptApp.d.ts';

        this.bowerComponentsPath = this.source + 'components/';
        this.bowerLibsPath = this.source + 'libs/';
    }
    return GulpConfig;
})();
module.exports = GulpConfig;