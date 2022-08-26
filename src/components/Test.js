import React, { useState } from 'react';

const Test = () => {
    const [id, setId] = useState(2)
    const onClick = () => {
        
    }
    return (
        <div>
            <p>{id}</p>
            <button onClick={onClick}>click me</button>
        </div>
    );
};

export default Test;