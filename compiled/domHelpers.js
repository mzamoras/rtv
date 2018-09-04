'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/*
* File: domHelpers.js | Package: React Table View
* 
* Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
* Created: 22 Jul, 2018 | 02:37 AM
* 
* O P E N   S O U R C E   C O D E 
* ---------------------------------
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
* 
* CapitalMental && BackLogics Technologies
* Copyright 2014-present. | All rights reserved.
*/

var findMenuDomObject = exports.findMenuDomObject = function findMenuDomObject(rtvDomObject, _id) {
    if (!rtvDomObject.current) return null;
    var id = _id || "-1";
    return rtvDomObject.current.querySelector('[data-indx=\'' + id + '\']');
};

var findCellDomObject = exports.findCellDomObject = function findCellDomObject(rtvID, _menuID, cellID) {
    var action = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;


    var menuID = _menuID === null ? -1 : _menuID;
    var element = null;

    if (typeof rtvID === 'string') {
        element = document.querySelector('#' + rtvID + ' [data-indx=\'' + menuID + '\'] [data-cell-index=\'' + cellID + '\']');
    } else {
        element = rtvID.querySelector('[data-cell-index=\'' + cellID + '\']');
    }

    if (!action && !!element) {
        return element;
    }

    if (!!element) {
        action(element);
    }
};

var domElementAction = exports.domElementAction = function domElementAction(rtvID, selector, action) {

    var element = null;

    if (typeof rtvID === 'string') {
        element = document.querySelector('#' + rtvID + ' ' + selector);
    } else {
        element = rtvID.querySelector('' + selector);
    }

    if (element) {
        action(element);
    }
};

var getDataAttribute = exports.getDataAttribute = function getDataAttribute(el, att) {
    el.getAttribute("data-" + att);
};

var isFindCombo = function isFindCombo(event) {
    return event.metaKey && event.key.toLowerCase() === "f";
};

var keyChecker = function keyChecker(event, keyOrKeys) {
    if (typeof keyOrKeys === 'string') {
        return event.key === keyOrKeys;
    }
    return keyOrKeys.indexOf(event.key) > -1;
};

var functionChecker = function functionChecker(_fnc, event, callback) {
    var fnc = typeof _fnc !== 'function' ? keyChecker : _fnc;
    if (fnc(event, _fnc)) {
        callback(event);
        return true;
    }
    return false;
};

var onFindCombo = exports.onFindCombo = function onFindCombo(event, callback) {
    return functionChecker(isFindCombo, event, callback);
};

var onSimpleKeyEvent = exports.onSimpleKeyEvent = function onSimpleKeyEvent(keyName, event, callback) {
    return functionChecker(keyName, event, callback);
};

var objectsCssClasses = exports.objectsCssClasses = {
    rtvWrapper: 'rtv__wrapper',
    menuWrapper: 'rtv__menuWrapper',
    cellWrapper: 'rtv__cellWrapper',
    searchBox: 'rtv__searchbox',
    activeSlide: 'rtv__activeSlide',
    inactiveSlide: 'rtv__inactiveSlide'
};