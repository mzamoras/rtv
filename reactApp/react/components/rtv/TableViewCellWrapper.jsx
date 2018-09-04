/*
 * File: TableViewCellWrapper.jsx | Package: React Table View
 * 
 * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
 * Created: 18 Jul, 2018 | 05:05 AM
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
import shallowEqual from 'shallowequal';
import classNames from 'classnames';
import autobind from 'react-autobind-helper';
import { objectsCssClasses } from './domHelpers';


export default class TableViewCellWrapper extends React.Component{

    constructor(props){
        super(props);
        autobind(this);

        this.state = {
            isLoading: false,
            hasError : false
        }
    }

    onClick(){
        const { isLoading, hasError }   = this.state
        const { cellElement, onClick }  = this.props;

        if( isLoading || hasError || cellElement.amIDisabled) return;

        let proceed = false;
        let data    = null;

        onClick( cellElement.id );

        cellElement.loadData(
            this.setLoading
        ).then( data =>{
            
            proceed = cellElement.defaultClick( {
                    cellProps      : cellElement.originalData,
                    downloadedData : data,
                    gotoMenu       : cellElement.gotoMenu.bind(cellElement),
                    setLoadingFalse: this.unsetLoading,
                    menuFinder     : cellElement.menuFinder.bind(cellElement)
                });

             if( proceed ){
                 if( !!data ){
                     cellElement.insertNewMenu( data, this.unsetLoading );
                     return;
                 }
                 cellElement.onClick();
             }
             else if( !!data ){
                 this.unsetLoading();
             }

        } ).catch( err =>{
            this.setState({ isLoading: false, hasError: true });
        } )

    }

    setLoading( callback ){
        this.setState( {isLoading: true }, callback);
    }

    unsetLoading( callback ){
        this.setState( {isLoading: false }, callback);
    }

    cleanStatus( callback ){
        this.setState({ isLoading: false, hasError: false }, callback );
    }

    onFocus(event){
        const { id, amIDisabled } = this.props.cellElement;
        if( this.props.focused || amIDisabled) return;
        this.props.onFocus( id, event.target );
    }

    onErrorCellReload(){
        this.cleanStatus( ()=>{
            this.onClick();
        } )
    }

    onErrorCellCancel(){
        this.cleanStatus();
    }

    shouldComponentUpdate( nextProps, nextState ){
        const { cellElement:_old, ...oldProps } = this.props;
        const { cellElement:_new, ...newProps } = nextProps;
        return !shallowEqual( nextState, this.state ) ||
        !shallowEqual( oldProps, newProps );
    }

    statusProps(){
        return{
            selected: this.props.selected,
            active  : this.props.active,
            focused : this.props.focused,
            disabled: this.props.cellElement.amIDisabled,
            error   : this.state.hasError,
            loading : this.state.isLoading
        }
    }

    wraperProps( statusProps ){
        const { cellWrapper } = objectsCssClasses;
        const { className }   = this.props;
        return {
            onClick  : this.onClick,
            onFocus  : this.onFocus,
            className: classNames( className, cellWrapper, statusProps),
            tabIndex : -1
        }
    }

    cellProps( statusProps ){
        const { cellElement } = this.props;
        return{
            cellElement: cellElement,
            cellData   : cellElement.originalData,
            menuData   : cellElement.parentMenu.originalData,
            onRetry    : this.onErrorCellReload,
            onCancel   : this.onErrorCellCancel,
            ...statusProps
        }
    }

    render(){

        const { component: Cell, cellElement } = this.props;
        
        const statusProps  = this.statusProps();
        const wrapperProps = this.wraperProps( statusProps );
        const cellProps    = this.cellProps( statusProps );

        return(
            <div data-cell-index={ cellElement.id } {...wrapperProps}>
                <Cell { ...cellProps }/>
            </div>
        );
    }
}
