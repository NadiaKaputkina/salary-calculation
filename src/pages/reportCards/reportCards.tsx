import React from 'react'
import { DEFAULT_STYLES, useDefaultStyles } from '../../shared/styles/rootStyles'
import MainLayout from "../../layouts/MainLayout";

export default function ReportCards() {
    const classes = useDefaultStyles(DEFAULT_STYLES);
    return (
        <MainLayout>
            <div className={classes.defaultPage}>
                Табеля
            </div>
        </MainLayout>
    )
}