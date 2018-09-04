'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _withStyles = require('@material-ui/core/styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _TableViewButton = require('./TableViewButton');

var _TableViewButton2 = _interopRequireDefault(_TableViewButton);

var _defaultElementsStyle = require('./defaultElementsStyle');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * File: DefaultTableViewSearchBox.jsx | Package: React Table View
 * 
 * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
 * Created: 20 Jul, 2018 | 12:44 AM
 * 
 * O P E N   S O U R C E   C O D E 
 * ---------------------------------
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

var DefaultTableViewSearchBox = function DefaultTableViewSearchBox(_ref) {
    var _ref$visible = _ref.visible,
        visible = _ref$visible === undefined ? true : _ref$visible,
        classes = _ref.classes,
        passingProps = _ref.passingProps;


    if (!visible) return null;

    var onSearchChange = passingProps.onSearchChange,
        onCloseSearch = passingProps.onCloseSearch,
        filter = passingProps.filter,
        totalRecords = passingProps.totalRecords,
        onClearFilter = passingProps.onClearFilter;

    var clearVisible = !!filter;

    return _react2.default.createElement(
        'div',
        { className: classes.root },
        _react2.default.createElement(
            'div',
            { className: '__leftContainer' },
            totalRecords
        ),
        _react2.default.createElement(
            'div',
            { className: '__inputContainer' },
            _react2.default.createElement('input', { type: 'text', value: filter, className: classes.searchInput, onChange: onSearchChange, placeholder: 'search' }),
            _react2.default.createElement(_TableViewButton2.default, {
                visible: clearVisible,
                icon: 'cancel',
                'aria-label': 'Clear Search',
                onClick: onClearFilter,
                className: classes.button
            })
        ),
        _react2.default.createElement(
            'div',
            { className: '__rightContainer' },
            _react2.default.createElement(_TableViewButton2.default, {
                icon: 'clear',
                'aria-label': 'Close Search',
                onClick: onCloseSearch,
                className: classes.button
            })
        )
    );
};

exports.default = (0, _withStyles2.default)(_defaultElementsStyle.searchBoxStyle)(DefaultTableViewSearchBox);