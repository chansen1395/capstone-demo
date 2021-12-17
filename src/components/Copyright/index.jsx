import React from 'react';
import Typography from '@material-ui/core/Typography';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
        {'Created by © Sander de Bruijn, adapted by Connor Hansen '}
        {new Date().getFullYear()}
        {'.'}
        </Typography>
    );
}

export default Copyright;