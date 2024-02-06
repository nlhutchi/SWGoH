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
      field: 'gp',
      headerName: 'Galactic Power',
      width: 200,
    },
];

function LandingPage(props) {
    const [ guildMembers, setGuildMembers] = useState([]);

    useEffect(async () => {
        await axios({
            method: 'get',
            url: APIEndPoints.GUILD_DATA
        })
            .then((response) => {
                console.log(response)
                console.log(response.data.guildMembers)
                setGuildMembers(response.data.guildMembers.map((member) => {
                    return {
                        ...member,
                        id: member.allyCode
                    }
                }));
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
                rows={guildMembers}
                columns={columns}
            />
        </div>
    );
}


export default LandingPage;