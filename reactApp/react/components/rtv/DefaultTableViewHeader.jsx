/*
 * File: DefaultTableViewHeader.jsx | Package: React Table View
 * 
 * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
 * Created: 20 Jul, 2018 | 12:16 AM
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
import TableViewButton from './TableViewButton';
import { UpperCasedBold } from "./TextWrappers";
import { headerStyle } from './defaultElementsStyle';

const DefaultTableViewHeader =  ({ visible=true, children, classes, passingProps }) =>{
    
    if(!visible) return null;

    const { backEnabled, onGoBack, onOpenSearch, data } = passingProps;

    const cssBackWrapper   = classNames( "back", classes.buttonWrapper );
    const cssSearchWrapper = classNames( "search", classes.buttonWrapper );
    
    return(
        <div className={ classes.root }>

            <div className={cssBackWrapper}>
                <TableViewButton 
                    icon='arrow_back' 
                    aria-label="Go Back" 
                    onClick={onGoBack} 
                    className={classes.button} 
                    disabled={!backEnabled}
                />
            </div>

            <div className={classes.label}>
                <UpperCasedBold>{data.label}</UpperCasedBold>
            </div>

            <div className={cssSearchWrapper}>
                <TableViewButton 
                    icon='search' 
                    aria-label="Open Search" 
                    onClick={onOpenSearch} 
                    className={classes.button} 
                />
            </div>

        </div>
    );
};

export default withStyles( headerStyle )( DefaultTableViewHeader )