'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TableViewContext = require('./TableViewContext');

var _TransitionGroup = require('react-transition-group/TransitionGroup');

var _TransitionGroup2 = _interopRequireDefault(_TransitionGroup);

var _TableViewMenu = require('./TableViewMenu');

var _TableViewMenu2 = _interopRequireDefault(_TableViewMenu);

var _SlideTransition = require('./SlideTransition');

var _SlideTransition2 = _interopRequireDefault(_SlideTransition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * File: TableViewContainer.jsx | Package: React Table View
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created: 14 Jul, 2018 | 04:51 AM
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * O P E N   S O U R C E   C O D E 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ---------------------------------
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This source code is licensed under the MIT license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * CapitalMental && BackLogics Technologies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-present. | All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var TableViewContainer = function (_React$Component) {
    _inherits(TableViewContainer, _React$Component);

    function TableViewContainer() {
        _classCallCheck(this, TableViewContainer);

        return _possibleConstructorReturn(this, (TableViewContainer.__proto__ || Object.getPrototypeOf(TableViewContainer)).apply(this, arguments));
    }

    _createClass(TableViewContainer, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: this.props.className },
                _react2.default.createElement(
                    _TableViewContext.MainContext.Consumer,
                    null,
                    function (context) {
                        var state = context.state,
                            contextManager = context.contextManager;
                        var transitionClasses = _this2.props.transitionClasses;


                        var commonProps = {
                            onGoBack: context.onGoBack,
                            onOpenSearch: context.onOpenSearch,
                            onCloseSearch: context.onCloseSearch,
                            transitionClasses: transitionClasses,
                            cellElement: null
                        };
                        console.log("PPP", _this2.props);
                        if (_this2.props.loadingProps.loading) {
                            return _react2.default.createElement(
                                'div',
                                { className: _this2.props.loadingProps.className },
                                _react2.default.createElement(
                                    'i',
                                    { className: 'material-icons rotation' },
                                    'sync'
                                ),
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    'Loading Content...'
                                )
                            );
                        }

                        return _react2.default.createElement(
                            _react2.default.Fragment,
                            null,
                            _react2.default.createElement(
                                _TransitionGroup2.default,
                                { component: null, childFactory: function childFactory(child) {
                                        return _react2.default.createElement(_SlideTransition2.default, { key: child.props.pkey, child: child, state: state });
                                    } },
                                contextManager.currentMenuArray.map(function (el) {
                                    var key = "menu_" + (el.id || "main");
                                    return _react2.default.createElement(_TableViewMenu2.default, _extends({
                                        key: key,
                                        pkey: key,
                                        menuElement: el
                                    }, commonProps));
                                })
                            )
                        );
                    }
                )
            );
        }
    }]);

    return TableViewContainer;
}(_react2.default.Component);

exports.default = TableViewContainer;