import React from 'react'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

export default function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://www.linkedin.com/in/hitalonasc">
                Hitalo<strong>Nasc</strong>
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}