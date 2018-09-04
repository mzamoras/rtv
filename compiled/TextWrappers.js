'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UpperCasedBold = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _styles = require('@material-ui/core/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var localStyles = function localStyles(theme) {
    return {
        UpperCasedBold_root: {
            fontWeight: "bold",
            textTransform: 'uppercase'
        }
    };
}; /*
    * File: TextWrappers.jsx | Package: React Table View
    * 
    * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
    * Created: 15 Jul, 2018 | 11:27 PM
    * 
    * O P E N   S O U R C E   C O D E 
    * ---------------------------------
    * This source code is licensed under the MIT license found in the
    * LICENSE file in the root directory of this source tree.
    * 
    * CapitalMental && BackLogics Technologies
    * Copyright 2014-present. | All rights reserved.
    */

var UpperCasedBold = exports.UpperCasedBold = (0, _styles.withStyles)(localStyles)(function (_ref) {
    var classes = _ref.classes,
        children = _ref.children;

    return _react2.default.createElement(
        _Typography2.default,
        { className: classes.UpperCasedBold_root },
        children
    );
});