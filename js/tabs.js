var Tabs;

if (typeof parent.Tabs !== 'undefined')
    Tabs = parent.Tabs;
else
    Tabs = new function () {
        var tab_list  = {};
        var selected = '';

        var _add_tab = function (path, name) {
            var tab_frame, tab, tab_close, tab_name;

            tab_frame = $create('iframe');
            tab_frame.className = 'frame';
            tab_frame.src = 'html/code_editor.html#'+path;
            // tab_frame.src = 'package.json#'+path;

            tab = $create('span');
            tab.className = 'tab';
            tab.id = path;
            tab.onclick = function () {
              Tabs.select(this.id);
            };

            tab_name = $create('span');
            tab_name.innerHTML = name ? name : 'Tab';

            tab_close = $create('span');
            tab_close.className = 'tab_close';
            tab_close.innerHTML = '&#10006';
            tab_close.onclick = function (e) {
                e.stopPropagation(); // for stop the work of event
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
            };

            Tabs.select(path);
            return tab_list;
        };

        this.add_tab = function (path, name) {
            var tab = _add_tab(path, name);
        };

        this.close_tab = function (path) {
            tab.parentNode.removeChild(tab);
            tab_frame.parentNode.removeChild(tab_frame);
            delete tab_list[tab.id];
            selected = '';
        };
        
        this.select = function (id) {
            if (!tab_list[id]) return;
            if (selected) {
                tab_list[selected].tab_frame.style.display = 'none';
                tab_list[selected].tab.className = tab_list[selected].tab.className.replace(' tab_selected', '');
            }

            tab_list[id].tab_frame.style.display = 'block';
            tab_list[id].tab.className += ' tab_selected';

            selected = id;
        };

        this.selected = function () {

        };

        this.save_selected = function () {
            if (!selected) return;

            var frame = tab_list[selected].tab_frame.contentWindow;

            if (frame.SAVE) {
                frame.SAVE();
            }
        };

    };