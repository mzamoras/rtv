'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _withStyles = require('@material-ui/core/styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _localStyles = require('./localStyles');

var _TableViewContext = require('./TableViewContext');

var _DefaultTableViewHeader = require('./DefaultTableViewHeader');

var _DefaultTableViewHeader2 = _interopRequireDefault(_DefaultTableViewHeader);

var _DefaultTableViewFooter = require('./DefaultTableViewFooter');

var _DefaultTableViewFooter2 = _interopRequireDefault(_DefaultTableViewFooter);

var _DefaultTableViewSearchBox = require('./DefaultTableViewSearchBox');

var _DefaultTableViewSearchBox2 = _interopRequireDefault(_DefaultTableViewSearchBox);

var _TableViewContainer = require('./TableViewContainer');

var _TableViewContainer2 = _interopRequireDefault(_TableViewContainer);

var _TableViewHeader = require('./TableViewHeader');

var _TableViewHeader2 = _interopRequireDefault(_TableViewHeader);

var _TableViewFooter = require('./TableViewFooter');

var _TableViewFooter2 = _interopRequireDefault(_TableViewFooter);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * File: TableView.jsx | Package: React Table View
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created: 14 Jul, 2018 | 02:45 AM
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * O P E N   S O U R C E   C O D E 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ---------------------------------
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This source code is licensed under the MIT license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * CapitalMental && BackLogics Technologies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-present. | All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var TableView = function (_React$Component) {
    _inherits(TableView, _React$Component);

    function TableView(props) {
        _classCallCheck(this, TableView);

        var _this = _possibleConstructorReturn(this, (TableView.__proto__ || Object.getPrototypeOf(TableView)).call(this, props));

        _this.transitionClasses = {
            forward: {
                enter: props.classes.transEnter,
                enterActive: props.classes.transEnterActive,
                exit: props.classes.transExit,
                exitActive: props.classes.transExitActive,
                exitDone: props.classes.exitDone,
                appear: props.classes.appear
            },
            backward: {
                enter: props.classes.transEnterB,
                enterActive: props.classes.transEnterActiveB,
                exit: props.classes.transExit,
                exitActive: props.classes.transExitActiveB,
                exitDone: props.classes.exitDone,
                appear: props.classes.appear
            }
        };

        _this.state = {
            loadedMenus: false,
            loading: !!props.menusUrl,
            errorLoading: false
        };
        return _this;
    }

    _createClass(TableView, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (this.props.menusUrl) {
                this.loadMenus();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (this.props.menusUrl !== prevProps.menusUrl) {
                this.setState({ loading: true }, this.loadMenus);
            }
        }
    }, {
        key: 'loadMenus',
        value: function loadMenus() {
            var _this2 = this;

            console.log("LOADING");
            (0, _axios2.default)({ method: 'get', url: this.props.menusUrl }).then(function (_ref) {
                var data = _ref.data;

                var newData = data;
                if (_this2.props.formatMenus) {
                    newData = _this2.props.formatMenus(data) || data;
                }
                _this2.setState({ loadedMenus: newData, loading: false });
            }).catch(function (err) {
                console.log("error", err);
                _this2.setState({ loading: false, errorLoading: true });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props$classes = this.props.classes,
                root = _props$classes.root,
                container = _props$classes.container,
                footer = _props$classes.footer,
                header = _props$classes.header;

            var loadingProps = {
                loading: this.state.loading,
                errorLoading: this.state.errorLoading,
                className: this.props.classes.containerLoading
            };

            return _react2.default.createElement(
                _TableViewContext.MainContextProvider,
                _extends({}, this.props, { loadedMenus: this.state.loadedMenus, rootClassName: root }),
                _react2.default.createElement(_TableViewContext.MainContextConsumer, {
                    component: _TableViewHeader2.default,
                    headerComponent: _DefaultTableViewHeader2.default,
                    searchBoxComponent: _DefaultTableViewSearchBox2.default,
                    className: header,
                    visible: this.props.showHeader
                }),
                _react2.default.createElement(_TableViewContainer2.default, { className: container, transitionClasses: this.transitionClasses, loadingProps: loadingProps }),
                _react2.default.createElement(_TableViewContext.MainContextConsumer, {
                    component: _TableViewFooter2.default,
                    footerComponent: _DefaultTableViewFooter2.default,
                    className: footer,
                    visible: this.props.showFooter
                })
            );
        }
    }]);

    return TableView;
}(_react2.default.Component);

TableView.defaultProps = {
    menus: [],
    homeLabel: "Home",
    showHeader: true,
    showFooter: true,
    disableEmpty: false,
    hideEmpty: false,
    defaultClick: function defaultClick() {
        return true;
    }

};
TableView.propTypes = {
    menus: _propTypes2.default.any,
    homeLabel: _propTypes2.default.string,
    showHeader: _propTypes2.default.bool,
    showFooter: _propTypes2.default.bool,
    disableEmpty: _propTypes2.default.bool,
    hideEmpty: _propTypes2.default.bool,
    defaultClick: _propTypes2.default.func
};
exports.default = (0, _withStyles2.default)(_localStyles.wrapperStyles)(TableView);