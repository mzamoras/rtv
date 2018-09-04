'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CSSTransition = require('react-transition-group/CSSTransition');

var _CSSTransition2 = _interopRequireDefault(_CSSTransition);

var _domHelpers = require('./domHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
}; /*
    * File: SlideTransition.jsx | Package: React Table View
    * 
    * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
    * Created: 14 Jul, 2018 | 06:07 AM
    * 
    * O P E N   S O U R C E   C O D E 
    * ---------------------------------
    * This source code is licensed under the MIT license found in the
    * LICENSE file in the root directory of this source tree.
    * 
    * CapitalMental && BackLogics Technologies
    * Copyright 2014-present. | All rights reserved.
    */

var SlideTransition = function SlideTransition(_ref) {
    var child = _ref.child,
        state = _ref.state;
    var _child$props$menuElem = child.props.menuElement,
        isMain = _child$props$menuElem.isMain,
        id = _child$props$menuElem.id;
    var currentMenu = state.currentMenu;

    var isCurrentMain = currentMenu === null || currentMenu === -1;
    var enter = isMain && isCurrentMain || !isMain && currentMenu === id;
    var transitionClasses = child.props.transitionClasses[state.direction];
    var objectsCss = enter ? _domHelpers.objectsCssClasses.activeSlide : _domHelpers.objectsCssClasses.inactiveSlide;

    return _react2.default.createElement(
        _CSSTransition2.default,
        { unmountOnExit: false, 'in': enter, appear: true, timeout: 300, classNames: transitionClasses },
        _react2.default.createElement(
            'div',
            { className: objectsCss, style: style },
            child
        )
    );
};

exports.default = SlideTransition;