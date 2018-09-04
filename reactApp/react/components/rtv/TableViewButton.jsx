/*
 * File: TableViewButton.jsx | Package: React Table View
 * 
 * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
 * Created: 20 Jul, 2018 | 12:10 AM
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
import IconButton from '@material-ui/core/IconButton';

const TableViewButton = ( { visible = true, icon, ...props } ) => {
    if( !visible ) return null;
    
    return(
        <IconButton {...props}>
            <i className="material-icons">{icon}</i>
        </IconButton>
    )
};

export default TableViewButton;