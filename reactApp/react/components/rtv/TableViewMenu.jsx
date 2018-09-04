/*
 * File: TableViewMenu.jsx | Package: React Table View
 * 
 * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
 * Created: 14 Jul, 2018 | 05:53 AM
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
import shallowEqual from 'shallowequal';
import autobind from 'react-autobind-helper';
import withStyles from '@material-ui/core/styles/withStyles';
import Scrollbars from 'react-sb3';
import {menuStyles} from './localStyles';
import List from '@material-ui/core/List';

import TableViewCellWrapper from './TableViewCellWrapper';
import DefaultTableViewCell from './DefaultTableViewCell';
import TableViewNonResults from './TableViewNonResults';
import DefaultTableViewNonResults from './DefaultTableViewNonResults';


import { objectsCssClasses, onSimpleKeyEvent } from './domHelpers';

class TableViewMenu extends React.Component{
    
    constructor(props){
        
        super(props);
        autobind(this);

        const { menuElement } = this.props;

        this.state = {
            active  : menuElement.activeCell,
            selected: menuElement.selectedCell,
            focused : menuElement.focusedCell,
            page    : menuElement.currentPage,
            nextPage: true
        };

        this.lastSearch = this.props.menuElement.filterWord;
        this.domObj     = React.createRef();

        this.focusTO  = null;
        this.nextPage = true;
        this.pageTO   = null;
        this.clickTO  = null;

        menuElement.setDomObject( this.domObj );
    }

    unselectAll(){
        const { selected, active, focused } = this.state;
        if( selected === null && active === null && focused === null ){
            this.props.passingContext.onCloseSearch();
            return;
        }

        this.props.menuElement.clearCellStatus();
        this.setState( { selected: null, active: null, focused: null });

        this.props.menuElement.domCellAction( this.state.focused, el =>{
            el.blur();
        });

        this.props.menuElement.domAction( el =>{
            el.focus();
        } )
    }

    onCellClick( index, callback = null ){
        this.props.menuElement.clearCellStatus();
        this.props.menuElement.setCellStatus( index, ['selected','active','focused'] );
        this.setState( { selected: index, active: index, focused: index }/* , ()=>{
            if( callback ){
                this.clickTO = setTimeout( ()=>{
                    callback();
                    clearTimeout( this.clickTO );
                }, 0 );
            }
        } */ );
    }

    onCellFocus( index, target ){
        this.props.menuElement.setCellStatus( index, ['focused','selected'] );
        this.setState( { focused: index, selected:index } );
    }

    onKeyDown( event ){
        
        onSimpleKeyEvent( ["ArrowDown","Tab"], event, this.onArrowDown );
        onSimpleKeyEvent( "ArrowUp", event, this.onArrowUp );
        onSimpleKeyEvent( "ArrowLeft", event, this.props.passingContext.onGoBack );
        onSimpleKeyEvent( ["ArrowRight","Enter"], event, this.onArrowRight );
        onSimpleKeyEvent( ["Escape"], event, this.unselectAll );
    }

    onArrowDown( event ){
        const { focused }     = this.state;
        const isFocused       = focused !== null ;

        event.preventDefault();
        event.stopPropagation();

        this.props.menuElement.domCellAction( isFocused ? focused : 0, el => {
            const element = this.props.menuElement.findNexOrPrevCell( isFocused ? el.nextSibling : el, 'next' );
            if( !!element ){
                this.focusCell( element, isFocused ? null : 0 );
            }
        } );
    }

    onArrowUp( event ){
        const { focused }     = this.state;
        const isFocused       = focused !== null;

        event.preventDefault();
        event.stopPropagation();
        
        if( isFocused && this.props.menuElement.isFirstVisibleCell( focused ? focused : 0 )){
            this.props.passingContext.onOpenSearch();
            return;
        }

        this.props.menuElement.domCellAction( isFocused ? focused : 0, el => {
            const element = this.props.menuElement.findNexOrPrevCell( isFocused ? el.previousSibling : el, 'prev' );
            if( !!element ){
                this.focusCell( element, isFocused ? null : 0 );
            }
        } );
    }

    onArrowRight( ){

        const { selected }   = this.state;
  
        if(selected !== null){
            this.props.menuElement.domCellAction( selected, el => {
                el.click();
            } );
        }
    }

    focusCell( element, index = null, timeOut = false ){

        if( !element ) return; 
        if( index === null ) index = parseInt(  element.getAttribute("data-cell-index") ,10 );
        if( !document.hasFocus()) {
            this.onCellFocus( index );
            return;
        }
        if(!timeOut){
            element.focus();
            return;
        }
        this.focusTO = setTimeout( ()=>{
            element.focus();
            clearTimeout( this.focusTO );
        } ,timeOut)
    }

    onScrollFrame({ atBottom }){
        const { menuElement } = this.props;
        const { page }        = this.state;

        if( atBottom && this.nextPage && ( page -1 ) <  menuElement.pages ){
            this.nextPage = false;
            menuElement.nextPage();
            this.setState( { page: menuElement.currentPage } );
            this.pageTO = setTimeout( ()=>{
                this.nextPage = true;
                clearTimeout( this.pageTO );
            }, 200 );
        }
    }

    componentDidMount(){
        this.props.menuElement.domAction( el=>{
            el.focus();
        } );
    }

    componentWillUnmount(){
        clearTimeout( this.focusTO );
        clearTimeout( this.pageTO );
    }

    shouldComponentUpdate( nextProps, nextState ){
        const searchChanged = !shallowEqual( nextProps.menuElement.filterWord, this.lastSearch );
        const shouldUpdate  = !shallowEqual( nextProps.in, this.props.in ) || 
               !shallowEqual( nextProps.menuElement, this.props.menuElement ) || 
               searchChanged || 
               !shallowEqual( nextState, this.state ) ;
        if( searchChanged ){
            this.lastSearch = nextProps.menuElement.filterWord;
        }   
        return shouldUpdate; 
    }

    componentDidUpdate( ){
        
        const { menuElement }       = this.props;
        const { id, parentManager } = menuElement;
        const { currentMenu }       = parentManager;
        const isThisMain            = menuElement.id === -1;
        const isThisCurrent         = (isThisMain && currentMenu === null) || ( !isThisMain && currentMenu === id );
        
        menuElement.setDomObject( this.domObj );
        
        if( this.props.in && (isThisCurrent) && !parentManager.searchFocused ){
            this.props.menuElement.domAction( el=>{
               el.focus();
            } );
        }
    }

    render(){

        const { menuElement, listWrapper } = this.props;
        const { isMain, visibleCells, id } = menuElement;

        const cells           = visibleCells || [];
        const Wrapper         = listWrapper || List;
        const { menuWrapper } = objectsCssClasses;
        const wrappIndex      = isMain ? -1 : id;
        const emptyResults    = cells.length === 0;

        const elementClasses = {
            root: classNames(this.props.classes.root, { visible: true })
        };
        const mainWrapperClass = classNames( menuWrapper, { empty: emptyResults } );

        const commonProps = {
            onClick      : this.onCellClick,
            onFocus      : this.onCellFocus,
            component    : DefaultTableViewCell,
            className    : this.props.classes.cellWrapper
        };

        const nonResultProps = {
            component     : DefaultTableViewNonResults,
            menuElement   : menuElement,
            className     : this.props.classes.nonResults,
            passingContext: this.props.passingContext
        };
        
        return(
            <Scrollbars elementClasses={ elementClasses }  onScrollFrame={this.onScrollFrame}>
                <div ref={this.domObj } onKeyDown={this.onKeyDown} className={mainWrapperClass} tabIndex="-1" data-indx={ wrappIndex }>
                    <Wrapper>
                        { cells.map( cell =>{
                            return( 
                                <TableViewCellWrapper  
                                    key={"cell" + cell.id} 
                                    active={ cell.amIActive }
                                    selected={ cell.amISelected }
                                    focused={ cell.amIFocused }
                                    disabled={cell.amIDisabled}
                                    cellElement={cell}
                                    { ...commonProps }
                                />
                            );
                        } ) }
                        { emptyResults && <TableViewNonResults {...nonResultProps}/> }
                    </Wrapper>
                </div>
            </Scrollbars>
        );
    }
}

export default withStyles(menuStyles)(TableViewMenu);