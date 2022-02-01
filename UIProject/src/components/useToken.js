import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        console.log('get token', tokenString)
        const userToken = JSON.parse(tokenString);
        console.log('time', new Date().getTime())
        return userToken && userToken.expiration_time > new Date().getTime() ? userToken?.access_token : undefined;
    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        console.log('set token', JSON.stringify(userToken))
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
    };

    return {
        setToken: saveToken,
        token
    }
}