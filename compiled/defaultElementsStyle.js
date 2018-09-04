"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*
 * File: defaultElementsStyle.js | Package: React Table View
 * 
 * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
 * Created: 19 Jul, 2018 | 05:24 PM
 * 
 * O P E N   S O U R C E   C O D E 
 * ---------------------------------
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

var flexCenter = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
};

var iconicButton = {
    width: 24,
    height: 24,
    minHeight: 24,
    "& i": {
        fontSize: 16
    }
};

var headerStyle = exports.headerStyle = function headerStyle(theme) {

    return {
        root: {
            display: "grid",
            width: "100%",
            height: "100%",
            gridTemplateColumns: '40px auto 40px'
        },
        label: _extends({
            gridColumnStart: 2,
            gridColumnEnd: 2,
            textAlign: "center"
        }, flexCenter),
        buttonWrapper: _extends({}, flexCenter, {
            "&.back": {
                gridColumnStart: 1,
                gridColumnEnd: 1
            },
            "&.search": {
                gridColumnStart: 3,
                gridColumnEnd: 3
            }
        }),

        button: _extends({}, iconicButton),

        records: _extends({
            gridColumnStart: 3,
            gridColumnEnd: 3
        }, flexCenter),
        counter: {
            color: "white",
            backgroundColor: "#CC0000",
            fontSize: 9,
            fontWeight: "bold",
            borderRadius: '50px',
            padding: '2px 8px'
        }
    };
};

var searchBoxStyle = exports.searchBoxStyle = function searchBoxStyle(theme) {
    return {
        root: {
            display: "grid",
            width: "100%",
            height: "100%",
            gridTemplateColumns: '40px auto 40px',

            "& i.material-icons": {
                fontSize: 16
            },

            "& .__inputContainer": _extends({
                gridColumnStart: 2,
                gridColumnEnd: 2,
                position: 'relative'
            }, flexCenter, {

                "& button": {
                    width: 24,
                    height: 24,
                    minHeight: 24,
                    position: 'absolute',
                    right: 2
                }
            }),
            "& .__rightContainer": _extends({
                gridColumnStart: 3,
                gridColumnEnd: 3,
                fontSize: 9
            }, flexCenter),
            "& .__leftContainer": _extends({
                gridColumnStart: 1,
                gridColumnEnd: 1
            }, flexCenter)

        },
        searchInput: {
            height: '18px',
            borderRadius: '50px',
            outline: 'none',
            border: '1px solid #DDD',
            padding: '0 10px',
            fontSize: 12,
            fontFamily: 'inherit'
        },
        button: _extends({}, iconicButton)
    };
};

var cellStyle = exports.cellStyle = function cellStyle(theme) {
    var transitions = theme.transitions;


    var trans = transitions.create('all', {
        easing: transitions.easing.sharp,
        duration: transitions.duration.shortest
    });
    return {
        root: {
            userSelect: 'none',
            position: "relative",
            transition: trans,
            "&:hover": {
                backgroundColor: "white"
            },
            "&:focus": {
                outline: "none"
            },
            "&.active": {
                backgroundColor: "rgba(204,0,0,0.4)",
                "&:hover": {
                    backgroundColor: "rgba(204,0,0,0.7)"
                }
            },
            "&.focused": {
                backgroundColor: "#CCCCCC"
            }
        },

        '@keyframes rtv-progress-circular-rotate': {
            '100%': {
                transform: 'rotate(360deg)'
            }
        },

        mainText: {
            fontSize: 14
        },

        secondaryText: {
            fontSize: 11.5,
            letterSpacing: -0.3
        },
        icon: {
            padding: 0,
            marginRight: 0,
            maxWidth: 30,
            "&.rotation": {
                animation: 'rtv-progress-circular-rotate 1.4s ease-in-out infinite'
            }
        },
        iconButton: {
            //border: "1px solid green",
            width: 24,
            height: 24,
            "& .material-icons": {
                fontSize: 20

            }
        }
    };
};