import React, { useState, useEffect } from 'react';
import axios from 'axios';
import APIEndPoints from '../services/api';
import { DataGrid } from '@mui/x-data-grid';
import GuildBanner from '../components/GuildBanner';

const columns = [
    { field: 'id', headerName: 'Ally Code', width: 150 },
    {
      field: 'name',
      headerName: 'Player Name',
      width: 200,
      editable: true,
    },
    {
      field: 'lastRaidScore',
      headerName: 'Last Raid Score',
      width: 200,
    },
  ];
  
  const rows = [
    { id: 1, name: 'Deli',  lastRaidScore: 12 },
    { id: 2, name: 'Squirell',  lastRaidScore: 32 },
    { id: 3, name: 'St3ck',  lastRaidScore: 43 },
    { id: 4, name: 'Mol',  lastRaidScore: 15 },
    { id: 5, name: 'Perses',  lastRaidScore: 99 },
    { id: 6, name: 'hutch',  lastRaidScore: 22 },
];

function RaidScores(props) {
    const [ raidScores, setRaidScores] = useState(rows);

    useEffect(async () => {
        await axios({
            method: 'get',
            url: APIEndPoints.GUILD_DATA
        })
            .then((response) => {
                console.log(response)
                console.log(response.data.guildMembers)
                setRaidScores(response.data.guildMembers);
            });
    }, []);
  
    return (
        <div>
            <GuildBanner 
                guildIcon={"1"}
                guildId={"123"}
                GP={2}
                members={2}
            />
            <DataGrid 
                rows={raidScores}
                columns={columns}
            />
        </div>
    );
}


export default RaidScores;