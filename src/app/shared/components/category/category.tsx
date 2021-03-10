import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import { withRouter } from "react-router";

function Category(props: any) {

    const {
        history
    } = props;

    const onClickHandle = (path: string) => {
        history.push(`${path}`)
    }

    return (
        <div>
            <ListItem
                button
                onClick={() => onClickHandle('/employees')}
            >
                <ListItemIcon>
                    <PeopleIcon/>
                </ListItemIcon>
                <ListItemText primary="Сотрудники"/>
            </ListItem>
            <ListItem
                button
                onClick={() => onClickHandle('/reportCards')}
            >
                <ListItemIcon>
                    <ShoppingCartIcon/>
                </ListItemIcon>
                <ListItemText primary="Табеля"/>
            </ListItem>
            <ListItem
                button
                onClick={() => onClickHandle('/salaryTables')}
            >
                <ListItemIcon>
                    <DashboardIcon/>
                </ListItemIcon>
                <ListItemText
                    style={{whiteSpace: 'normal'}}
                    primary="Ведомости начисления заработной платы"
                />
            </ListItem>
            <ListItem
                button
                onClick={() => onClickHandle('/reports')}
            >
                <ListItemIcon>
                    <BarChartIcon/>
                </ListItemIcon>
                <ListItemText primary="Отчеты"/>
            </ListItem>
        </div>
    )
}

export default withRouter(Category);