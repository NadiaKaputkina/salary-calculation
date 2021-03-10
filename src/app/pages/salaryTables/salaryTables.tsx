import React from 'react'
import { DEFAULT_STYLES, useDefaultStyles } from '../../shared/styles/rootStyles'

export default function SalaryTables() {
    const classes = useDefaultStyles(DEFAULT_STYLES);
    return (
        <div className={classes.defaultPage}>
            Ведомости начисления заработной платы
        </div>
    )
}