/*
 * File: DefaultTableViewCell.jsx | Package: React Table View
 * 
 * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
 * Created: 20 Jul, 2018 | 12:54 AM
 * 
 * O P E N   S O U R C E   C O D E 
 * ---------------------------------
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

import React from 'react';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { cellStyle } from './defaultElementsStyle';
import IconButton from '@material-ui/core/IconButton';
 
const validateIcon = icon =>{
    return icon !== "" ? icon : false
}

const DefaultTableViewCell = ( { label, ...props } ) => {
    
    const cssClass = classNames(props.classes.root,{
        active: props.active,
        selected: props.selected,
        focused: props.focused,
    })

    const mainTextProps = {
        variant:'title', 
        classes:{
            title: props.classes.mainText
        }
    };

    const secondaryTextProps = {
        variant:'body1', 
        classes:{
            body1: props.classes.secondaryText
        }
    };

    const { cellData, menuData } = props;

    const icon = validateIcon(cellData.icon) || validateIcon(menuData.icon) || "person";
 
    const { loading, error, classes, onCancel, onRetry } = props;

    return(
        <ListItem className={cssClass} divider={true} disabled={props.disabled}>
            <ListItemIcon classes={ {root: props.classes.icon } }>
                <i className="material-icons">{icon}</i>
            </ListItemIcon>
            <ListItemText 
                primary={ cellData.label}
                primaryTypographyProps={mainTextProps}
                secondary="This is the description for the current menu"
                secondaryTypographyProps={secondaryTextProps}
                />
            <RightIconElement 
                loading={ loading } 
                error={ error }
                onRetry={ onRetry }
                onCancel={ onCancel }
                classes={ classes }/>
        </ListItem>
    );
};

export default withStyles( cellStyle )( DefaultTableViewCell );

const RightIconElement = props =>{

    if( !props.error && props.loading ){
        return(
            <ListItemIcon classes={ {root: props.classes.icon } }>
                <i className="material-icons rotation">sync</i>
            </ListItemIcon>
        );
    }

    if( !props.loading && props.error ){
        return(
            <ListItemIcon classes={ {root: props.classes.icon } }>
                <IconButton classes={ { root: props.classes.iconButton } } onClick={props.onRetry}>
                    <i className="material-icons">replay</i>
                </IconButton>
            </ListItemIcon>
        );
    }

    return(
        <ListItemIcon classes={ {root: props.classes.icon } }>
            <i className="material-icons">keyboard_arrow_right</i>
        </ListItemIcon>
    );
}