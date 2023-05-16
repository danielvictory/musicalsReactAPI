import React, { useState, useEffect } from 'react'
import {Route, Routes} from "react-router-dom";

import Index from '../pages/Index'
//import Show from '../pages/Show'

const Main = () => {
    const [musicals, setMusicals] = useState(null);

    //const URL = "http://localhost:3000/musicals"
    const URL = "https://musicalsreactapi.onrender.com/musicals";

    const getMusicals = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setMusicals(data);
    }

    const createMusicals = async (musical) => {
        await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(musical),
        });
        getMusicals();
    }

    useEffect(() => getMusicals, []);

    return (
        <Routes>
            <Route exact path="/" element={<Index musicals={musicals} createMusicals={createMusicals} />} />
        </Routes>
    )
}

export default Main