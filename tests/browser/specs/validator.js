/**
 * Simple TC for KISSY ComboBox
 * @author yiminghe@gmail.com
 */

var util = require('util');
var ComboBox = require('combobox');
window.focus();
document.body.focus();

describe('validator', function () {
    it('validator works', function (done) {
        this.timeout(10000);
        var data = ['1', '21', '31'];

        var ERROR = '太大了';

        var comboBox = new ComboBox({
            width: 200,
            validator: function (v, complete) {
                complete(parseInt(v, 10) > 10 ? ERROR : '');
            },
            render: '#holder',
            dataSource: new ComboBox.LocalDataSource({
                data: data
            }),
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

        t.value = '';

        t.focus();

        window.simulateEvent(t, 'keydown');

        async.series([
            waits(100),

            runs(function () {
                t.value = '11';
                window.simulateEvent(t, 'input');
            }),
            // longer for ie8
            waits(500),

            runs(function () {
                t.focus();
                window.simulateEvent(t, 'keyup');
            }),

            // longer for ie8
            waits(500),

            runs(function () {
                // firefox will not trigger blur event??
                // $(t).fire('blur');
                document.body.focus();
                window.focus();
                t.blur();
            }),

            // longer for ie8
            waits(500),

            runs(function () {
                var error = '';
                comboBox.validate(function (err) {
                    error = err;
                });
                expect(error).to.be(ERROR);
                expect(comboBox.get('el').hasClass('ks-combobox-invalid')).to.be(true);
                expect(comboBox.get('invalidEl').css('display')).to.be('block');
                expect(comboBox.get('invalidEl').attr('title')).to.be(ERROR);
            }),

            // ok
            waits(100),

            runs(function () {
                t.focus();
                window.simulateEvent(t, 'keydown');
            }),

            waits(100),

            runs(function () {
                t.value = '3';
                window.simulateEvent(t, 'input');
            }),

            waits(100),

            runs(function () {
                window.simulateEvent(t, 'keyup');
            }),

            runs(function () {
                // firefox will not trigger blur event??
                // $(t).fire('blur');
                t.blur();
            }),

            waits(100),

            runs(function () {
                var error = '';
                comboBox.validate(function (err) {
                    error = err;
                });
                expect(error).to.be('');
                expect(comboBox.get('el').hasClass('ks-combobox-invalid')).to.be(false);
                expect(comboBox.get('invalidEl').css('display')).to.be('none');
            }),

            runs(function () {
                comboBox.destroy();
            })], done);
    });
});