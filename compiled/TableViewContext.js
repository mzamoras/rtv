'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MainContextConsumer = exports.MainContextProvider = exports.MainContext = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactAutobindHelper = require('react-autobind-helper');

var _reactAutobindHelper2 = _interopRequireDefault(_reactAutobindHelper);

var _contextHelpers = require('./contextHelpers');

var _domHelpers = require('./domHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * File: TableViewContext.jsx | Package: React Table View
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created: 14 Jul, 2018 | 02:46 AM
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * O P E N   S O U R C E   C O D E 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ---------------------------------
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This source code is licensed under the MIT license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * CapitalMental && BackLogics Technologies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-present. | All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var FWD = "forward";

var MainContext = exports.MainContext = _react2.default.createContext();

var MainContextProvider = exports.MainContextProvider = function (_React$Component) {
    _inherits(MainContextProvider, _React$Component);

    function MainContextProvider(props) {
        _classCallCheck(this, MainContextProvider);

        var _this = _possibleConstructorReturn(this, (MainContextProvider.__proto__ || Object.getPrototypeOf(MainContextProvider)).call(this, props));

        (0, _reactAutobindHelper2.default)(_this);

        var manager = new _contextHelpers.ContextManager(props, _this.changeCurrentMenu);

        _this.state = {
            menus: manager.menus,
            mainMenu: manager.mainMenu,
            currentMenu: null,
            backEnabled: false,
            searchOpen: false,
            direction: FWD,
            isSearching: false,
            tableViewID: props.rtv_id,
            contextManager: manager
        };

        _this.history = [];
        _this.container = _react2.default.createRef();

        _this.passingProps = {
            stateChanger: _this.addYear,
            changeCurrentMenu: _this.changeCurrentMenu,
            onGoBack: _this.onGoBack,
            onSearchChange: _this.onFilterChange,
            onCloseSearch: _this.onCloseSearch,
            onOpenSearch: _this.onOpenSearch,
            onClearFilter: _this.onClearFilter,

            contextManager: _this.state.contextManager,
            onSearchingStatusChange: _this.onSearchingStatusChange
        };
        return _this;
    }

    _createClass(MainContextProvider, [{
        key: 'onSearchingStatusChange',
        value: function onSearchingStatusChange(status) {
            this.setState({ isSearching: status });
        }
    }, {
        key: 'onFilterChange',
        value: function onFilterChange(event) {
            var value = event.target.value;
            var contextManager = this.state.contextManager;


            contextManager.filterCells(value);

            this.setState({
                mainMenu: contextManager.mainMenu,
                menus: contextManager.menus
            });
        }
    }, {
        key: 'onClearFilter',
        value: function onClearFilter() {
            var contextManager = this.state.contextManager;

            contextManager.filterCells('');
            this.setState({
                mainMenu: contextManager.mainMenu,
                menus: contextManager.menus
            });
        }
    }, {
        key: 'onGoBack',
        value: function onGoBack() {
            var contextManager = this.state.contextManager;

            var prevMenu = contextManager.previousMenu();

            if (prevMenu) {
                this.setState(prevMenu, contextManager.workingMenu.reGainFocus);
            }
        }
    }, {
        key: 'reFocusContainer',
        value: function reFocusContainer() {
            if (!this.history.length && this.state.mainMenu.__data.focused === null) {
                this.container.current.focus();
            }
        }
    }, {
        key: 'onCloseSearch',
        value: function onCloseSearch() {
            this.setState({ searchOpen: false, isSearching: false });
        }
    }, {
        key: 'onOpenSearch',
        value: function onOpenSearch() {
            this.setState({ searchOpen: true }, this.focusSerchInput);
        }
    }, {
        key: 'focusSerchInput',
        value: function focusSerchInput() {
            var domSearchField = this.state.contextManager.domSearchField;

            if (domSearchField) {
                domSearchField.focus();
            }
        }
    }, {
        key: 'changeCurrentMenu',
        value: function changeCurrentMenu() {
            var _newMenu = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            var nextMenu = this.state.contextManager.changeCurrent(_newMenu);
            if (nextMenu) {
                this.setState(nextMenu);
            }
        }
    }, {
        key: 'onKeyDown',
        value: function onKeyDown(event) {
            var _this2 = this;

            (0, _domHelpers.onFindCombo)(event, function () {
                event.preventDefault();
                _this2.onOpenSearch();
            });

            (0, _domHelpers.onSimpleKeyEvent)(["Tab", "ArrowDown"], event, function () {

                event.preventDefault();
                event.stopPropagation();

                var workingMenu = _this2.state.contextManager.workingMenu;
                var selectedCell = workingMenu.selectedCell;


                workingMenu.domCellAction(selectedCell === null ? 0 : selectedCell, function (el) {
                    el.focus();
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                rootClassName = _props.rootClassName;

            return _react2.default.createElement(
                MainContext.Provider,
                { value: _extends({}, this.passingProps, { state: this.state
                    }) },
                _react2.default.createElement(
                    'div',
                    { id: this.state.contextManager.id,
                        onFocus: this.onFocus,
                        className: rootClassName,
                        tabIndex: '-1',
                        onKeyDown: this.onKeyDown,
                        ref: this.container },
                    children
                )
            );
        }
    }]);

    return MainContextProvider;
}(_react2.default.Component);

MainContextProvider.getDerivedStateFromProps = function (nextProps, nextState) {

    var update = false;

    if (nextProps.homeLabel !== nextState.mainMenu.label) {
        nextState.contextManager.mainMenu.originalData.label = nextProps.homeLabel;
        update = true;
    }
    if (nextProps.menus !== nextState.contextManager.props.menus || nextProps.hideEmpty !== nextState.contextManager.props.hideEmpty || nextProps.disableEmpty !== nextState.contextManager.props.disableEmpty || nextProps.loadedMenus !== nextState.contextManager.props.loadedMenus) {
        nextState.contextManager.updateMenus(nextProps);
        update = true;
    }

    if (nextProps.defaultClick !== nextState.contextManager.props.defaultClick) {
        nextState.contextManager.props.defaultClick = nextProps.defaultClick;
        update = true;
    }

    var newState = Object.assign({}, nextState, { mainMenu: nextState.mainMenu });

    return update ? newState : nextState;
};

var MainContextConsumer = exports.MainContextConsumer = function (_React$Component2) {
    _inherits(MainContextConsumer, _React$Component2);

    function MainContextConsumer() {
        _classCallCheck(this, MainContextConsumer);

        return _possibleConstructorReturn(this, (MainContextConsumer.__proto__ || Object.getPrototypeOf(MainContextConsumer)).apply(this, arguments));
    }

    _createClass(MainContextConsumer, [{
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                _props2$visible = _props2.visible,
                visible = _props2$visible === undefined ? true : _props2$visible,
                Component = _props2.component,
                allProps = _objectWithoutProperties(_props2, ['visible', 'component']);

            if (!visible) return null;

            return _react2.default.createElement(
                MainContext.Consumer,
                null,
                function (context) {
                    return _react2.default.createElement(Component, _extends({ passingContext: context }, allProps));
                }
            );
        }
    }]);

    return MainContextConsumer;
}(_react2.default.Component);

MainContextConsumer.propTypes = {
    component: _propTypes2.default.any
};