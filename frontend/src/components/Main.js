import React, { useState } from 'react'

const Main = () => {
    const [musicals, setMusicals] = useState(null);

    const URL = "https://musicalsreactapi.onrender.com";

    const getMusicals = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setPeople(data);
    }

    const createMusicals = async (musical) => {
        await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(person),
        });
        getMusicals();
    }

    return (
        <div>Main</div>
    )
}

export default Main