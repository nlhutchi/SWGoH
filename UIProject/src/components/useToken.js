import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        if(!tokenString) {
            console.log(tokenString)
            console.log(typeof tokenString)
            return undefined;
        } else {
            console.log(tokenString)
            console.log(typeof tokenString)
            const userToken = JSON.parse(tokenString);
            return userToken && userToken.expiration_time > new Date().getTime() ? userToken?.access_token : undefined;
        }
    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        if(!userToken) {
            localStorage.setItem('token', userToken);
            setToken(userToken);
        } else {
            localStorage.setItem('token', JSON.stringify(userToken));
            setToken(userToken);
        }
    };

    return {
        setToken: saveToken,
        token
    }
}