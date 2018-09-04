/*
 * File: DefaultTableViewSearchBox.jsx | Package: React Table View
 * 
 * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
 * Created: 20 Jul, 2018 | 12:44 AM
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
import withStyles from '@material-ui/core/styles/withStyles';
import TableViewButton from './TableViewButton';
import { searchBoxStyle } from './defaultElementsStyle';


const DefaultTableViewSearchBox = ({ visible=true, classes, passingProps })=>{
    
    if(!visible) return null;

    const { onSearchChange, onCloseSearch, filter, totalRecords, onClearFilter } = passingProps;
    const clearVisible = !!filter;

    return(
        <div className={classes.root}>

            

            <div className="__inputContainer">
                <input type="text" value={filter} className={classes.searchInput} onChange={ onSearchChange } placeholder="search"/>
                <TableViewButton 
                    visible={clearVisible}
                    icon='cancel' 
                    aria-label="Clear Search" 
                    onClick={onClearFilter} 
                    className={classes.button} 
                />
            </div>
            
            <div className='__rightContainer'>
                <TableViewButton 
                    icon='clear' 
                    aria-label="Close Search" 
                    onClick={onCloseSearch} 
                    className={classes.button} 
                />
            </div>

        </div>
    );
};

export default withStyles( searchBoxStyle )( DefaultTableViewSearchBox );