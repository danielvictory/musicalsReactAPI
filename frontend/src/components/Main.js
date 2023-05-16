import React, { useState } from 'react'
import {Route, Routes} from "react-router-dom";

const Main = () => {
    const [musicals, setMusicals] = useState(null);

    const URL = "https://musicalsreactapi.onrender.com";

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

    return (
        <Routes>
            <Route exact path="/" element={<Index musicals={musicals} createMusicals={createMusicals} />} />
        </Routes>
    )
}

export default Main