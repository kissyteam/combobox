/**
 * @ignore
 * get cursor position of input
 * @author yiminghe@gmail.com
 */

// from mentio
function getTextAreaOrInputUnderlinePosition(element, position) {
    var properties = [
        'direction',
        'boxSizing',
        'width',
        'height',
        'overflowX',
        'overflowY',
        'borderTopWidth',
        'borderRightWidth',
        'borderBottomWidth',
        'borderLeftWidth',
        'paddingTop',
        'paddingRight',
        'paddingBottom',
        'paddingLeft',
        'fontStyle',
        'fontVariant',
        'fontWeight',
        'fontStretch',
        'fontSize',
        'fontSizeAdjust',
        'lineHeight',
        'fontFamily',
        'textAlign',
        'textTransform',
        'textIndent',
        'textDecoration',
        'letterSpacing',
        'wordSpacing'
    ];

    var isFirefox = (window.mozInnerScreenX !== null);

    var div = document.createElement('div');
    div.id = 'input-textarea-caret-position-mirror-div';
    document.body.appendChild(div);

    var style = div.style;
    var computed = window.getComputedStyle ? getComputedStyle(element) : element.currentStyle;

    style.whiteSpace = 'pre-wrap';
    if (element.nodeName !== 'INPUT') {
        style.wordWrap = 'break-word';
    }

    // position off-screen
    style.position = 'absolute';
    style.visibility = 'hidden';

    // transfer the element's properties to the div
    for (var i = 0; i < properties.length; i++) {
        var prop = properties[i];
        style[prop] = computed[prop];
    }

    if (isFirefox) {
        style.width = (parseInt(computed.width) - 2) + 'px';
        if (element.scrollHeight > parseInt(computed.height)) {
            style.overflowY = 'scroll';
        }
    } else {
        style.overflow = 'hidden';
    }

    div.textContent = element.value.substring(0, position);

    if (element.nodeName === 'INPUT') {
        div.textContent = div.textContent.replace(/\s/g, '\u00a0');
    }

    var span = document.createElement('span');
    span.textContent = element.value.substring(position) || '.';
    div.appendChild(span);

    var coordinates = {
        top: span.offsetTop + parseInt(computed.borderTopWidth) + span.offsetHeight,
        left: span.offsetLeft + parseInt(computed.borderLeftWidth)
    };

    var obj = element;
    do {
        coordinates.left += obj.offsetLeft;
        coordinates.top += obj.offsetTop;
    } while ((obj = obj.offsetParent));

    document.body.removeChild(div);

    return coordinates;
}

module.exports = getTextAreaOrInputUnderlinePosition;