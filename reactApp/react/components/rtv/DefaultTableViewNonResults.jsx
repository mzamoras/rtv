/*
 * File: DefaultTableViewNonResults.jsx | Package: React Table View
 * 
 * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
 * Created: 31 Aug, 2018 | 10:01 AM
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
import { nonResStyle } from './defaultElementsStyle';

const DefaultTableViewNonResults = ({ classes, ...restOfTheProps }) => {
    
    const { filter } = restOfTheProps;
    const message    = filter === '' ? "Sorry, no results found." : "Sorry, no results for your search"; 

    return(
        <div className={classes.root}>
            <i className='material-icons'>extension</i>
            <span>{message}</span> 
        </div>
    );
} 

export default withStyles( nonResStyle )( DefaultTableViewNonResults );