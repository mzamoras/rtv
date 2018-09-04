/*
 * File: TableViewContext.jsx | Package: React Table View
 * 
 * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
 * Created: 14 Jul, 2018 | 02:46 AM
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
import PropTypes from 'prop-types';
import autobind from 'react-autobind-helper';

import { ContextManager } from './contextHelpers';
import { onFindCombo, onSimpleKeyEvent } from './domHelpers';

const FWD  = "forward";

export const MainContext = React.createContext();

export class MainContextProvider extends React.Component{

    constructor(props){
        
        super(props);
        autobind(this);
        
        const manager = new ContextManager(props, this.changeCurrentMenu);
 
        this.state={
            menus       : manager.menus,
            mainMenu    : manager.mainMenu,
            currentMenu : null,
            backEnabled : false,
            searchOpen  : false,
            direction   : FWD,
            isSearching : false,
            tableViewID : props.rtv_id,
            contextManager: manager
        }

        this.history   = [];
        this.container = React.createRef();

        this.passingProps = {
            stateChanger     : this.addYear,
            changeCurrentMenu: this.changeCurrentMenu,
            onGoBack         : this.onGoBack,
            onSearchChange   : this.onFilterChange,
            onCloseSearch    : this.onCloseSearch,
            onOpenSearch     : this.onOpenSearch,
            onClearFilter    : this.onClearFilter,

            contextManager: this.state.contextManager,
            onSearchingStatusChange: this.onSearchingStatusChange
        }
    }

    onSearchingStatusChange( status ){
        this.setState({isSearching:status});
    }

    onFilterChange( event ){
        
        const { value } = event.target;
        const { contextManager } = this.state;
        
        contextManager.filterCells( value );

        this.setState({
            mainMenu: contextManager.mainMenu,
            menus   : contextManager.menus,
        })
    }
    
    onClearFilter(){
        const { contextManager } = this.state;
        contextManager.filterCells( '' );
        this.setState({
            mainMenu: contextManager.mainMenu,
            menus   : contextManager.menus,
        })
    }

    onGoBack(){
        const { contextManager } = this.state;
        const prevMenu           = contextManager.previousMenu();

        if( prevMenu ){
            this.setState( prevMenu, contextManager.workingMenu.reGainFocus );
        }
    }

    reFocusContainer(){
        if( !this.history.length && this.state.mainMenu.__data.focused === null){
            this.container.current.focus();
        }
    }

    onCloseSearch(){
        this.setState({ searchOpen: false, isSearching: false });
    }

    onOpenSearch(){
        this.setState({ searchOpen: true },this.focusSerchInput);
    }

    focusSerchInput(){
        const { domSearchField } = this.state.contextManager;
        if( domSearchField ){
            domSearchField.focus();
        }
    }

    changeCurrentMenu( _newMenu = null ){
        const nextMenu = this.state.contextManager.changeCurrent( _newMenu );
        if( nextMenu ){
            this.setState( nextMenu );
        }
    }

    onKeyDown( event ){
        onFindCombo( event, ()=>{
            event.preventDefault();
            this.onOpenSearch();
        } );
        
        onSimpleKeyEvent(["Tab","ArrowDown"], event, ()=>{

            event.preventDefault();
            event.stopPropagation();

            const { workingMenu } = this.state.contextManager;
            const { selectedCell } = workingMenu;
            
            workingMenu.domCellAction( selectedCell === null ? 0 : selectedCell, el =>{
                el.focus();
            } )

        })
    }

        
    render(){
        const { children, rootClassName } = this.props;
        return (
            <MainContext.Provider value={ {
                ...this.passingProps, state: this.state
                } }>
                <div id={ this.state.contextManager.id }
                     onFocus={ this.onFocus }
                     className={rootClassName} 
                     tabIndex="-1" 
                     onKeyDown={this.onKeyDown} 
                     ref={this.container}
                     style={ this.props.style }
                     >
                    {children}
                </div>
            </MainContext.Provider>    
        );
    }

    static getDerivedStateFromProps = (nextProps, nextState) => {

        let update   = false;
        
        if( nextProps.homeLabel !== nextState.mainMenu.label ){
            nextState.contextManager.mainMenu.originalData.label = nextProps.homeLabel;
            update = true;
        }
        if( 
            ( nextProps.menus !== nextState.contextManager.props.menus ) || 
            ( nextProps.hideEmpty !== nextState.contextManager.props.hideEmpty ) ||
            ( nextProps.disableEmpty !== nextState.contextManager.props.disableEmpty ) ||
            ( nextProps.loadedMenus !== nextState.contextManager.props.loadedMenus ) 
        ){
            nextState.contextManager.updateMenus(nextProps);
            update = true;
        }

        if( nextProps.defaultClick !== nextState.contextManager.props.defaultClick ){
            nextState.contextManager.props.defaultClick = nextProps.defaultClick;
            update = true;
        }

        const newState = Object.assign( {}, nextState, { mainMenu: nextState.mainMenu } );

        return update ? newState : nextState;
    }
}

export class MainContextConsumer extends React.Component{

    render(){
        const { visible=true, component:Component, ...allProps } = this.props;

        if( !visible ) return null;

        return(
            <MainContext.Consumer>
                { context=> (
                    <Component passingContext={context} {...allProps}/>
                )}
            </MainContext.Consumer>
        );
    }

    static propTypes = {
        component: PropTypes.any
    }
}

