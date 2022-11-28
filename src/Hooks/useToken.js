import { useEffect, useState } from "react";
import axios from 'axios';

const useToken = email => {
    const [token, setToken] = useState('');
    useEffect(() => {
        axios(`https://iconnect-server.vercel.app/jwt?email=${email}`)
            .then(result => {
                if (result.data.accessToken) {
                    localStorage.setItem('accessToken', result.data.accessToken);
                    setToken(result.data.accessToken);
                };
            });
    }, [email]);

    return [token];
};

export default useToken;