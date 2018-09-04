'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _reactAutobindHelper = require('react-autobind-helper');

var _reactAutobindHelper2 = _interopRequireDefault(_reactAutobindHelper);

var _withStyles = require('@material-ui/core/styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _reactSb = require('react-sb3');

var _reactSb2 = _interopRequireDefault(_reactSb);

var _localStyles = require('./localStyles');

var _List = require('@material-ui/core/List');

var _List2 = _interopRequireDefault(_List);

var _TableViewCellWrapper = require('./TableViewCellWrapper');

var _TableViewCellWrapper2 = _interopRequireDefault(_TableViewCellWrapper);

var _DefaultTableViewCell = require('./DefaultTableViewCell');

var _DefaultTableViewCell2 = _interopRequireDefault(_DefaultTableViewCell);

var _domHelpers = require('./domHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * File: TableViewMenu.jsx | Package: React Table View
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created: 14 Jul, 2018 | 05:53 AM
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * O P E N   S O U R C E   C O D E 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ---------------------------------
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This source code is licensed under the MIT license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * CapitalMental && BackLogics Technologies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-present. | All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var TableViewMenu = function (_React$Component) {
    _inherits(TableViewMenu, _React$Component);

    function TableViewMenu(props) {
        _classCallCheck(this, TableViewMenu);

        var _this = _possibleConstructorReturn(this, (TableViewMenu.__proto__ || Object.getPrototypeOf(TableViewMenu)).call(this, props));

        (0, _reactAutobindHelper2.default)(_this);

        var menuElement = _this.props.menuElement;


        _this.state = {
            active: menuElement.activeCell,
            selected: menuElement.selectedCell,
            focused: menuElement.focusedCell,
            page: menuElement.currentPage,
            nextPage: true
        };

        _this.lastSearch = _this.props.menuElement.filterWord;
        _this.domObj = _react2.default.createRef();

        _this.focusTO = null;
        _this.nextPage = true;
        _this.pageTO = null;
        _this.clickTO = null;

        menuElement.setDomObject(_this.domObj);
        return _this;
    }

    _createClass(TableViewMenu, [{
        key: 'unselectAll',
        value: function unselectAll() {
            var _state = this.state,
                selected = _state.selected,
                active = _state.active,
                focused = _state.focused;

            if (selected === null && active === null && focused === null) {
                this.props.onCloseSearch();
                return;
            }

            this.props.menuElement.clearCellStatus();
            this.setState({ selected: null, active: null, focused: null });

            this.props.menuElement.domCellAction(this.state.focused, function (el) {
                el.blur();
            });

            this.props.menuElement.domAction(function (el) {
                el.focus();
            });
        }
    }, {
        key: 'onCellClick',
        value: function onCellClick(index) {
            var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            this.props.menuElement.clearCellStatus();
            this.props.menuElement.setCellStatus(index, ['selected', 'active']);
            this.setState({ selected: index, active: index /* , ()=>{
                                                           if( callback ){
                                                           this.clickTO = setTimeout( ()=>{
                                                           callback();
                                                           clearTimeout( this.clickTO );
                                                           }, 0 );
                                                           }
                                                           } */ });
        }
    }, {
        key: 'onCellFocus',
        value: function onCellFocus(index, target) {
            this.props.menuElement.setCellStatus(index, ['focused', 'selected']);
            this.setState({ focused: index, selected: index });
        }
    }, {
        key: 'onKeyDown',
        value: function onKeyDown(event) {

            (0, _domHelpers.onSimpleKeyEvent)(["ArrowDown", "Tab"], event, this.onArrowDown);
            (0, _domHelpers.onSimpleKeyEvent)("ArrowUp", event, this.onArrowUp);
            (0, _domHelpers.onSimpleKeyEvent)("ArrowLeft", event, this.props.onGoBack);
            (0, _domHelpers.onSimpleKeyEvent)(["ArrowRight", "Enter"], event, this.onArrowRight);
            (0, _domHelpers.onSimpleKeyEvent)(["Escape"], event, this.unselectAll);
        }
    }, {
        key: 'onArrowDown',
        value: function onArrowDown(event) {
            var _this2 = this;

            var focused = this.state.focused;

            var isFocused = focused !== null;

            event.preventDefault();
            event.stopPropagation();

            this.props.menuElement.domCellAction(isFocused ? focused : 0, function (el) {
                var element = _this2.props.menuElement.findNexOrPrevCell(isFocused ? el.nextSibling : el, 'next');
                if (!!element) {
                    _this2.focusCell(element, isFocused ? null : 0);
                }
            });
        }
    }, {
        key: 'onArrowUp',
        value: function onArrowUp(event) {
            var _this3 = this;

            var focused = this.state.focused;

            var isFocused = focused !== null;

            event.preventDefault();
            event.stopPropagation();

            if (isFocused && this.props.menuElement.isFirstVisibleCell(focused ? focused : 0)) {
                this.props.onOpenSearch();
                return;
            }

            this.props.menuElement.domCellAction(isFocused ? focused : 0, function (el) {
                var element = _this3.props.menuElement.findNexOrPrevCell(isFocused ? el.previousSibling : el, 'prev');
                if (!!element) {
                    _this3.focusCell(element, isFocused ? null : 0);
                }
            });
        }
    }, {
        key: 'onArrowRight',
        value: function onArrowRight() {
            var selected = this.state.selected;


            if (selected !== null) {
                this.props.menuElement.domCellAction(selected, function (el) {
                    el.click();
                });
            }
        }
    }, {
        key: 'focusCell',
        value: function focusCell(element) {
            var _this4 = this;

            var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var timeOut = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;


            if (!element) return;
            if (index === null) index = parseInt(element.getAttribute("data-cell-index"), 10);
            if (!document.hasFocus()) {
                this.onCellFocus(index);
                return;
            }
            if (!timeOut) {
                element.focus();
                return;
            }
            this.focusTO = setTimeout(function () {
                element.focus();
                clearTimeout(_this4.focusTO);
            }, timeOut);
        }
    }, {
        key: 'onScrollFrame',
        value: function onScrollFrame(_ref) {
            var _this5 = this;

            var atBottom = _ref.atBottom;
            var menuElement = this.props.menuElement;
            var page = this.state.page;


            if (atBottom && this.nextPage && page - 1 < menuElement.pages) {
                this.nextPage = false;
                menuElement.nextPage();
                this.setState({ page: menuElement.currentPage });
                this.pageTO = setTimeout(function () {
                    _this5.nextPage = true;
                    clearTimeout(_this5.pageTO);
                }, 200);
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.props.menuElement.domAction(function (el) {
                el.focus();
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearTimeout(this.focusTO);
            clearTimeout(this.pageTO);
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            var searchChanged = !(0, _shallowequal2.default)(nextProps.menuElement.filterWord, this.lastSearch);
            var shouldUpdate = !(0, _shallowequal2.default)(nextProps.in, this.props.in) || !(0, _shallowequal2.default)(nextProps.menuElement, this.props.menuElement) || searchChanged || !(0, _shallowequal2.default)(nextState, this.state);
            if (searchChanged) {
                this.lastSearch = nextProps.menuElement.filterWord;
            }
            return shouldUpdate;
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var menuElement = this.props.menuElement;
            var id = menuElement.id,
                parentManager = menuElement.parentManager;
            var currentMenu = parentManager.currentMenu;

            var isThisMain = menuElement.id === -1;
            var isThisCurrent = isThisMain && currentMenu === null || !isThisMain && currentMenu === id;

            menuElement.setDomObject(this.domObj);

            if (this.props.in && isThisCurrent && !parentManager.searchFocused) {
                this.props.menuElement.domAction(function (el) {
                    el.focus();
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {

            var elementClasses = {
                root: (0, _classnames2.default)(this.props.classes.root, { visible: true })
            };

            var _props = this.props,
                menuElement = _props.menuElement,
                listWrapper = _props.listWrapper;
            var isMain = menuElement.isMain,
                visibleCells = menuElement.visibleCells,
                id = menuElement.id;


            var cells = visibleCells || [];
            var Wrapper = listWrapper || _List2.default;
            var menuWrapper = _domHelpers.objectsCssClasses.menuWrapper;

            var wrappIndex = isMain ? -1 : id;

            var commonProps = {
                onClick: this.onCellClick,
                onFocus: this.onCellFocus,
                component: _DefaultTableViewCell2.default,
                className: this.props.classes.cellWrapper
            };

            return _react2.default.createElement(
                _reactSb2.default,
                { elementClasses: elementClasses, onScrollFrame: this.onScrollFrame },
                _react2.default.createElement(
                    'div',
                    { ref: this.domObj, onKeyDown: this.onKeyDown, className: menuWrapper, tabIndex: '-1', 'data-indx': wrappIndex },
                    _react2.default.createElement(
                        Wrapper,
                        null,
                        cells.map(function (cell) {
                            return _react2.default.createElement(_TableViewCellWrapper2.default, _extends({
                                key: "cell" + cell.id,
                                active: cell.amIActive,
                                selected: cell.amISelected,
                                focused: cell.amIFocused,
                                disabled: cell.amIDisabled,
                                cellElement: cell
                            }, commonProps));
                        }),
                        cells.length === 0 && _react2.default.createElement(
                            'div',
                            null,
                            'Nada de nada'
                        )
                    )
                )
            );
        }
    }]);

    return TableViewMenu;
}(_react2.default.Component);

exports.default = (0, _withStyles2.default)(_localStyles.menuStyles)(TableViewMenu);