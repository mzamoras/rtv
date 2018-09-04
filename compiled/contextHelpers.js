"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ContextManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * File: contextHelpers.js | Package: React Table View
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created: 16 Jul, 2018 | 03:13 PM
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * O P E N   S O U R C E   C O D E 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * ---------------------------------
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This source code is licensed under the MIT license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * CapitalMental && BackLogics Technologies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright 2014-present. | All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultFilter = function defaultFilter(cell, filterRegExp) {
    var testable = cell.label || cell.originalData.label;
    return filterRegExp.test(testable);
};
var FWD = "forward";
var BKW = "backward";

var CellElement = function () {
    function CellElement(data, id, tgtMenu, parentMenu) {
        _classCallCheck(this, CellElement);

        this.originalData = data;

        /**@type {MenuElement} */
        this.parentMenu = parentMenu;
        this.tgtMenu = tgtMenu;

        this.id = id;
        this.isSelected = false;
        this.isActive = false;
        this.isFocused = false;
        this.isLoading = false;
        this.isDisabled = null;
        this.defaultMethod = this.parentMenu.parentManager.props.defaultMethod || 'post';
    }

    _createClass(CellElement, [{
        key: "gotoMenu",
        value: function gotoMenu() {
            var menuData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            console.log("AAA");
            if (!menuData) {
                this.onClick();
                return;
            }
            console.log("GOING TO");
            this.parentManager.menuChanger(menuData.id);
        }
    }, {
        key: "menuFinder",
        value: function menuFinder() {
            var finderFunction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            if (!finderFunction) return null;
            return this.parentManager.menus.find(function (menu) {
                return finderFunction(menu.originalData, menu.id, menu);
            });
        }

        /**
         * @returns {ContextManager}
         */

    }, {
        key: "onClick",
        value: function onClick() {
            if ((!!this.tgtMenu || this.tgtMenu === 0) && this.doesTargetMenuHaveCells) {
                this.parentManager.menuChanger(this.tgtMenu);
                return;
            }
            console.log("GOING NOWHERE");
        }
    }, {
        key: "loadData",
        value: function loadData(stateSaver) {
            var _this = this;

            var _originalData$source = this.originalData.source,
                source = _originalData$source === undefined ? false : _originalData$source;


            return new Promise(function (resolve, reject) {

                if (!source) {
                    resolve(null);
                    return;
                };

                stateSaver(function () {
                    (0, _axios2.default)({ method: _this.defaultMethod, url: source }).then(function (res) {
                        resolve(res.data);
                    }).catch(function (err) {
                        reject(err);
                    });
                });
            });
        }
    }, {
        key: "insertNewMenu",
        value: function insertNewMenu(data, stateSaver) {
            var _this2 = this;

            var parentManager = this.parentMenu.parentManager;

            var tgtMenu = parentManager.findMenu(this.tgtMenu);

            tgtMenu.addMultipleCells(data.cells, true);

            stateSaver(function () {
                parentManager.menuChanger(_this2.tgtMenu);
            });
        }
    }, {
        key: "internalData",
        value: function internalData() {
            return {
                focused: this.amIFocused,
                active: this.amIActive,
                selected: this.amISelected,
                loading: this.amILoading,
                disabled: this.amIDisabled
            };
        }
    }, {
        key: "defaultClick",
        get: function get() {
            return this.parentMenu.parentManager.props.defaultClick;
        }
    }, {
        key: "amISelected",
        get: function get() {
            return this.parentMenu.selectedCell === this.id;
        }
    }, {
        key: "amIActive",
        get: function get() {
            return this.parentMenu.activeCell === this.id;
        }
    }, {
        key: "amIFocused",
        get: function get() {
            return this.parentMenu.focusedCell === this.id;
        }
    }, {
        key: "amILoading",
        get: function get() {
            return this.parentMenu.loadingCells.indexOf(this.id) > -1;
        }
    }, {
        key: "isMyTargetLoaded",
        get: function get() {
            return this.parentMenu.loadingTargets.indexOf(this.id) > -1;
        }
    }, {
        key: "doIHaveSource",
        get: function get() {
            return !!this.originalData.source;
        }
    }, {
        key: "doesTargetMenuHaveCells",
        get: function get() {
            var tgt = this.targetMenu;
            if (!tgt) return false;
            return tgt.allCells.length > 0;
        }
    }, {
        key: "targetMenu",
        get: function get() {
            return this.parentMenu.parentManager.findMenu(this.tgtMenu);
        }
    }, {
        key: "amIDisabled",
        get: function get() {
            if (this.doIHaveSource) return false;
            if (this.isDisabled !== null) {
                return this.isDisabled;
            }

            var props = this.parentMenu.parentManager.props;
            var disableEmpty = props.disableEmpty,
                hideEmpty = props.hideEmpty;


            if (!disableEmpty && !hideEmpty) {
                this.isDisabled = false;
                return false;
            }

            if (!!this.tgtMenu || this.tgtMenu === 0) {

                var tMenu = this.targetMenu;
                if (tMenu) {
                    this.isDisabled = !this.doesTargetMenuHaveCells;
                } else {
                    this.isDisabled = true;
                }
                return this.isDisabled;
            }

            this.isDisabled = false;
            return this.isDisabled;
        }
    }, {
        key: "parentManager",
        get: function get() {
            return this.parentMenu.parentManager;
        }
    }]);

    return CellElement;
}();

var MenuElement = function () {
    _createClass(MenuElement, [{
        key: "addCell",
        value: function addCell(cell) {
            var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var tgtMenu = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            var newIndex = index === null ? this.allCells.length : index;
            var newCell = new CellElement(cell, newIndex, tgtMenu, this);
            this.allCells.push(newCell);
            return newCell;
        }
    }, {
        key: "addMultipleCells",
        value: function addMultipleCells() {
            var _this3 = this;

            var cells = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            var startOver = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


            if (startOver) {
                this.allCells = [];
                this.filteredCells = [];
                this.visibleCells = [];
                this.currentPage = 1;
                this.pages = 0;
            }

            var newIndx = this.allCells.length;
            cells.forEach(function (cell) {
                _this3.addCell(cell, newIndx, _this3.id);
                newIndx++;
            });

            this.setupCells();
            this.filterCells();
        }
    }]);

    function MenuElement(data, parentManager) {
        var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

        _classCallCheck(this, MenuElement);

        if (data === null) {
            return;
        }
        this.originalData = data;
        this.parentManager = parentManager;

        this.id = id;
        this.isMain = id < 0;

        this.filterWord = '';
        this.filterFunc = defaultFilter;

        this.allCells = [];
        this.filteredCells = [];
        this.visibleCells = [];
        this.selectedCell = null;
        this.focusedCell = null;
        this.activeCell = null;

        this.loadingCells = [];
        this.loadingTargets = [];

        this.perPage = 50;
        this.currentPage = 1;
        this.pages = 0;

        this.setupCells();
        this.filterCells();

        this.domObject = null;

        this.domCellAction = this.domCellAction.bind(this);
        this.reGainFocus = this.reGainFocus.bind(this);
    }

    _createClass(MenuElement, [{
        key: "setupCells",
        value: function setupCells() {
            var _this4 = this;

            var cells = this.originalData.cells || [];
            cells.forEach(function (cell, index) {
                _this4.addCell(cell, index);
            });
        }
    }, {
        key: "filterCells",
        value: function filterCells() {
            var filterWord = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';


            var filter = filterWord.trim();
            var cells = this.allCells;
            var hideEmpty = this.parentManager.props.hideEmpty;

            var emptyFilter = function emptyFilter(cell) {
                return !cell.amIDisabled;
            };

            if (!filter) {
                this.filteredCells = hideEmpty ? cells.filter(emptyFilter) : cells;
            } else {
                if (filter === this.filterWord) return;

                var filterRegExp = new RegExp("(" + filter + ")", 'i');

                this.filteredCells = (hideEmpty ? cells.filter(emptyFilter) : cells).filter(function (cell) {
                    return defaultFilter(cell, filterRegExp);
                });

                this.currentPage = 1;
            }

            this.filterWord = filter;
            this.pages = Math.ceil(this.filteredCells.length / this.perPage);
            this.paginateCells();
        }
    }, {
        key: "paginateCells",
        value: function paginateCells() {
            this.visibleCells = this.filteredCells.slice(0, this.currentPage * this.perPage);
        }
    }, {
        key: "nextPage",
        value: function nextPage() {
            var nextPage = this.currentPage + 1;
            if (nextPage > this.pages) return;

            this.currentPage = nextPage;
            this.paginateCells();
        }
    }, {
        key: "setCellStatus",
        value: function setCellStatus(index) {
            var _this5 = this;

            var statuses = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

            statuses.forEach(function (status) {
                _this5[status + "Cell"] = index;
            });
        }
    }, {
        key: "clearCellStatus",
        value: function clearCellStatus() {
            this.setCellStatus(null, ['selected', 'active', 'focused']);
        }
    }, {
        key: "setDomObject",
        value: function setDomObject(obj) {
            this.domObject = obj;
        }
    }, {
        key: "domExist",
        value: function domExist() {
            return this.domObject && this.domObject.current;
        }
    }, {
        key: "domAction",
        value: function domAction(action) {
            if (this.domExist()) {
                action(this.domObject.current);
                return;
            }
            console.log("NO DOM");
        }
    }, {
        key: "domCellAction",
        value: function domCellAction(cellID, action) {
            if (this.domExist()) {
                var domCell = this.findDomCell(cellID);
                if (domCell) {
                    action(domCell);
                }
            }
        }
    }, {
        key: "findDomCell",
        value: function findDomCell(cellID) {
            if (this.domExist() && cellID !== null) {
                return this.domObject.current.querySelector("[data-cell-index='" + cellID + "']");
            }
            return null;
        }
    }, {
        key: "isFirstVisibleCell",
        value: function isFirstVisibleCell(cellID) {
            if (cellID === null || this.visibleCells.length < 1) return false;
            return this.visibleCells[0].id === cellID;
        }
    }, {
        key: "reGainFocus",
        value: function reGainFocus() {

            if (this.focusedCell !== null) {
                this.domCellAction(this.focusedCell, function (el) {
                    el.focus();
                });
                return;
            }
            this.domCellAction(0, function (el) {
                el.focus();
            });
        }
    }, {
        key: "findNexOrPrevCell",
        value: function findNexOrPrevCell(element) {
            var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'next';

            var founded = false;
            if (!element) return null;

            while (!founded) {

                if (element.classList.contains('disabled')) {
                    element = element[direction === 'next' ? 'nextSibling' : 'previousSibling'];
                } else {
                    founded = true;
                }
                if (!element) {
                    founded = true;
                }
            }
            return element;
        }
    }]);

    return MenuElement;
}();

var ContextManager = exports.ContextManager = function () {
    _createClass(ContextManager, [{
        key: "changeCurrent",
        value: function changeCurrent(nextMenu) {
            var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : FWD;


            if (nextMenu === this.currentMenu) return false;
            if (nextMenu !== null) nextMenu = parseInt(nextMenu, 10);

            this.currentMenu = nextMenu;
            this.direction = direction;

            if (nextMenu !== null) {
                this.history.push(nextMenu);
            }

            return this.returnMovement();
        }
    }, {
        key: "previousMenu",
        value: function previousMenu() {
            var len = this.history.length;
            if (len === 0) return false;

            var prev = this.history.pop();

            if (len === 1) {
                this.changeCurrent(null, BKW);
            } else {
                this.changeCurrent(prev, BKW);
            }

            return this.returnMovement();
        }
    }, {
        key: "returnMovement",
        value: function returnMovement() {
            return {
                currentMenu: this.currentMenu,
                backEnabled: this.history.length > 0,
                direction: this.direction
            };
        }
    }, {
        key: "workingMenu",


        /**
         * @returns {menuElement}
         */
        get: function get() {
            var current = this.currentMenu;
            return current === null ? this.mainMenu : this.menus[current];
        }
    }, {
        key: "currentMenuArray",
        get: function get() {
            return [this.workingMenu];
        }
    }]);

    function ContextManager(props, menuChanger) {
        _classCallCheck(this, ContextManager);

        this.id = "rtv_" + Date.now();
        this.props = Object.assign({}, props);
        /**@type {Array} */
        this.menus = [];
        this.menuChanger = menuChanger;
        this.mainMenu = {};
        this.currentMenu = null;
        this.direction = FWD;
        this.history = [];

        this.domContainer = null;
        this.domSearchField = null;
        this.searchFocused = false;

        this.setupMenus();
        this.createMainMenu();
    }

    _createClass(ContextManager, [{
        key: "updateMenus",
        value: function updateMenus(props) {
            this.props = Object.assign({}, props);
            this.mainMenu = {};
            this.menus = [];
            this.setupMenus();
            this.createMainMenu();
        }
    }, {
        key: "setupMenus",
        value: function setupMenus() {
            var _this6 = this;

            var menus = this.props.loadedMenus || this.props.menus;
            menus.forEach(function (menu, index) {
                _this6.menus[index] = new MenuElement(menu, _this6, index);
            });
        }
    }, {
        key: "paginateCells",
        value: function paginateCells(cells, menuIndex) {
            return this.menus[menuIndex].cells.slice(0, 50);
        }
    }, {
        key: "filterCells",
        value: function filterCells() {
            var word = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
            var menuIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            var menu = menuIndex !== null ? this.menus[menuIndex] : this.workingMenu;
            menu.filterCells(word);
        }
    }, {
        key: "createMainMenu",
        value: function createMainMenu() {
            var _this7 = this;

            this.mainMenu = new MenuElement({
                label: this.props.homeLabel || "HOME",
                cells: []
            }, this);

            this.menus.forEach(function (menu) {
                var _menu$originalData = menu.originalData,
                    cells = _menu$originalData.cells,
                    props = _objectWithoutProperties(_menu$originalData, ["cells"]);

                var cell = _this7.mainMenu.addCell(props, null, menu.id, cells);
                /* cell.onClick = ()=>{
                    this.menuChanger( menu.id );
                } */
            });

            this.mainMenu.setupCells();
            this.mainMenu.filterCells();
        }
    }, {
        key: "findDomSearchInput",
        value: function findDomSearchInput(_ref) {
            var _ref$current = _ref.current,
                current = _ref$current === undefined ? null : _ref$current;

            if (!current) return null;
            this.domSearchField = current.querySelector('input');
            return this.domSearchField;
        }
    }, {
        key: "findMenu",
        value: function findMenu(id) {
            if (id === -1 || id === null) return this.mainMenu;
            return this.menus.find(function (menu) {
                return menu.id === id;
            });
        }
    }]);

    return ContextManager;
}();