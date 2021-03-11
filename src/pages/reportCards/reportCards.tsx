import React from 'react'
import { DEFAULT_STYLES, useDefaultStyles } from '../../shared/styles/rootStyles'

export default function ReportCards() {
    const classes = useDefaultStyles(DEFAULT_STYLES);
    return (
        <div className={classes.defaultPage}>
            Табеля
        </div>
    )
}