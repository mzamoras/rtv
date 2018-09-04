"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.menuStyles = exports.wrapperStyles = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /*
                                                                                                                                                                                                                                                                   * File: localStyles.js | Package: React Table View
                                                                                                                                                                                                                                                                   * 
                                                                                                                                                                                                                                                                   * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
                                                                                                                                                                                                                                                                   * Created: 14 Jul, 2018 | 03:50 AM
                                                                                                                                                                                                                                                                   * 
                                                                                                                                                                                                                                                                   * O P E N   S O U R C E   C O D E 
                                                                                                                                                                                                                                                                   * ---------------------------------
                                                                                                                                                                                                                                                                   * This source code is licensed under the MIT license found in the
                                                                                                                                                                                                                                                                   * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                   * 
                                                                                                                                                                                                                                                                   * CapitalMental && BackLogics Technologies
                                                                                                                                                                                                                                                                   * Copyright 2014-present. | All rights reserved.
                                                                                                                                                                                                                                                                   */


var _domHelpers = require("./domHelpers");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fullPos100 = {
    position: "absolute",
    width: "100%",
    height: "100%"
};

var fullPos0 = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
};

var centerFlex = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
};

var wrapperStyles = exports.wrapperStyles = function wrapperStyles(theme) {
    var transitions = theme.transitions;

    var animTrans = transitions.create('all', {
        easing: transitions.easing.sharp,
        duration: transitions.duration.short
    });

    var posIn = "translateX(0)";
    var posInLeft = "translateX(-100%)";
    var posInRight = "translateX(100%)";

    return {
        '@keyframes rtv-progress-circular-rotate': {
            '100%': {
                transform: 'rotate(360deg)'
            }
        },

        root: {
            border: "2px solid red",
            position: 'relative',
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            "&:focus": {
                outline: "none",
                //backgroundColor: "green",
                border: "2px solid purple"
            },
            outline: 'none'
        },

        container: {
            flex: 1,
            position: 'relative',
            overflow: "hidden"
            /* "& .rtv__inactiveSlide":{
                display:'none'
            } */
        },

        containerLoading: _extends({
            flex: 1
        }, fullPos0, centerFlex, {
            flexDirection: 'column',
            "& i": {
                display: 'block',
                fontSize: 24,
                "&.rotation": {
                    animation: 'rtv-progress-circular-rotate 1.4s ease-in-out infinite'
                }
            }
        }),

        footer: {
            borderTop: "1px solid #CCCCCC",
            flex: '0 0 33px',
            fontSize: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },

        header: _defineProperty({
            borderBottom: "1px solid #CCC",
            flex: '0 0 33px',
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            position: "relative"

        }, "& ." + _domHelpers.objectsCssClasses.searchBox, {
            zIndex: 2,
            width: '100%',
            height: '100%',
            position: 'absolute',
            background: 'rgba(244,244,255,0.90)',
            transform: "translateY( 0 )",
            transition: transitions.create('all', {
                easing: transitions.easing.sharp,
                duration: transitions.duration.shortest
            }),

            '&.hidden': {
                transform: "translateY( -100% )"
            }

        }),

        // A N I M A T I O N S  F O R W A R D

        transAppear: {},

        transAppearActive: {},

        transEnter: {
            transform: posInRight,
            display: 'block'
        },

        transEnterActive: {
            transition: animTrans,
            transform: posIn
        },

        transExit: {
            transform: posIn,
            display: 'block'
        },

        transExitActive: {
            transition: animTrans,
            transform: posInLeft
        },

        transEnterB: {
            transform: posInLeft,
            display: 'block'
        },

        transEnterActiveB: {
            transition: animTrans,
            transform: posIn
        },

        transExitActiveB: {
            transform: posInRight,
            transition: animTrans,
            display: 'block'
        },

        transPosCenter: {
            display: 'block',
            transition: animTrans,
            transform: posIn
        },

        transPosLeft: {
            display: 'block',
            transition: animTrans,
            transform: posInLeft
        },

        transPosRight: {
            display: 'block',
            transition: animTrans,
            transform: posInRight
        },
        exitDone: {
            display: 'none'
        },
        appear: {
            display: 'block'
        }

    };
};

var menuStyles = exports.menuStyles = function menuStyles(theme) {
    return {
        root: _defineProperty({
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'none',
            "&.visible": {
                display: 'block'
            }
        }, "& ." + _domHelpers.objectsCssClasses.menuWrapper, {
            outline: "none",
            "&:focus": {
                outline: "none"
            }
        }),
        cellWrapper: {
            outline: "none",
            position: "relative",

            "& .rtv__cellLoader": _extends({
                zIndex: 1,
                backgroundColor: 'rgba(0,129,204,0.5)',
                //position: 'absolute',
                //display: "flex",
                //alignItems: "center",
                //justifyContent: "center",
                color: "white",
                fontSize: 12
            }, fullPos0, centerFlex),
            "& .rtv__cellError": _extends({}, fullPos0, centerFlex, {
                color: "white",
                fontSize: 12,
                zIndex: 1,
                backgroundColor: "rgba(204,0,0)"
            })
        }
    };
};