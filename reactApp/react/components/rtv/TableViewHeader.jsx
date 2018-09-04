/*
 * File: TableViewHeader.jsx | Package: React Table View
 * 
 * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
 * Created: 15 Jul, 2018 | 03:29 AM
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
import { objectsCssClasses } from './domHelpers';
import { exportableData } from './contextHelpers';

export default class TableViewHeader extends React.Component{

    headerWrapper = React.createRef();

    setSearchStatusTrue = () => {
        this.props.passingContext.onSearchingStatusChange( true );
        this.props.passingContext.contextManager.searchFocused = true;
    }

    setSearchStatusFalse = () =>{
        this.props.passingContext.onSearchingStatusChange( false );
        this.props.passingContext.contextManager.searchFocused = false;
    }

    componentDidMount(){

        const { contextManager } = this.props.passingContext;
        const inputElement       = contextManager.findDomSearchInput( this.headerWrapper );
        
        if( inputElement ){
            inputElement.addEventListener( 'focus', this.setSearchStatusTrue );
            inputElement.addEventListener( 'blur', this.setSearchStatusFalse );
        }
    }

    componentWillUnmount(){

        const { contextManager } = this.props.passingContext;
        const { domSearchField } = contextManager;

        if( domSearchField ){
            domSearchField.removeEventListener( 'focus', this.setSearchStatusTrue );
            domSearchField.removeEventListener( 'blur', this.setSearchStatusFalse );
        }
    }

    render(){
        const { headerComponent: Component, passingContext} = this.props;
        const { className, searchBoxComponent: SBox }       = this.props;
        
        const headerPassingProps = {
            ...exportableData( passingContext )
        };
        
        const cssClasses = classNames( objectsCssClasses.searchBox , { 
            hidden: !headerPassingProps.isSearchOpen 
        } );
        
        return(
            <div className={className} ref={this.headerWrapper}>
                <div className={cssClasses}>
                    <SBox passingProps={headerPassingProps}/>
                </div>
                <Component passingProps={headerPassingProps}/>
            </div>
        );
    }
}
