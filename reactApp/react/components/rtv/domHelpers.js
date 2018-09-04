/*
* File: domHelpers.js | Package: React Table View
* 
* Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
* Created: 22 Jul, 2018 | 02:37 AM
* 
* O P E N   S O U R C E   C O D E 
* ---------------------------------
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
* 
* CapitalMental && BackLogics Technologies
* Copyright 2014-present. | All rights reserved.
*/

export const findMenuDomObject = (rtvDomObject, _id) => {
    if( !rtvDomObject.current ) return null;
    const id = _id || "-1";
    return rtvDomObject.current.querySelector(`[data-indx='${id}']`);
};

export const findCellDomObject = ( rtvID, _menuID, cellID, action = null ) => {
    
    const menuID  = _menuID === null ? -1 : _menuID;
    let element   = null;

    if(typeof rtvID === 'string'){
        element =  document.querySelector(`#${rtvID} [data-indx='${menuID}'] [data-cell-index='${cellID}']`);
    }
    else{
        element =  rtvID.querySelector(`[data-cell-index='${cellID}']`);
    }

    if( !action && !!element){
        return element;
    }

    if(!!element){
        action( element );
    }
}

export const domElementAction = (rtvID, selector, action) => {

    let element = null;

    if( typeof rtvID === 'string' ){
        element = document.querySelector(`#${rtvID} ${selector}`);
    }
    else{
        element = rtvID.querySelector(`${selector}`);
    }

    if( element ){
        action(element);
    }
}

export const getDataAttribute = ( el,att ) => {
    el.getAttribute("data-" + att);
}

const isFindCombo = event =>{
    return event.metaKey && (event.key.toLowerCase() === "f" );
}

const keyChecker = ( event, keyOrKeys ) =>{
    if( typeof keyOrKeys === 'string' ){
        return event.key === keyOrKeys;
    }
    return keyOrKeys.indexOf( event.key ) > -1
}

const functionChecker = ( _fnc, event, callback) =>{
    const fnc = typeof _fnc !== 'function' ? keyChecker : _fnc;
    if( fnc(event, _fnc) ){
        callback( event );
        return true;
    }
    return false;
};

export const onFindCombo = ( event, callback ) => {
    return functionChecker( isFindCombo, event, callback );
};

export const onSimpleKeyEvent = ( keyName, event, callback ) => {
    return functionChecker( keyName, event, callback );
}

export const objectsCssClasses = {
    rtvWrapper   : 'rtv__wrapper',
    menuWrapper  : 'rtv__menuWrapper',
    cellWrapper  : 'rtv__cellWrapper',
    searchBox    : 'rtv__searchbox',
    activeSlide  : 'rtv__activeSlide',
    inactiveSlide: 'rtv__inactiveSlide'
};