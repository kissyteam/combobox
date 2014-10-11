var ret = module.exports = function tpl(undefined){
var t;
var t0;
var t1;
var t2;
var t3;
var t4;
var t5;
var t6;
var t7;
var t8;
var t9;
var tpl = this;
var root = tpl.root;
var buffer = tpl.buffer;
var scope = tpl.scope;
var runtime = tpl.runtime;
var name = tpl.name;
var pos = tpl.pos;
var data = scope.data;
var affix = scope.affix;
var nativeCommands = root.nativeCommands;
var utils = root.utils;
var callFnUtil = utils["callFn"];
var callCommandUtil = utils["callCommand"];
var rangeCommand = nativeCommands["range"];
var foreachCommand = nativeCommands["foreach"];
var forinCommand = nativeCommands["forin"];
var eachCommand = nativeCommands["each"];
var withCommand = nativeCommands["with"];
var ifCommand = nativeCommands["if"];
var setCommand = nativeCommands["set"];
var includeCommand = nativeCommands["include"];
var parseCommand = nativeCommands["parse"];
var extendCommand = nativeCommands["extend"];
var blockCommand = nativeCommands["block"];
var macroCommand = nativeCommands["macro"];
var debuggerCommand = nativeCommands["debugger"];
function func2(scope, buffer, undefined) {
var data = scope.data;
var affix = scope.affix;
buffer.data += '\r\n<div class="';
pos.line = 6;
var callRet3
callRet3 = callFnUtil(tpl, scope, {escape:1,params:['trigger']}, buffer, ["getBaseCssClasses"]);
buffer = buffer.writeEscaped(callRet3);
buffer.data += '">\r\n    <div class="';
pos.line = 7;
var callRet4
callRet4 = callFnUtil(tpl, scope, {escape:1,params:['trigger-inner']}, buffer, ["getBaseCssClasses"]);
buffer = buffer.writeEscaped(callRet4);
buffer.data += '">&#x25BC;</div>\r\n</div>\r\n';
return buffer;
}
function func8(scope, buffer, undefined) {
var data = scope.data;
var affix = scope.affix;
buffer.data += '\r\n    disabled\r\n    ';
return buffer;
}
function func13(scope, buffer, undefined) {
var data = scope.data;
var affix = scope.affix;
buffer.data += 'none';
return buffer;
}
function func14(scope, buffer, undefined) {
var data = scope.data;
var affix = scope.affix;
buffer.data += 'block';
return buffer;
}
function func19(scope, buffer, undefined) {
var data = scope.data;
var affix = scope.affix;
buffer.data += '\r\n         style="display:none"\r\n         ';
return buffer;
}


buffer.data += '<div class="';
var callRet0
callRet0 = callFnUtil(tpl, scope, {escape:1,params:['invalid-el']}, buffer, ["getBaseCssClasses"]);
buffer = buffer.writeEscaped(callRet0);
buffer.data += '">\r\n    <div class="';
pos.line = 2;
var callRet1
callRet1 = callFnUtil(tpl, scope, {escape:1,params:['invalid-inner']}, buffer, ["getBaseCssClasses"]);
buffer = buffer.writeEscaped(callRet1);
buffer.data += '"></div>\r\n</div>\r\n\r\n';
pos.line = 5;
pos.line = 5;
var id5 = ((t=(affix.hasTrigger)) !== undefined ? t:((t = data.hasTrigger) !== undefined ? t :scope.resolveLooseUp(["hasTrigger"])));
buffer = ifCommand.call(tpl, scope, {params:[id5],fn: func2}, buffer);
buffer.data += '\r\n\r\n<div class="';
pos.line = 11;
var callRet6
callRet6 = callFnUtil(tpl, scope, {escape:1,params:['input-wrap']}, buffer, ["getBaseCssClasses"]);
buffer = buffer.writeEscaped(callRet6);
buffer.data += '">\r\n\r\n    <input id="ks-combobox-input-';
pos.line = 13;
var id7 = ((t=(affix.id)) !== undefined ? t:((t = data.id) !== undefined ? t :scope.resolveLooseUp(["id"])));
buffer = buffer.writeEscaped(id7);
buffer.data += '"\r\n           aria-haspopup="true"\r\n           aria-autocomplete="list"\r\n           aria-haspopup="true"\r\n           role="autocomplete"\r\n           aria-expanded="false"\r\n\r\n    ';
pos.line = 20;
var id9 = ((t=(affix.disabled)) !== undefined ? t:((t = data.disabled) !== undefined ? t :scope.resolveLooseUp(["disabled"])));
buffer = ifCommand.call(tpl, scope, {params:[id9],fn: func8}, buffer);
buffer.data += '\r\n\r\n    autocomplete="off"\r\n    class="';
pos.line = 25;
var callRet10
callRet10 = callFnUtil(tpl, scope, {escape:1,params:['input']}, buffer, ["getBaseCssClasses"]);
buffer = buffer.writeEscaped(callRet10);
buffer.data += '"\r\n\r\n    value="';
pos.line = 27;
var id11 = ((t=(affix.value)) !== undefined ? t:((t = data.value) !== undefined ? t :scope.resolveLooseUp(["value"])));
buffer = buffer.writeEscaped(id11);
buffer.data += '"\r\n    />\r\n\r\n\r\n    <label for="ks-combobox-input-';
pos.line = 31;
var id12 = ((t=(affix.id)) !== undefined ? t:((t = data.id) !== undefined ? t :scope.resolveLooseUp(["id"])));
buffer = buffer.writeEscaped(id12);
buffer.data += '"\r\n            style=\'display:';
pos.line = 32;
var id15 = ((t=(affix.value)) !== undefined ? t:((t = data.value) !== undefined ? t :scope.resolveLooseUp(["value"])));
buffer = ifCommand.call(tpl, scope, {params:[id15],fn: func13,inverse: func14}, buffer);
buffer.data += ';\'\r\n    class="';
pos.line = 33;
var callRet16
callRet16 = callFnUtil(tpl, scope, {escape:1,params:['placeholder']}, buffer, ["getBaseCssClasses"]);
buffer = buffer.writeEscaped(callRet16);
buffer.data += '">\r\n    ';
pos.line = 34;
var id17 = ((t=(affix.placeholder)) !== undefined ? t:((t = data.placeholder) !== undefined ? t :scope.resolveLooseUp(["placeholder"])));
buffer = buffer.writeEscaped(id17);
buffer.data += '\r\n    </label>\r\n\r\n    <div class="';
pos.line = 37;
var callRet18
callRet18 = callFnUtil(tpl, scope, {escape:1,params:['clear']}, buffer, ["getBaseCssClasses"]);
buffer = buffer.writeEscaped(callRet18);
buffer.data += '"\r\n         unselectable="on"\r\n         ';
pos.line = 39;
var id20 = ((t=(affix.value)) !== undefined ? t:((t = data.value) !== undefined ? t :scope.resolveLooseUp(["value"])));
buffer = ifCommand.call(tpl, scope, {params:[!(id20)],fn: func19}, buffer);
buffer.data += '\r\n         onmousedown="return false;"><div\r\n            class="';
pos.line = 43;
var callRet21
callRet21 = callFnUtil(tpl, scope, {escape:1,params:['clear-inner']}, buffer, ["getBaseCssClasses"]);
buffer = buffer.writeEscaped(callRet21);
buffer.data += '">clear</div></div>\r\n</div>\r\n';
return buffer;
};
ret.TPL_NAME = module.id || module.name;