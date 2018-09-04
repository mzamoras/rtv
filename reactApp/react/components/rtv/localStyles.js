/*
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
import { objectsCssClasses } from './domHelpers';

const fullPos100 = {
    position: "absolute",
    width   : "100%",
    height  : "100%",
}

const fullPos0 = {
    position: "absolute",
    top     : 0,
    left    : 0,
    right   : 0,
    bottom  : 0,
}

const centerFlex = {
    display       : "flex",
    alignItems    : "center",
    justifyContent: "center",
}

export const wrapperStyles = theme =>{

    const { transitions, palette } = theme;
    const animTrans = transitions.create( 'all', {
        easing  : transitions.easing.sharp,
        duration: transitions.duration.short
    } );
    
    const posIn      = "translateX(0)";
    const posInLeft  = "translateX(-100%)";
    const posInRight = "translateX(100%)";

    return{
        '@keyframes rtv-progress-circular-rotate': {
            '100%': {
              transform: 'rotate(-360deg)'
            }
        },

        root:{
            border       : "1px solid #CCC",
            position     : 'relative',
            width        : "100%",
            height       : "100%",
            display      : "flex",
            flexDirection: "column",
            "&:focus":{
                outline: "none",
            },
            outline: 'none',
        },

        container:{
            flex    : 1,
            position: 'relative',
            overflow: "hidden",
        },

        containerLoading:{
            flex  : 1,
            ...fullPos0,
            ...centerFlex,
            flexDirection:'column',
            font: theme.typography.body1,
            fontWeight: '500',
            color: palette.grey['400'],
            "& i":{
                display:'block',
                fontSize: 72,
                
                "&.rotation":{
                    animation: 'rtv-progress-circular-rotate 1.4s ease-in-out infinite',
                }
            }
        },

        footer:{
            borderTop     : "1px solid #CCCCCC",
            flex          : '0 0 33px',
            fontSize      : 12,
            display       : "flex",
            alignItems    : "center",
            justifyContent: "center",
            backgroundColor: 'transparent'
        },

        header:{
            borderBottom: "1px solid #CCC",
            flex        : '0 0 33px',
            display     : "flex",
            alignItems  : "center",
            overflow    : "hidden",
            position    : "relative",
            
            [`& .${objectsCssClasses.searchBox}`]:{
                zIndex: 2,
                width: '100%',
                height: '100%',
                position: 'absolute',
                background: 'rgba(244,244,255,0.90)',
                transform      : "translateY( 0 )",
                transition     : transitions.create( 'all', {
                    easing  : transitions.easing.sharp,
                    duration: transitions.duration.shortest
                } ),

                '&.hidden':{
                    transform: "translateY( -100% )"
                },

            }
        },

        // A N I M A T I O N S  F O R W A R D

        transAppear:{
        },

        transAppearActive:{
        },

        transEnter:{
            transform: posInRight,
            display  : 'block'
        },

        transEnterActive:{
            transition: animTrans,
            transform : posIn,
        },

        transExit:{
            transform: posIn,
            display  : 'block'
        },

        transExitActive:{
            transition: animTrans,
            transform: posInLeft
        },

        transEnterB:{
            transform: posInLeft,
            display  : 'block'
        },

        transEnterActiveB:{
            transition: animTrans,
            transform : posIn,
        },

        transExitActiveB:{
            transform: posInRight,
            transition: animTrans,
            display: 'block'
        },

        transPosCenter:{
            display: 'block',
            transition: animTrans,
            transform : posIn,
        },

        transPosLeft:{
            display: 'block',
            transition: animTrans,
            transform : posInLeft,
        },

        transPosRight:{
            display: 'block',
            transition: animTrans,
            transform : posInRight,
        },
        exitDone:{
            display:'none'
        },
        appear:{
            display: 'block'
        }

    }
}

export const menuStyles =  theme => {
    return {
        root:{
            ...fullPos0,
            display        : 'none',
            backgroundColor: 'transparent',
            "&.visible": {
                display: 'block'
            },
            [ "& ." + objectsCssClasses.menuWrapper ]:{
                outline: "none",
                "&:focus":{
                    outline: "none"
                },
                "&.empty ul":{
                    padding: 0,
                    ...fullPos0,
                }
            }
        },
        cellWrapper:{
            outline: "none",
            position: "relative",
            
            "& .rtv__cellLoader":{
                zIndex: 1,
                backgroundColor: 'rgba(0,129,204,0.5)',
                color: "white",
                fontSize: 12,
                ...fullPos0,
                ...centerFlex
            },
            "& .rtv__cellError":{
                ...fullPos0,
                ...centerFlex,
                color: "white",
                fontSize: 12,
                zIndex         : 1,
                backgroundColor: "rgba(204,0,0)"
            }
        },
        nonResults:{
            ...fullPos0,
        }
    }
}