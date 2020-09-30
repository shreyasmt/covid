
import React from 'react'
import './Infobox.css'
import {Card, CardContent, Typography} from '@material-ui/core'
const Infobox = ({title, cases,active,isRed, total,...props }) => {
    return (
        <Card onClick={props.onClick} className={`infoBox ${active && "infoBox--selected"} ${
            isRed && "infoBox--red"
          }`}>
            <CardContent >
                {/**Tile */}
                <Typography className="infobox__title" color="textSecondary">
                    {title}
                </Typography>
                {/**number of cases */}
                <h2 className={`infobox__cases ${!isRed && "infoBox__cases--green"}`}>{cases}</h2>
                {/**total cases */}
                <Typography className="infobox__total" color="textSecondary">{total} Total</Typography>
            </CardContent>
        </Card>
    )
}

export default Infobox
