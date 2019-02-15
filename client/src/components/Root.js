import React, { useEffect } from 'react';
import axios from 'axios';


function Root() {

    useEffect(() => {
        axios.get('/test').then(res => console.log(res)).catch(err => console.log(err));
    }, []);

    return (
        <div>hif</div>
    );
}

export default Root;