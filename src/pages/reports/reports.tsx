import React from 'react'
import { DEFAULT_STYLES, useDefaultStyles } from '../../shared/styles/rootStyles'
import MainLayout from "../../layouts/MainLayout";

export default function Reports() {
    const classes = useDefaultStyles(DEFAULT_STYLES);
    return (
        <MainLayout>
            <div className={classes.defaultPage}>
                Отчеты
            </div>
        </MainLayout>
    )
}