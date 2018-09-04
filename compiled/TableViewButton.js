'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /*
                                                                                                                                                                                                                              * File: TableViewButton.jsx | Package: React Table View
                                                                                                                                                                                                                              * 
                                                                                                                                                                                                                              * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
                                                                                                                                                                                                                              * Created: 20 Jul, 2018 | 12:10 AM
                                                                                                                                                                                                                              * 
                                                                                                                                                                                                                              * O P E N   S O U R C E   C O D E 
                                                                                                                                                                                                                              * ---------------------------------
                                                                                                                                                                                                                              * This source code is licensed under the MIT license found in the
                                                                                                                                                                                                                              * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                              * 
                                                                                                                                                                                                                              * CapitalMental && BackLogics Technologies
                                                                                                                                                                                                                              * Copyright 2014-present. | All rights reserved.
                                                                                                                                                                                                                              */

var TableViewButton = function TableViewButton(_ref) {
    var _ref$visible = _ref.visible,
        visible = _ref$visible === undefined ? true : _ref$visible,
        icon = _ref.icon,
        props = _objectWithoutProperties(_ref, ['visible', 'icon']);

    if (!visible) return null;

    return _react2.default.createElement(
        _IconButton2.default,
        props,
        _react2.default.createElement(
            'i',
            { className: 'material-icons' },
            icon
        )
    );
};

exports.default = TableViewButton;