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

const flexCenter = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}

const iconicButton = {
    width: 20,
    height:20,
    minHeight: 20,
    "& i.material-icons":{
        fontSize:16
    }
};

const fullPos0 = {
    position: "absolute",
    top     : 0,
    left    : 0,
    right   : 0,
    bottom  : 0,
}


export const headerStyle = theme => {
    
    return {
        root:{
            display: "grid",
            width: "100%",
            height: "100%",
            gridTemplateColumns: '40px auto 40px'
        },
        label:{
            gridColumnStart: 2,
            gridColumnEnd: 2,
            textAlign: "center",
            ...flexCenter
        },
        buttonWrapper:{
            ...flexCenter,
            "&.back":{
                gridColumnStart: 1,
                gridColumnEnd: 1,
            },
            "&.search":{
                gridColumnStart: 3,
                gridColumnEnd: 3,
            }
        },

        button:{
            ...iconicButton
        },

        records:{
            gridColumnStart: 3,
            gridColumnEnd: 3,
            ...flexCenter
        },
        counter:{
            color: "white",
            backgroundColor: "#CC0000",
            fontSize: 9,
            fontWeight: "bold",
            borderRadius: '50px',
            padding: '2px 8px'
        }
    };
};

export const searchBoxStyle = theme => {
    return {
        root:{
            display: "grid",
            width: "100%",
            height: "100%",
            gridTemplateColumns: '40px auto 40px',

            "& i.material-icons":{
                fontSize: 16,
            },

            "& .__inputContainer" :{
                gridColumnStart: 2,
                gridColumnEnd: 2,
                position: 'relative',
                ...flexCenter,

                "& button":{
                    width: 20,
                    height: 20,
                    minHeight: 20,
                    position: 'absolute',
                    right: 2,
                }
            },
            "& .__rightContainer":{
                    gridColumnStart: 3,
                    gridColumnEnd: 3,
                    fontSize: 9,
                    ...flexCenter,
            },
            "& .__leftContainer":{
                gridColumnStart: 1,
                gridColumnEnd: 1,
                ...flexCenter,
            }
            
        },
        searchInput:{
            height: '18px',
            borderRadius: '50px',
            outline: 'none',
            border: '1px solid #DDD',
            padding: '0 10px',
            fontSize: 12,
            fontFamily: 'inherit'
        },
        button:{
            ...iconicButton
        },
    };
};

export const footerStyle = theme =>{

    return {
        root:{
            ...theme.typography.body1,
            ...flexCenter,
            userSelect: 'none',
            cursor: 'default',
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
            fontWeight: "bold",
            textTransform: 'uppercase',
            flexDirection: 'column',
            lineHeight: '11px'
        }
    }
};

export const cellStyle = theme =>{

    const { transitions, palette } = theme;

    const trans = transitions.create( 'all', {
        easing  : transitions.easing.sharp,
        duration: transitions.duration.shortest
    } );


    return{
        root:{
            userSelect: 'none',
            position:"relative",
            transition: trans,
            "&:hover, &.focused:hover":{
                backgroundColor: palette.grey["400"]
            },
            "&:focus":{
                outline: "none",
            },
            "&.focused":{
                backgroundColor: palette.grey["300"]
            },
            "&.active":{
                backgroundColor: palette.secondary.main,//"rgba(204,0,0,0.4)",
                color: palette.secondary.contrastText,
                "& span, & p, & i":{
                    color: palette.secondary.contrastText + " !important",
                    opacity: 0.9
                },
                "& i":{
                    opacity: 0.8
                },
                "&:hover":{
                    backgroundColor: palette.secondary.dark//"rgba(204,0,0,0.7)",
                },
                "&.focused":{
                    backgroundColor: palette.secondary.light
                }
            },
            
        },

        '@keyframes rtv-progress-circular-rotate': {
            '100%': {
              transform: 'rotate(360deg)'
            }
        },

        mainText:{ 
            fontSize: 14
         },

         secondaryText:{
             fontSize: 11.5,
             letterSpacing: -0.3
         },
         icon:{
             padding:0,
             marginRight: 0,
             maxWidth: 30,
             "&.rotation":{
                animation: 'rtv-progress-circular-rotate 1.4s ease-in-out infinite',
            }
         }, 
         iconButton:{
             width: 24,
             height: 24,
             "& .material-icons":{
                fontSize: 20,
             }
         }
    }
};

export const nonResStyle = theme => {

    const { palette } = theme;

    return{
        root:{
            
            ...fullPos0,
            ...flexCenter,
            flexDirection: 'column',
            "& i":{
                color: palette.grey['300'],
                fontSize: 72,
                padding: 20,
                textShadow: '0 -1px 0 rgba(0,0,0,0.2)'
            },
            "& span":{
                fontFamily: theme.typography.body1.fontFamily,
                fontWeight:theme.typography.body1.fontWeightMedium,
                color: palette.grey['500']
            }
        }
    }
};