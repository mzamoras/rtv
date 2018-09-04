/*
 * File: TableViewContainer.jsx | Package: React Table View
 * 
 * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
 * Created: 14 Jul, 2018 | 04:51 AM
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
import { MainContext } from './TableViewContext';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import TableViewMenu from './TableViewMenu';
import SlideTransition from './SlideTransition';

export default class TableViewContainer extends React.Component{
    
    render(){
        return(
            <div className={this.props.className}>

                <MainContext.Consumer>
                    
                    { context => {

                        const { state, contextManager } = context;
                        const { transitionClasses } = this.props;

                        const commonProps = {
                            transitionClasses: transitionClasses,
                            cellElement      : null,
                            passingContext   : context
                        }
                        
                        if( this.props.loadingProps.loading ){
                            //FIXME: Fix the style of the global loading
                            return (
                                <div className={this.props.loadingProps.className}>
                                    <i className="material-icons rotation">sync</i>
                                    <div>Loading Content...</div>
                                </div>
                            );
                        }
                        
                        return (
                            <React.Fragment>
                                <TransitionGroup component={null} childFactory={
                                    child => <SlideTransition key={child.props.pkey} child={child} state={state}/>
                                }>
                                { contextManager.currentMenuArray.map( el =>{
                                    const key = "menu_" + (el.id || "main");
                                    return (
                                        <TableViewMenu 
                                            key={key}
                                            pkey={key}
                                            menuElement={ el }
                                            { ...commonProps }/>
                                    )
                                }) }
                                </TransitionGroup>
                            </React.Fragment>
                        );
                    } }
                </MainContext.Consumer>
            </div>
        );
    }
}