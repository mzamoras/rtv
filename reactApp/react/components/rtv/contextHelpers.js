/*
 * File: contextHelpers.js | Package: React Table View
 * 
 * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
 * Created: 16 Jul, 2018 | 03:13 PM
 * 
 * O P E N   S O U R C E   C O D E 
 * ---------------------------------
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */
import axios from 'axios';

const defaultFilter = ( cell, filterRegExp ) => {
    const testable = cell.label || cell.originalData.label;
    return filterRegExp.test( testable );
};
const FWD  = "forward";
const BKW  = "backward";
const NM   = "new menu";


class CellElement{
    constructor( data, id, tgtMenu, parentMenu ){
        this.originalData = data;

        /**@type {MenuElement} */
        this.parentMenu   = parentMenu;
        this.tgtMenu      = tgtMenu;

        this.id = id;
        this.isSelected    = false;
        this.isActive      = false;
        this.isFocused     = false;
        this.isLoading     = false;
        this.isDisabled    = null;
        this.defaultMethod = this.parentMenu.parentManager.props.defaultMethod || 'get';
        this.loadableURL   = null;
    }

    get defaultClick(){
        return this.parentMenu.parentManager.props.defaultClick
    }

    get urlFormatter(){
        return this.parentMenu.parentManager.props.urlFormatter
    }

    get amISelected(){
        return this.parentMenu.selectedCell === this.id;
    }

    get amIActive(){
        return this.parentMenu.activeCell === this.id;
    }

    get amIFocused(){
        return this.parentMenu.focusedCell === this.id;
    }

    get amILoading(){
        return this.parentMenu.loadingCells.indexOf( this.id ) > -1
    }

    get isMyTargetLoaded(){
        return this.parentMenu.loadingTargets.indexOf( this.id ) > -1
    }

    get doIHaveSource(){
        return !!this.originalData.source;
    }

    get doesTargetMenuHaveCells(){
        const tgt = this.targetMenu;
        if( !tgt ) return false;
        return tgt.allCells.length > 0
    }

    get targetMenu(){
        return  this.parentMenu.parentManager.findMenu( this.tgtMenu );
    }

    get targetUrl(){
        return this.urlFormatter( this.originalData );
    }

    get amIDisabled(){
        if(this.doIHaveSource) return false;
        if( this.isDisabled !== null ){
            return this.isDisabled;
        }

        const { props }                   = this.parentMenu.parentManager;
        const { disableEmpty, hideEmpty } = props;

        if( !disableEmpty && !hideEmpty ){
            this.isDisabled = false;
            return false;
        }

        if( !!this.tgtMenu || this.tgtMenu === 0){
            
            const tMenu = this.targetMenu;
            if( tMenu ){
                this.isDisabled = !this.doesTargetMenuHaveCells;
            }
            else{
                this.isDisabled = true;
            }
            return this.isDisabled;
        }
        
        this.isDisabled = false;
        return this.isDisabled;
    }

    gotoMenu( menuData = null ){ console.log("AAA");
        if( !menuData ){
            this.onClick();
            return;
        }
        console.log("GOING TO");
        this.parentManager.menuChanger( menuData.id );
    }

    menuFinder( finderFunction = null){
        if( !finderFunction ) return null;
        return this.parentManager.menus.find( 
            menu => finderFunction( menu.originalData, menu.id, menu ) 
        );
    }

    /**
     * @returns {ContextManager}
     */
    get parentManager(){
        return this.parentMenu.parentManager;
    }

    get isThereMenuToGoTo(){
        return (!!this.tgtMenu || this.tgtMenu === 0) && this.doesTargetMenuHaveCells;
    }

    onClick(){
        if( this.isThereMenuToGoTo ){
            this.parentManager.menuChanger( this.tgtMenu );
            return;
        }
        console.log("GOING NOWHERE",  this.urlFormatter( this.originalData ));
        //this.parentManager.menuChanger( this.tgtMenu );
    }

    loadData( stateSaver ){
        //const { source = false } = this.originalData;
        const source = !this.isThereMenuToGoTo ? this.targetUrl : null;
        return new Promise( (resolve, reject) => {

            if( !source ){
                resolve( null );
                return;
            };
            
            stateSaver( ()=>{
                axios( {method: this.defaultMethod, url: source} )
                .then( res=>{
                    resolve( res.data );
                } )
                .catch( err => {
                    reject( err )
                });
            } );

        } );
    }

    insertNewMenu( data, stateSaver ){
        const { parentManager } = this.parentMenu;
        if( this.tgtMenu === NM ){
            this.tgtMenu = this.parentManager.insertNewMenu( this.originalData );
        }
        const tgtMenu = parentManager.findMenu(this.tgtMenu);
        console.log("INSERTING", data, this.tgtMenu, this.parentMenu);
        tgtMenu.addMultipleCells( data.cells, true);

        stateSaver( ()=>{
            parentManager.menuChanger(this.tgtMenu);
        } );
    }

    internalData(){
        return {
            focused : this.amIFocused,
            active  : this.amIActive,
            selected: this.amISelected,
            loading : this.amILoading,
            disabled: this.amIDisabled
        }
    }
}

class MenuElement{

    addCell( cell, index = null, tgtMenu = NM ){
        const newIndex = index === null ? this.allCells.length : index;
        const newCell  = new CellElement( cell, newIndex, tgtMenu, this );
        this.allCells.push( newCell );
        return newCell;
    }

    addMultipleCells( cells = [], startOver = false ){

        if( startOver ){
            this.allCells      = [];
            this.filteredCells = [];
            this.visibleCells  = [];
            this.currentPage   = 1;
            this.pages         = 0;
        }

        let newIndx = this.allCells.length;
        cells.forEach( cell => {
            this.addCell( cell, newIndx, this.id );
            newIndx ++;
        } );
        
        this.setupCells();
        this.filterCells();
    }

    constructor( data, parentManager, id = -1){
        if( data === null ){
            return;
        }
        this.originalData  = data;
        this.parentManager = parentManager;

        this.id     = id;
        this.isMain = id < 0;

        this.filterWord = '';
        this.filterFunc = defaultFilter;

        this.allCells      = [];
        this.filteredCells = [];
        this.visibleCells  = [];
        this.selectedCell  = null;
        this.focusedCell   = null;
        this.activeCell    = null;

        this.loadingCells   = [];
        this.loadingTargets = [];

        this.perPage     = 50;
        this.currentPage = 1;
        this.pages       = 0;  

        this.setupCells();
        this.filterCells();
        
        this.domObject = null;

        this.domCellAction = this.domCellAction.bind(this);
        this.reGainFocus = this.reGainFocus.bind(this);
    }

    setupCells(){
        const cells = this.originalData.cells || [];
        cells.forEach( ( cell, index )=>{
            this.addCell( cell, index );
        } )
    }

    filterCells( filterWord = '' ){

        const filter        = filterWord.trim();
        const cells         = this.allCells;
        const { hideEmpty } = this.parentManager.props;
        const emptyFilter   = cell => !cell.amIDisabled;
        
        if( !filter ){
            this.filteredCells = hideEmpty ? cells.filter(emptyFilter) : cells;
        }
        else{
            if( filter === this.filterWord ) return;

            const filterRegExp =  new RegExp( `(${filter})`, 'i' );
            
            this.filteredCells = ( hideEmpty ? cells.filter( emptyFilter ) : cells).filter( cell => {
                return defaultFilter(cell, filterRegExp)
            } );

            this.currentPage = 1;
        }
    
        this.filterWord = filter;
        this.pages      = Math.ceil( this.filteredCells.length / this.perPage );
        this.paginateCells();
    }

    paginateCells(){
        this.visibleCells = this.filteredCells.slice( 0, this.currentPage * this.perPage );
    }

    nextPage(){
        const nextPage = this.currentPage + 1;
        if( nextPage > this.pages ) return;

        this.currentPage = nextPage;
        this.paginateCells();
    }

    setCellStatus( index, statuses = [] ){
        statuses.forEach( status=>{
            this[`${status}Cell`] = index;
        } );
    }

    clearCellStatus(){
        this.setCellStatus( null, ['selected', 'active', 'focused'] );
    }

    setDomObject( obj ){
        this.domObject = obj;
    }

    domExist(){
        return this.domObject && this.domObject.current;
    }

    domAction( action ){
        if( this.domExist() ){
            action( this.domObject.current );
            return;
        }
        console.log("NO DOM");
    }

    domCellAction( cellID, action ){
        if( this.domExist() ){
            const domCell = this.findDomCell( cellID );
            if( domCell ){
                action( domCell );
            }
        }
    }

    findDomCell( cellID ){
        if( this.domExist() && cellID !== null ){
            return this.domObject.current.querySelector( `[data-cell-index='${cellID}']` )
        }
        return null;
    }

    isFirstVisibleCell( cellID ){
        if( cellID === null || this.visibleCells.length < 1) return false;
        return this.visibleCells[0].id === cellID;
    }

    reGainFocus(){

        if( this.focusedCell !== null){
            this.domCellAction( this.focusedCell, el =>{
                el.focus();
            } );
            return;
        }
        this.domCellAction( 0, el =>{
            el.focus();
        } );
    }

    findNexOrPrevCell( element, direction = 'next' ){
        let founded = false;
        if( !element ) return null;

        while( !founded ){

            if( element.classList.contains('disabled') ){
                element = element[direction === 'next' ? 'nextSibling' : 'previousSibling']
            }
            else{
                founded = true;
            }
            if( !element ){
                founded = true;
            }
        }
        return element;
    }
}

export class ContextManager{

    /**
     * @returns {menuElement}
     */
    get workingMenu(){
        const current = this.currentMenu;
        return (current === null) 
                ? this.mainMenu
                : this.menus[ current ]
    }

    get currentMenuArray(){
        return [ this.workingMenu]
    }


    changeCurrent( nextMenu, direction = FWD ){
        
        if( nextMenu === this.currentMenu ) return false;
        if( nextMenu !== null) nextMenu = parseInt( nextMenu, 10 );

        this.currentMenu = nextMenu;
        this.direction   = direction;

        if( nextMenu !== null ){
            this.history.push( nextMenu );
        }

        return this.returnMovement();
    }

    previousMenu(){
        const len = this.history.length;
        if( len === 0 ) return false;

        const prev = this.history.pop();
        
        if( len === 1 ){ 
            this.changeCurrent( null, BKW );
        }
        else{
            this.changeCurrent( prev, BKW );
        }

        return this.returnMovement();
    }

    returnMovement(){
        return {
            currentMenu: this.currentMenu,
            backEnabled: this.history.length > 0,
            direction  : this.direction
        }
    }

    constructor( props, menuChanger ){
        
        this.id          = "rtv_" + Date.now();
        this.props       = Object.assign({}, props);

        /**@type {Array} */
        this.menus       = [];
        this.menuChanger = menuChanger;
        this.mainMenu    = {};
        this.currentMenu = null;
        this.direction   = FWD;
        this.history     = [];

        this.domContainer   = null;
        this.domSearchField = null;
        this.searchFocused  = false;

        this.setupMenus();
        this.createMainMenu();
    }

    updateMenus( props ){
        this.props    = Object.assign({}, props);
        this.mainMenu = {};
        this.menus    = [];
        this.setupMenus();
        this.createMainMenu();
    }

    setupMenus(){
        const menus = this.props.loadedMenus || this.props.menus;
        menus.forEach( (menu, index) =>{
            this.insertNewMenu( menu, index );
        } );
    }

    insertNewMenu( menu, indx = null ){
        const index = indx === null ? this.menus.length : indx;
        this.menus[ index ] = new MenuElement( menu, this, index );
        return index;
    }

    paginateCells( cells, menuIndex ){
        return this.menus[menuIndex].cells.slice(0,50);
    }

    filterCells( word = '', menuIndex = null ){
        const menu   = menuIndex !== null ? this.menus[menuIndex] : this.workingMenu;
        menu.filterCells(word);
    }

    createMainMenu( ){

        this.mainMenu = new MenuElement({
            label: this.props.homeLabel || "HOME",
            cells: []
        }, this);

        this.menus.forEach( menu => {
            const { cells, ...props } = menu.originalData;
            const cell = this.mainMenu.addCell( props, null, menu.id, cells );
            /* cell.onClick = ()=>{
                this.menuChanger( menu.id );
            } */
        } );
        
        this.mainMenu.setupCells();
        this.mainMenu.filterCells();
    }

    findDomSearchInput( {current = null} ){
        if( !current ) return null;
        this.domSearchField =  current.querySelector( 'input' );
        return this.domSearchField;
    }

    findMenu( id ){
        if( id === -1 || id === null ) return this.mainMenu;
        return this.menus.find( menu => menu.id === id );
    }
}

export const exportableData = ( passingContext, menu = null) =>{

    const workingMenu = menu ||  passingContext.contextManager.workingMenu;   

    return {
        onGoBack      : passingContext.onGoBack,
        backEnabled   : passingContext.state.backEnabled,
        totalFiltered : workingMenu.filteredCells.length,
        totalRecords  : workingMenu.allCells.length,
        isHome        : workingMenu.isMain, 
        onSearchChange: passingContext.onSearchChange,
        onClearFilter : passingContext.onClearFilter,
        onOpenSearch  : passingContext.onOpenSearch,
        onCloseSearch : passingContext.onCloseSearch,
        filter        : workingMenu.filterWord,
        direction     : passingContext.contextManager.direction,
        data          : workingMenu.originalData,
        isSearchOpen  : passingContext.state.searchOpen
    }
}
