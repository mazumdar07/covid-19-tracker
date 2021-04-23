import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react';
import './InfoBox.css'

function InfoBox({ title, cases, total }) {
    return (
        <Card className='infoBox'>
            <CardContent>
                <Typography className='infobox_title' color="textSecondary">{title}</Typography>
                <h2 className='infoBox_cases'>{cases}</h2>
                <Typography className='infobox_total' color="textSecondary">{total} Total cases</Typography>

            </CardContent>
        </Card>
    )
}

export default InfoBox
