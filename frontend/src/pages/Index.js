import React, {useState} from 'react'
import {Link} from 'react-router-dom'

const Index = (props) => {
    
    const loading = () => {
        return <h1>Loading...</h1>
    }

    const loaded = () => {
        return props.musicals.map((musical) => (
            <div key={musical._id} className="musical-container">
                <Link to={`/musicals/${musical._id}`}>
                    <h1>{musical.name}</h1>
                </Link>
                <img src={musical.image} alt={musical.name} />
                <h3>{musical.premiereYear}</h3>
            </div>
        ));
    }

    return (
        <section>{props.musicals ? loaded() : loading()}</section>
        
    )
}

export default Index