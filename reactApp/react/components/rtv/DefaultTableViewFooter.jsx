/*
 * File: DefaultTableViewFooter.jsx | Package: React Table View
 * 
 * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
 * Created: 20 Jul, 2018 | 12:59 AM
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
import { footerStyle } from "./defaultElementsStyle";

const DefaultTableViewFooter = ({ className, classes, passingProps })=>{
    
    const { isSearchOpen, totalRecords, totalFiltered, data, filter }  = passingProps;

    const equalRecords = totalRecords === totalFiltered;
    const totalText    =  equalRecords ? `${totalRecords}` : `${totalFiltered} out of ${totalRecords}`;

    return(
        <div className={classes.root}>
            { isSearchOpen &&
                <div>
                    Menu: { data.label }
                </div>
            }
            { totalFiltered > 0 && 
                <div>{ filter === '' ? "Total" : "" } Elements: { totalText }</div>
            }
        </div>
    );
}

export default withStyles( footerStyle )( DefaultTableViewFooter );