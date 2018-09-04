/*
 * File: TableViewFooter.jsx | Package: React Table View
 * 
 * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
 * Created: 03 Aug, 2018 | 03:05 AM
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

export default class TableViewFooter extends React.Component{
    render(){
        
        const { footerComponent: Component, passingContext } = this.props;

        const footerPassingProps = {
            ...exportableData( passingContext )
        };

        return(
            <div className={this.props.className}>
                <Component passingProps={footerPassingProps}/>
            </div>
        )
    }
}