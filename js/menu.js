(function () {

    var MENU = {
        file: {
            label: 'File',
            submenu: [
                {
                    label: 'Open',
                    click: function () {
                        Dialogs.open_file();
                    }
                },
                {
                    label: 'Save',
                    click: function () {
                        Tabs.save_selected();
                    }
                },
                {
                    label: 'Exit',
                    click: function () {
                        alert('Exit');
                    }
                }
            ]
        }
    };

    // create a menu with help global nw object, which
    // have a menu property
    var menu = new nw.Menu({
        type: 'menubar'
    });

    var i, j;

    for (i in MENU) {
        var m = MENU[i];
        var submenu = null;

        if (m.submenu) {
            submenu = new nw.Menu();
            for (j = 0; j < m.submenu.length; j+=1) {
                var s = m.submenu[j];
                submenu.append(new nw.MenuItem({
                    label: s.label,
                    click: s.click
                }));
            }
            menu.append(new nw.MenuItem({
                label: m.label,
                submenu: submenu
            }));
        }
    }

    // in property menu we are adding our property menu
    App.W.menu = menu;
})();