import React, { useState, useEffect } from 'react';
import axios from 'axios';
import APIEndPoints from '../services/api';
import { DataGrid } from '@mui/x-data-grid';
import GuildBanner from '../components/GuildBanner';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

const overviewColumns = [
    { field: 'id', headerName: 'Ally Code', width: 150 },
    {
      field: 'name',
      headerName: 'Player Name',
      width: 200,
      editable: true,
    },
    {
      field: 'gp',
      headerName: 'Galactic Power',
      width: 200,
    },
];

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
            <Typography>{children}</Typography>
        )}
      </div>
    );
}

function LandingPage(props) {
    const [ tab, setTab ] = useState(0);
  
    return (
        <div>
            <AppBar position="static">
                <Tabs
                    value={tab}
                    onChange={(e, value) => setTab(value)}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="Guild Tabs"
                >
                    <Tab label="Overview" />
                    <Tab label="Raid Report" />
                    <Tab label="TW Breakdown" />
                    <Tab label="TB Breakdown" />
                </Tabs>
            </AppBar>
            <TabPanel value={tab} index={0}>
                <DataGrid 
                    rows={props ? (props.memberData || []).map((row) => {
                        return {
                            ...row,
                            id: row.allyCode
                        }
                    }) : []}
                    columns={overviewColumns}
                />
            </TabPanel>
            <TabPanel value={tab} index={1}>
                Raid Report
            </TabPanel>
            <TabPanel value={tab} index={2}>
                TW Breakdown
            </TabPanel>
            <TabPanel value={tab} index={3}>
                TB Breakdown
            </TabPanel>
        </div>
    );
}


export default LandingPage;