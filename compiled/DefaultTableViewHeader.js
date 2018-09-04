'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = require('@material-ui/core/styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _TableViewButton = require('./TableViewButton');

var _TableViewButton2 = _interopRequireDefault(_TableViewButton);

var _TextWrappers = require('./TextWrappers');

var _defaultElementsStyle = require('./defaultElementsStyle');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * File: DefaultTableViewHeader.jsx | Package: React Table View
 * 
 * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
 * Created: 20 Jul, 2018 | 12:16 AM
 * 
 * O P E N   S O U R C E   C O D E 
 * ---------------------------------
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

var DefaultTableViewHeader = function DefaultTableViewHeader(_ref) {
    var _ref$visible = _ref.visible,
        visible = _ref$visible === undefined ? true : _ref$visible,
        children = _ref.children,
        classes = _ref.classes,
        passingProps = _ref.passingProps;


    if (!visible) return null;

    var backEnabled = passingProps.backEnabled,
        onGoBack = passingProps.onGoBack,
        onOpenSearch = passingProps.onOpenSearch,
        data = passingProps.data;


    var cssBackWrapper = (0, _classnames2.default)("back", classes.buttonWrapper);
    var cssSearchWrapper = (0, _classnames2.default)("search", classes.buttonWrapper);

    return _react2.default.createElement(
        'div',
        { className: classes.root },
        _react2.default.createElement(
            'div',
            { className: cssBackWrapper },
            _react2.default.createElement(_TableViewButton2.default, {
                icon: 'arrow_back',
                'aria-label': 'Go Back',
                onClick: onGoBack,
                className: classes.button,
                disabled: !backEnabled
            })
        ),
        _react2.default.createElement(
            'div',
            { className: classes.label },
            _react2.default.createElement(
                _TextWrappers.UpperCasedBold,
                null,
                data.label
            )
        ),
        _react2.default.createElement(
            'div',
            { className: cssSearchWrapper },
            _react2.default.createElement(_TableViewButton2.default, {
                icon: 'search',
                'aria-label': 'Open Search',
                onClick: onOpenSearch,
                className: classes.button
            })
        )
    );
};

exports.default = (0, _withStyles2.default)(_defaultElementsStyle.headerStyle)(DefaultTableViewHeader);