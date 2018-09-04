/*
 * File: TextWrappers.jsx | Package: React Table View
 * 
 * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
 * Created: 15 Jul, 2018 | 11:27 PM
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
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const localStyles = theme => {
    return {
        UpperCasedBold_root:{
            fontWeight: "bold",
            textTransform: 'uppercase'
        }
    };
}

export const UpperCasedBold = withStyles( localStyles )( ({classes, children}) => {
    return(
        <Typography className={classes.UpperCasedBold_root}>
            {children}
        </Typography>
    );   
});