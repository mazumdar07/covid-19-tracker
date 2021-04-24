import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react';
import './InfoBox.css'

function InfoBox({ title, cases, isRed, active, total, ...props }) {
    return (
        <Card onClick={props.onClick} className={`infoBox ${active && 'infoBox--selected'} ${isRed && "infoBox--red"}`}>
            <CardContent>
                <Typography className='infobox_title' color="textSecondary">{title}</Typography>
                <h2 className={`infoBox_cases ${!isRed && "infoBox_cases--green"}`}>{cases}</h2>
                <Typography className='infobox_total' color="textSecondary">{total} Total cases</Typography>

            </CardContent>
        </Card>
    )
}

export default InfoBox
