/*
 * File: SlideTransition.jsx | Package: React Table View
 * 
 * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
 * Created: 14 Jul, 2018 | 06:07 AM
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
import CSSTransition from 'react-transition-group/CSSTransition';
import { objectsCssClasses as obCss} from './domHelpers';

const style={
    position   : 'absolute',
    top        : 0,
    left       : 0,
    right      : 0,
    bottom     : 0,
}

const SlideTransition = ( { child, state } ) =>{
    
    const { isMain, id }    = child.props.menuElement;
    const { currentMenu }   = state;
    const isCurrentMain     = currentMenu === null || currentMenu === -1;
    const enter             = (isMain && isCurrentMain) || ( !isMain && currentMenu === id ) ;
    const transitionClasses = child.props.transitionClasses[ state.direction ];
    const objectsCss        = enter ? obCss.activeSlide : obCss.inactiveSlide;
    
    return(
        <CSSTransition unmountOnExit={false} in={enter} appear={true} timeout={300} classNames={transitionClasses}>
            <div className={ objectsCss } style={style}>
                {child}
            </div>
        </CSSTransition>
    );
}

export default SlideTransition;