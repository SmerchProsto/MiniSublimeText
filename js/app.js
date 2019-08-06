var App;

if (typeof parent.App !== 'undefined')
    App = parent.App;
else
    App = new function () {
        var fs = require('fs');
        this.read_file = function (path) {
            return fs.readFileSync(path);
        };
    };