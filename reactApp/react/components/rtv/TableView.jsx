/*
 * File: TableView.jsx | Package: React Table View
 * 
 * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
 * Created: 14 Jul, 2018 | 02:45 AM
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
import withStyles from '@material-ui/core/styles/withStyles';
import { wrapperStyles } from './localStyles';
import { MainContextProvider, MainContextConsumer } from './TableViewContext';

import DefaultTableViewHeader from './DefaultTableViewHeader';
import DefaultTableViewFooter from './DefaultTableViewFooter';
import DefaultTableViewSearchBox from './DefaultTableViewSearchBox';

import TableViewContainer from './TableViewContainer';
import TableViewHeader from './TableViewHeader';
import TableViewFooter from './TableViewFooter';

import axios from 'axios';

class TableView extends React.Component{
    
    constructor(props){
        super(props);

        this.transitionClasses =  {
            forward:{
                enter      : props.classes.transEnter,
                enterActive:  props.classes.transEnterActive,
                exit       : props.classes.transExit,
                exitActive : props.classes.transExitActive,
                exitDone: props.classes.exitDone,
                appear: props.classes.appear,
            },
            backward:{
                enter      : props.classes.transEnterB,
                enterActive:  props.classes.transEnterActiveB,
                exit       : props.classes.transExit,
                exitActive : props.classes.transExitActiveB,
                exitDone: props.classes.exitDone,
                appear: props.classes.appear,
            }
        }

        this.state = {
            loadedMenus : false,
            loading     : !!props.menusUrl,
            errorLoading: false
        }
    }

    componentWillMount(){
        if( this.props.menusUrl ){
            this.loadMenus();
        }
    }

    componentDidUpdate( prevProps ){
        if( this.props.menusUrl !== prevProps.menusUrl ){
            this.setState( { loading: true }, this.loadMenus );
        }
    }

    loadMenus(){
        axios( { method: 'get', url: this.props.menusUrl } )
        .then( ( { data } )=>{
            let newData = data;
            if( this.props.formatMenus ){
                newData = this.props.formatMenus( data ) || data;
            }
            this.setState( { loadedMenus: newData, loading: false } )
        })
        .catch( err => {
            console.log("error", err);
            this.setState({ loading: false, errorLoading: true })
        });
    }

    render(){

        const {  root, container, footer, header } = this.props.classes;
        const loadingProps = {
            loading: this.state.loading,
            errorLoading: this.state.errorLoading,
            className: this.props.classes.containerLoading
        }
        
        return(
            <MainContextProvider {...this.props} loadedMenus={this.state.loadedMenus} rootClassName={root}>
                
                <MainContextConsumer 
                    component={ TableViewHeader } 
                    headerComponent={ DefaultTableViewHeader }
                    searchBoxComponent={ DefaultTableViewSearchBox }
                    className={header}
                    visible={this.props.showHeader}
                    />
                <TableViewContainer className={container} transitionClasses={this.transitionClasses} loadingProps={loadingProps}/>
                <MainContextConsumer 
                    component={ TableViewFooter } 
                    footerComponent={ DefaultTableViewFooter }
                    className={footer}
                    visible={this.props.showFooter}
                    />    
            </MainContextProvider>
        );
    }

    static defaultProps = {
        menus       : [],
        homeLabel   : "Home",
        showHeader  : true,
        showFooter  : true,
        disableEmpty: false,
        hideEmpty   : false,
        defaultClick: ()=>true,
        urlFormatter: data => data.source || null,
        style       : {}
    }

    static propTypes = {
        menus       : PropTypes.any,
        homeLabel   : PropTypes.string,
        showHeader  : PropTypes.bool,
        showFooter  : PropTypes.bool,
        disableEmpty: PropTypes.bool,
        hideEmpty   : PropTypes.bool,
        defaultClick: PropTypes.func,
        urlFormatter: PropTypes.func,
        style       : PropTypes.object
    }
}

export default withStyles( wrapperStyles )( TableView );