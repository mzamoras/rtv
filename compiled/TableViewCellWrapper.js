'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAutobindHelper = require('react-autobind-helper');

var _reactAutobindHelper2 = _interopRequireDefault(_reactAutobindHelper);

var _domHelpers = require('./domHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * File: TableViewCellWrapper.jsx | Package: React Table View
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created: 18 Jul, 2018 | 05:05 AM
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * O P E N   S O U R C E   C O D E 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ---------------------------------
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This source code is licensed under the MIT license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * CapitalMental && BackLogics Technologies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-present. | All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var TableViewCellWrapper = function (_React$Component) {
    _inherits(TableViewCellWrapper, _React$Component);

    function TableViewCellWrapper(props) {
        _classCallCheck(this, TableViewCellWrapper);

        var _this = _possibleConstructorReturn(this, (TableViewCellWrapper.__proto__ || Object.getPrototypeOf(TableViewCellWrapper)).call(this, props));

        (0, _reactAutobindHelper2.default)(_this);

        _this.state = {
            isLoading: false,
            hasError: false
        };
        return _this;
    }

    _createClass(TableViewCellWrapper, [{
        key: 'onClick',
        value: function onClick() {
            var _this2 = this;

            var _state = this.state,
                isLoading = _state.isLoading,
                hasError = _state.hasError;
            var _props = this.props,
                cellElement = _props.cellElement,
                onClick = _props.onClick;


            if (isLoading || hasError || cellElement.amIDisabled) return;

            var proceed = false;
            var data = null;

            onClick(cellElement.id);

            cellElement.loadData(this.setLoading).then(function (data) {

                proceed = cellElement.defaultClick({
                    cellProps: cellElement.originalData,
                    downloadedData: data,
                    gotoMenu: cellElement.gotoMenu.bind(cellElement),
                    setLoadingFalse: _this2.unsetLoading,
                    menuFinder: cellElement.menuFinder.bind(cellElement)
                });

                if (proceed) {
                    if (!!data) {
                        cellElement.insertNewMenu(data, _this2.unsetLoading);
                        return;
                    }
                    cellElement.onClick();
                } else if (!!data) {
                    _this2.unsetLoading();
                }
            }).catch(function (err) {
                _this2.setState({ isLoading: false, hasError: true });
            });
        }
    }, {
        key: 'setLoading',
        value: function setLoading(callback) {
            this.setState({ isLoading: true }, callback);
        }
    }, {
        key: 'unsetLoading',
        value: function unsetLoading(callback) {
            this.setState({ isLoading: false }, callback);
        }
    }, {
        key: 'cleanStatus',
        value: function cleanStatus(callback) {
            this.setState({ isLoading: false, hasError: false }, callback);
        }
    }, {
        key: 'onFocus',
        value: function onFocus(event) {
            var _props$cellElement = this.props.cellElement,
                id = _props$cellElement.id,
                amIDisabled = _props$cellElement.amIDisabled;

            if (this.props.focused || amIDisabled) return;
            this.props.onFocus(id, event.target);
        }
    }, {
        key: 'onErrorCellReload',
        value: function onErrorCellReload() {
            var _this3 = this;

            this.cleanStatus(function () {
                _this3.onClick();
            });
        }
    }, {
        key: 'onErrorCellCancel',
        value: function onErrorCellCancel() {
            this.cleanStatus();
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            var _props2 = this.props,
                _old = _props2.cellElement,
                oldProps = _objectWithoutProperties(_props2, ['cellElement']);

            var _new = nextProps.cellElement,
                newProps = _objectWithoutProperties(nextProps, ['cellElement']);

            return !(0, _shallowequal2.default)(nextState, this.state) || !(0, _shallowequal2.default)(oldProps, newProps);
        }
    }, {
        key: 'statusProps',
        value: function statusProps() {
            return {
                selected: this.props.selected,
                active: this.props.active,
                focused: this.props.focused,
                disabled: this.props.cellElement.amIDisabled,
                error: this.state.hasError,
                loading: this.state.isLoading
            };
        }
    }, {
        key: 'wraperProps',
        value: function wraperProps(statusProps) {
            var cellWrapper = _domHelpers.objectsCssClasses.cellWrapper;
            var className = this.props.className;

            return {
                onClick: this.onClick,
                onFocus: this.onFocus,
                className: (0, _classnames2.default)(className, cellWrapper, statusProps),
                tabIndex: -1
            };
        }
    }, {
        key: 'cellProps',
        value: function cellProps(statusProps) {
            var cellElement = this.props.cellElement;

            return _extends({
                cellElement: cellElement,
                cellData: cellElement.originalData,
                menuData: cellElement.parentMenu.originalData,
                onRetry: this.onErrorCellReload,
                onCancel: this.onErrorCellCancel
            }, statusProps);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props3 = this.props,
                Cell = _props3.component,
                cellElement = _props3.cellElement;


            var statusProps = this.statusProps();
            var wrapperProps = this.wraperProps(statusProps);
            var cellProps = this.cellProps(statusProps);

            return _react2.default.createElement(
                'div',
                _extends({ 'data-cell-index': cellElement.id }, wrapperProps),
                _react2.default.createElement(Cell, cellProps)
            );
        }
    }]);

    return TableViewCellWrapper;
}(_react2.default.Component);

exports.default = TableViewCellWrapper;