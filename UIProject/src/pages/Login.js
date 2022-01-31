import React, { useState, useEffect } from 'react';
import axios from 'axios';
import APIEndPoints from '../services/api';

async function loginUser(credentials) {
    return await axios({
        method: 'post',
        url: APIEndPoints.SIGN_IN
      })
        .then((data) => {
            console.log(data)
            console.log(data.data)
            return data.data;
        });
}

export default function Login({ setToken }) {
    
    useEffect(async () => {
        const token = await loginUser();
        setToken(token);
    }, []);

    return(
        <div>
            Logging in...
        </div>
    )
}
