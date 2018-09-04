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

var _ListItem = require('@material-ui/core/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _ListItemText = require('@material-ui/core/ListItemText');

var _ListItemText2 = _interopRequireDefault(_ListItemText);

var _ListItemIcon = require('@material-ui/core/ListItemIcon');

var _ListItemIcon2 = _interopRequireDefault(_ListItemIcon);

var _defaultElementsStyle = require('./defaultElementsStyle');

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /*
                                                                                                                                                                                                                              * File: DefaultTableViewCell.jsx | Package: React Table View
                                                                                                                                                                                                                              * 
                                                                                                                                                                                                                              * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
                                                                                                                                                                                                                              * Created: 20 Jul, 2018 | 12:54 AM
                                                                                                                                                                                                                              * 
                                                                                                                                                                                                                              * O P E N   S O U R C E   C O D E 
                                                                                                                                                                                                                              * ---------------------------------
                                                                                                                                                                                                                              * This source code is licensed under the MIT license found in the
                                                                                                                                                                                                                              * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                              * 
                                                                                                                                                                                                                              * CapitalMental && BackLogics Technologies
                                                                                                                                                                                                                              * Copyright 2014-present. | All rights reserved.
                                                                                                                                                                                                                              */

var validateIcon = function validateIcon(icon) {
    return icon !== "" ? icon : false;
};

var DefaultTableViewCell = function DefaultTableViewCell(_ref) {
    var label = _ref.label,
        props = _objectWithoutProperties(_ref, ['label']);

    var cssClass = (0, _classnames2.default)(props.classes.root, {
        active: props.active,
        selected: props.selected,
        focused: props.focused
    });

    var mainTextProps = {
        variant: 'title',
        classes: {
            title: props.classes.mainText
        }
    };

    var secondaryTextProps = {
        variant: 'body1',
        classes: {
            body1: props.classes.secondaryText
        }
    };

    var cellData = props.cellData,
        menuData = props.menuData;


    var icon = validateIcon(cellData.icon) || validateIcon(menuData.icon) || "person";

    var loading = props.loading,
        error = props.error,
        classes = props.classes,
        onCancel = props.onCancel,
        onRetry = props.onRetry;


    return _react2.default.createElement(
        _ListItem2.default,
        { className: cssClass, divider: true, disabled: props.disabled },
        _react2.default.createElement(
            _ListItemIcon2.default,
            { classes: { root: props.classes.icon } },
            _react2.default.createElement(
                'i',
                { className: 'material-icons' },
                icon
            )
        ),
        _react2.default.createElement(_ListItemText2.default, {
            primary: cellData.label,
            primaryTypographyProps: mainTextProps,
            secondary: 'This is the description for the current menu',
            secondaryTypographyProps: secondaryTextProps
        }),
        _react2.default.createElement(RightIconElement, {
            loading: loading,
            error: error,
            onRetry: onRetry,
            onCancel: onCancel,
            classes: classes })
    );
};

exports.default = (0, _withStyles2.default)(_defaultElementsStyle.cellStyle)(DefaultTableViewCell);


var RightIconElement = function RightIconElement(props) {

    if (!props.error && props.loading) {
        return _react2.default.createElement(
            _ListItemIcon2.default,
            { classes: { root: props.classes.icon } },
            _react2.default.createElement(
                'i',
                { className: 'material-icons rotation' },
                'sync'
            )
        );
    }

    if (!props.loading && props.error) {
        return _react2.default.createElement(
            _ListItemIcon2.default,
            { classes: { root: props.classes.icon } },
            _react2.default.createElement(
                _IconButton2.default,
                { classes: { root: props.classes.iconButton }, onClick: props.onRetry },
                _react2.default.createElement(
                    'i',
                    { className: 'material-icons' },
                    'replay'
                )
            )
        );
    }

    return _react2.default.createElement(
        _ListItemIcon2.default,
        { classes: { root: props.classes.icon } },
        _react2.default.createElement(
            'i',
            { className: 'material-icons' },
            'keyboard_arrow_right'
        )
    );
};