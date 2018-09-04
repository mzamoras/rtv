/*
 * File: testObjects.js | Package: React Table View
 * 
 * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
 * Created: 14 Jul, 2018 | 02:49 AM
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
import ReactDOM from 'react-dom'; 
import {DomNodeManager} from './configuration/utilities/tddUtils';
import TableView from '../components/rtv/TableView';
//import testingMenuData from '../../components/workspaceTestingDataCells.json';
//import { Controller } from '../../components/TableViewComponent/Controller.js';


const nodeManager = new DomNodeManager();
nodeManager.component = ( props ) => (
    <TableView {...props}/>
); 



const ComponentSetupWrapper = function( nodeStyle, destroyable, props = {} ){
        
    const { mounter, destroy } = nodeManager.createTestElements( props, nodeStyle );

    this.mounter = mounter;
    this.destroy = () => { destroy( destroyable ) };
    this.refresh = ()=>{

        this.tableView           = () => this.mounter.find("TableView");
        this.tableViewHeader     = () => this.mounter.find("TableViewHeader");
        this.tableViewContainer  = () => this.mounter.find("TableViewContainer");
        this.tableViewFooter     = () => this.mounter.find("TableViewFooter");

        this.defaultHeader         = () => this.mounter.find("DefaultTableViewHeader");
        this.defaultHeaderBtns     = () => this.defaultHeader().find("TableViewButton");
        this.defaultHeaderBtnAt    = indx => this.defaultHeader().find("TableViewButton").at(indx);

        this.defaultSearchBox      = () => this.mounter.find("DefaultTableViewSearchBox");
        this.defaulSearchBoxBtns   = () => this.defaultSearchBox().find("TableViewButton");
        this.defaultSearchBoxBtnAt = indx => this.defaultSearchBox().find("TableViewButton").at(indx);

        
        this.defaultFooter         = () => this.mounter.find("DefaultTableViewFooter");

        this.menuAt                = indx => this.mounter.find("TableViewMenu").at(indx);
        this.menuWrapperAt         = (indx,cssClass) => this.menuAt(indx).find("."+cssClass);
        this.cellAt                = (indx, menuIndx = 0) => this.menuAt(menuIndx).find("TableViewCellWrapper").at(indx).find('div').at(0);
        
        /**this.headerButtons     = () => this.tableViewHeader().find("withStyles(IconButton)");
        this.tableViewFooter   = () => this.mounter.find("TableViewDefaultFooter");
        this.defaultHeader     = () => this.tableViewHeader().find("TableViewDefaultHeader")
        this.searchBox         = () => this.tableViewHeader().find("withStyles(TableViewDefaultSearchBox)");
        this.searchBoxCloseBtn = () => this.searchBox().find("IconButton").first();
        this.searchBoxInput    = () => this.searchBox().find("UnstyledCustomInput");
        this.rootMenu          = () => this.tableView().find('SingleMenu').at(0);
        this.rootCells         = () => this.rootMenu().find("SingleCell"); */
    };
    this.refresh();

    /**@type{Controller} */
    //this.controller = this.tableView().instance().context.controller;
}

/**@type {ComponentSetupWrapper} */
export let data = null;

export const simpleComponentBefore = ( ...newData ) =>{
    return ()=>{
        data = new ComponentSetupWrapper( ...newData );
    }
}

export const simpleComponentDestroy = () => {
    data.destroy();
}

export let controller = null;

export const controllerBefore = ( rootLabel = null, maxCellsPerLoad = 50 ) => {
    return ()=>{
       /*  controller = new Controller( maxCellsPerLoad, rootLabel );
        controller.addMenus( testingMenuData );
        if( rootLabel ){
            controller.addMainMenu();
        } */
    }
}

export const testNode = style => {
    const nodeMaker = nodeManager.makeNode( style );
    const Component = nodeManager.componentToTest;
    ReactDOM.render( <Component/> , nodeMaker.node, function({...args}){
        console.log( arguments, Component );
    } );
}



const createCells = ( quantity = 10, menuTitle ) => {
    const allCells = [];
    for (let index = 0; index < quantity; index++) {
        const _indx = index + 1;
        const newTitle = `${menuTitle} Cell ${_indx}`;
        allCells[ index ] = {
            "code"  : newTitle.trim().toLowerCase(),
            "label" : newTitle,
            "id"    : index,
            "action": "",
            "target": "",
            "icon"  : ""
        }
    }
    return allCells;
}

export const createMenu = ( title, quantity, id, icon = 'inbox' )=>{ 
    return {
        "code"      : title.trim().toLowerCase(),
        "label"     : title,
        "id"        : id,
        "icon"      : icon,
        "filterFunc": "default",
        "color"     : "green",
        "status"    : "active",
        "cells"     : createCells( quantity, title )
     }
}