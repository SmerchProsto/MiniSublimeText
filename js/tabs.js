var Tabs;

if (typeof parent.Tabs !== 'undefined')
    Tabs = parent.Tabs;
else
    Tabs = new function () {
        var tab_list  = {};

        var _add_tab = function (path, name) {
            var tab_frame, tab, tab_close, tab_name;

            tab_frame = $create('iframe');
            tab_frame.className = 'frame';
            tab_frame.src = 'html/code_editor.html#'+path;

            tab = $create('span');
            tab.className = 'tab';
            tab.id = path;

            tab_name = $create('span');
            tab_name.innerHTML = name ? name : 'Tab';

            tab_close = $create('span');
            tab_close.className = 'tab_close';
            tab_close.innerHTML = '&#10006';
            tab_close.onclick = function () {
                tab.parentNode.removeChild(tab);
                tab_frame.parentNode.removeChild(tab_frame);
                delete tab_list[tab.id];
            };

            tab.appendChild(tab_name);
            tab.appendChild(tab_close);
            $('tabs').appendChild(tab);
            $('frames').appendChild(tab_frame);

            tab_list[path] = {
                tab: tab,
                tab_name: tab_name,
                tab_frame: tab_frame,
                tab_close: tab_close
            }

            return tab_list;
        };

        this.add_tab = function (path, name) {
            var tab = _add_tab(path, name);
        };

        this.close_tab = function (path) {
            tab.parentNode.removeChild(tab);
            tab_frame.parentNode.removeChild(tab_frame);
            delete tab_list[tab.id];
        };
    };