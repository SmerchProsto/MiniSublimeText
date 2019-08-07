var Dialogs;

if (typeof parent.Dialogs !== 'undefined')
     Dialogs = parent.Dialogs;
else
     Dialogs = new function () {
        this.open_file = function () {
            var i = $create('input');
            i.type = 'file';

            i.onchange = function () {
              Tabs.add_tab(this.value, App.get_file_name(this.value));
            };

            i.click();
        }
    };