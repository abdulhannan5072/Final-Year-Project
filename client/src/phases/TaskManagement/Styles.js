import {makeStyles, styled} from '@material-ui/core/styles'
import React from 'react';

export const divScrollable = styled((props)=><div {...props}> </div> ) ({
    root: {
        overflowX: 'scroll',
        height: 300
    }
});

