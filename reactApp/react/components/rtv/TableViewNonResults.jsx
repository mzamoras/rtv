/*
 * File: TableViewNonResults.jsx | Package: React Table View
 * 
 * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
 * Created: 31 Aug, 2018 | 09:48 AM
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
import { exportableData } from './contextHelpers';

export default class TableViewNonResults extends React.Component{

    render(){

        const { component: NonResultComponent, menuElement, className } = this.props;
        const passingProps = {
            ...exportableData( this.props.passingContext, menuElement )
        };

        return(
            <div className={className}>
                <NonResultComponent {...passingProps}/>
            </div>
        );
    }
}