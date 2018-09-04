'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _domHelpers = require('./domHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * File: TableViewHeader.jsx | Package: React Table View
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created: 15 Jul, 2018 | 03:29 AM
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * O P E N   S O U R C E   C O D E 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ---------------------------------
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This source code is licensed under the MIT license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * CapitalMental && BackLogics Technologies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-present. | All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var TableViewHeader = function (_React$Component) {
    _inherits(TableViewHeader, _React$Component);

    function TableViewHeader() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, TableViewHeader);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TableViewHeader.__proto__ || Object.getPrototypeOf(TableViewHeader)).call.apply(_ref, [this].concat(args))), _this), _this.headerWrapper = _react2.default.createRef(), _this.setSearchStatusTrue = function () {
            _this.props.passingContext.onSearchingStatusChange(true);
            _this.props.passingContext.contextManager.searchFocused = true;
        }, _this.setSearchStatusFalse = function () {
            _this.props.passingContext.onSearchingStatusChange(false);
            _this.props.passingContext.contextManager.searchFocused = false;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(TableViewHeader, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var contextManager = this.props.passingContext.contextManager;

            var inputElement = contextManager.findDomSearchInput(this.headerWrapper);

            if (inputElement) {
                inputElement.addEventListener('focus', this.setSearchStatusTrue);
                inputElement.addEventListener('blur', this.setSearchStatusFalse);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var contextManager = this.props.passingContext.contextManager;
            var domSearchField = contextManager.domSearchField;


            if (domSearchField) {
                domSearchField.removeEventListener('focus', this.setSearchStatusTrue);
                domSearchField.removeEventListener('blur', this.setSearchStatusFalse);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                Component = _props.headerComponent,
                passingContext = _props.passingContext;
            var _props2 = this.props,
                className = _props2.className,
                SBox = _props2.searchBoxComponent;
            var contextManager = passingContext.contextManager,
                state = passingContext.state;
            var workingMenu = contextManager.workingMenu;
            var originalData = workingMenu.originalData;
            var backEnabled = state.backEnabled,
                searchOpen = state.searchOpen;


            var headerPassingProps = {
                onGoBack: passingContext.onGoBack,
                backEnabled: backEnabled,
                totalRecords: workingMenu.filteredCells.length,
                isHome: workingMenu.isMain,
                onSearchChange: passingContext.onSearchChange,
                onClearFilter: passingContext.onClearFilter,
                onOpenSearch: passingContext.onOpenSearch,
                onCloseSearch: passingContext.onCloseSearch,
                filter: workingMenu.filterWord,
                direction: contextManager.direction,
                data: originalData
            };

            var cssClasses = (0, _classnames2.default)(_domHelpers.objectsCssClasses.searchBox, { hidden: !searchOpen });

            return _react2.default.createElement(
                'div',
                { className: className, ref: this.headerWrapper },
                _react2.default.createElement(
                    'div',
                    { className: cssClasses },
                    _react2.default.createElement(SBox, { passingProps: headerPassingProps })
                ),
                _react2.default.createElement(Component, { passingProps: headerPassingProps })
            );
        }
    }]);

    return TableViewHeader;
}(_react2.default.Component);

exports.default = TableViewHeader;