var App;

if (typeof parent.App !== 'undefined')
    App = parent.App;
else
    App = new function () {
        var fs = require('fs');

        // get the window screen
        var W = this.W = nw.Window.get();


        var parse_path = function (path) {
            var path_arr, file_name = '', file_exp = '';
            path_arr = path.split(/[\/\\]/);


            file_name = path_arr[path_arr.length - 1];
            return {
                path: path_arr,
                file_name: file_name,
                exp: file_exp
            };
        };

        this.get_file_name = function (path) {
            return parse_path(path).file_name;
        };

        // with help node we can read file
        this.read_file = function (path) {
            return fs.readFileSync(path);
        };

        this.write_file = function (path, data) {
            return fs.writeFileSync(path, data);
        };
        /*this.write_file = function (path, data) {
            return fs.writeFileSync(path, data);
        };*/
    };