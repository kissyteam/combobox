/**
 * Simple TC for KISSY ComboBox
 * @author yiminghe@gmail.com
 */

window.focus();
document.body.focus();
var Event = require('event-dom');
var util = require('util');
var ComboBox = require('combobox');
var UA = require('ua');

describe('simple combobox', function () {
    var data = ['1', '21', '31'];
    var KeyCode = Event.KeyCode;

    var comboBox = new ComboBox({
        width: 200,
        render: '#holder',
        dataSource: new ComboBox.LocalDataSource({
            data: data
        }),
        value: '2',
        format: function (q, data) {
            var ret = [];
            util.each(data, function (d) {
                ret.push({
                    content: d.replace(new RegExp(util.escapeRegExp(q), 'g'), '<b>$&</b>'),
                    textContent: d
                });
            });
            return ret;
        }
    });
    comboBox.render();

    var t = comboBox.get('input')[0];

    it('show autocomplete menu when press down key', function (done) {
        expect(t.value).to.be('2');

        window.simulateEvent(t, 'keydown', {
            keyCode: KeyCode.DOWN
        });

        setTimeout(function () {
            var menu = comboBox.get('menu');
            expect(menu.get).to.be.ok();
            var children = menu.get('children');
            expect(children.length).to.be(1);
            expect(children[0].get('textContent')).to.be('21');
            expect(util.indexOf(menu.get('highlightedItem'), children)).to.be(-1);
            document.body.focus();
            done();
        }, 100);
    });

    it('show menu with right alignment when input value ' +
        'and hide when lose focus', function (done) {

        t.value = '';

        t.focus();

        // ios can simulate keydown??
        window.simulateEvent(t, 'keydown');

        async.series([
            waits(100),

            runs(function () {
                t.value = '1';
                window.simulateEvent(t, 'input');
            }),

            waits(100),

            runs(function () {
                window.simulateEvent(t, 'keyup');
            }),

            waits(100),

            runs(function () {
                var menuEl = comboBox.get('menu').get('el');
                expect(comboBox.get('menu').get('visible')).to.be(true);
                var offsetT = comboBox.get('el').offset();
                // var width=Dom.outerWidth(t);
                var height = comboBox.get('el').outerHeight();
                var expectLeft = offsetT.left;
                var expectTop = offsetT.top + height;
                var menuElOffset = menuEl.offset();
                expect(menuElOffset.left - expectLeft).to.within(-5, 5);
                expect(menuElOffset.top - expectTop).to.within(-5, 5);
                // must focus again in firefox
                t.focus();
            }),

            waits(300),

            runs(function () {
                // firefox will not trigger blur event??
                // $(t).fire('blur');
                t.blur();
            }),

            waits(100),

            runs(function () {
                expect(comboBox.get('menu').get('visible')).to.be(false);
            }),

            waits(100)], done);
    });

    it('should filter static data by default', function (done) {
        t.value = '';

        t.focus();

        window.simulateEvent(t, 'keydown');

        async.series([
            waits(100),
            runs(function () {
                t.value = '2';
                window.simulateEvent(t, 'input');
            }),
            waits(100),

            runs(function () {
                window.simulateEvent(t, 'keyup');
            }),

            waits(100),

            runs(function () {
                var menu = comboBox.get('menu');
                var children = menu.get('children');
                expect(children.length).to.be(1);
                expect(children[0].get('content')).to.be('<b>2</b>1');
                expect(children[0].get('textContent')).to.be('21');
                expect(children[0].get('value')).to.be('21');
                // 输入项和提示项 textContent 不一样，默认不高亮
                expect(menu.get('highlightedItem')).not.to.be.ok();
                t.blur();
            })], done);
    });

    it('should format and select item right initially', function (done) {
        t.value = '';

        t.focus();

        window.simulateEvent(t, 'keydown');

        async.series([
            waits(100),
            runs(function () {
                t.value = '1';
                window.simulateEvent(t, 'input');
            }),
            waits(100),

            runs(function () {
                window.simulateEvent(t, 'keyup');
            }),

            waits(100),

            runs(function () {
                var menu = comboBox.get('menu');
                var children = menu.get('children');

                expect(children[0].get('content')).to.be('<b>1</b>');
                expect(children[1].get('content')).to.be('2<b>1</b>');
                expect(children[2].get('content')).to.be('3<b>1</b>');

                expect(children[0].get('textContent')).to.be('1');
                expect(children[1].get('textContent')).to.be('21');
                expect(children[2].get('textContent')).to.be('31');

                expect(children[0].get('value')).to.be('1');
                expect(children[1].get('value')).to.be('21');
                expect(children[2].get('value')).to.be('31');

                // 入项和第一个提示项 textContent 一样，那么第一个高亮
                expect(util.indexOf(menu.get('highlightedItem'), menu.get('children')))
                    .to.be(0);
            }),

            waits(100),

            runs(function () {
                t.blur();
            })], done);
    });

    it('should response to keyboard and update input', function (done) {
        this.timeout(5000);
        var originalValue = '1';

        t.focus();

        window.simulateEvent(t, 'keydown'),

            async.series([
                waits(200),

                runs(function () {
                    t.value = '';
                    window.simulateEvent(t, 'input');
                }),

                waits(200),

                runs(function () {
                    t.value = originalValue;
                    window.simulateEvent(t, 'input');
                }),

                waits(200),

                runs(function () {
                    window.simulateEvent(t, 'keyup');
                }),

                waits(200),

                runs(function () {
                    var menu = comboBox.get('menu');
                    var children = menu.get('children');
                    // 第一个高亮
                    expect(util.indexOf(menu.get('highlightedItem'), children)).to.be(0);

                    window.simulateEvent(t, 'keydown', {
                        keyCode: KeyCode.DOWN
                    });
                }),

                waits(100),

                runs(function () {
                    var menu = comboBox.get('menu');
                    var children = menu.get('children');
                    // 第二个高亮
                    expect(util.indexOf(menu.get('highlightedItem'), children)).to.be(1);

                    // 先把 textContent 放到里面
                    expect(t.value).to.be(children[1].get('textContent'));

                    window.simulateEvent(t, 'keydown', {
                        keyCode: KeyCode.DOWN
                    });
                }),

                waits(100),

                runs(function () {
                    var menu = comboBox.get('menu');
                    var children = menu.get('children');
                    // 第3个高亮
                    expect(util.indexOf(menu.get('highlightedItem'), children)).to.be(2);
                    window.simulateEvent(t, 'keydown', {
                        keyCode: KeyCode.DOWN
                    });
                }),

                waits(100),

                // include input in key sequence
                runs(function () {
                    var menu = comboBox.get('menu');
                    // restore to original value
                    expect(t.value).to.be(originalValue);
                    expect(menu.get('highlightedItem')).not.to.be.ok();
                    window.simulateEvent(t, 'keydown', {
                        keyCode: KeyCode.DOWN
                    });
                }),

                // wrap
                runs(function () {
                    var menu = comboBox.get('menu');
                    var children = menu.get('children');
                    // 第1个高亮
                    expect(util.indexOf(menu.get('highlightedItem'), children)).to.be(0);
                    expect(t.value).to.be(menu.get('highlightedItem').get('textContent'));
                    t.blur();
                })], done);
    });

    if (!UA.ios && !UA.android) {
        it('should response to mouse', function (done) {
            t.focus();

            async.series([
                waits(100),

                runs(function () {
                    window.simulateEvent(t, 'keydown');
                    t.value = '';
                    window.simulateEvent(t, 'input');
                }),

                waits(100),

                runs(function () {
                    t.value = '1';
                    window.simulateEvent(t, 'input');
                }),

                waits(100),

                runs(function () {
                    window.simulateEvent(t, 'keyup');
                }),

                waits(100),

                runs(function () {
                    var menu = comboBox.get('menu');
                    var children = menu.get('children');
                    // 第一个高亮
                    expect(util.indexOf(menu.get('highlightedItem'),
                        children)).to.be(0);

                    window.simulateEvent(children[1].get('el')[0], 'mouseover', {
                        relatedTarget: children[0].get('el')[0]
                    });
                    // 第二个高亮
                    expect(util.indexOf(menu.get('highlightedItem'), children)).to.be(1);
                    t.blur();
                })], done);
        });
    }

    it('should update selectedItem and hide menu', function (done) {
        t.focus();

        async.series([
            waits(100),

            runs(function () {
                window.simulateEvent(t, 'keydown');
                t.value = '';
                window.simulateEvent(t, 'input');
            }),

            waits(100),

            runs(function () {
                t.value = '1';
                window.simulateEvent(t, 'input');
            }),

            waits(100),

            runs(function () {
                window.simulateEvent(t, 'keyup');
            }),

            waits(100),

            runs(function () {
                window.simulateEvent(t, 'keydown', {
                    keyCode: KeyCode.DOWN
                });
            }),
            waits(100),
            runs(function () {
                var menu = comboBox.get('menu');
                var children = menu.get('children');
                // 第二个高亮
                expect(util.indexOf(menu.get('highlightedItem'), children)).to.be(1);

                window.simulateEvent(t, 'keydown', {
                    keyCode: KeyCode.ENTER
                });
            }),

            waits(100),

            runs(function () {
                var menu = comboBox.get('menu');
                var children = menu.get('children');
                expect(t.value).to.be(children[1].get('textContent'));
                expect(menu.get('visible')).to.be(false);
            })], done);
    });

    it('esc should restore value to original and hide menu', function (done) {
        t.focus();

        window.simulateEvent(t, 'keydown');
        async.series([
            waits(100),
            runs(function () {
                t.value = '';
                window.simulateEvent(t, 'input');
            }),
            waits(100),
            runs(function () {
                t.value = '1';
                window.simulateEvent(t, 'input');
            }),
            waits(100),

            runs(function () {
                window.simulateEvent(t, 'keyup');
            }),

            waits(100),

            runs(function () {
                window.simulateEvent(t, 'keydown', {
                    keyCode: KeyCode.DOWN
                });
            }),
            waits(100),
            runs(function () {
                var menu = comboBox.get('menu');
                var children = menu.get('children');
                // 第二个高亮
                expect(util.indexOf(menu.get('highlightedItem'), children)).to.be(1);
                expect(t.value).to.be(children[1].get('textContent'));
                window.simulateEvent(t, 'keydown', {
                    keyCode: KeyCode.ESC
                });
            }),

            waits(100),
            runs(function () {
                var menu = comboBox.get('menu');
                expect(t.value).to.be('1');
                expect(menu.get('visible')).to.be(false);
            }),
            runs(function () {
                comboBox.destroy();
            })], done);
    });
});