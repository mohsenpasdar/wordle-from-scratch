import React, { useContext } from 'react';
import Context from '../context/Context';

const Board = () => {
    const { state } = useContext(Context)
    return (
        <div className='boxes-container'>
            {state.array.map((letter, idx) => (
                <div className="box-item" key={idx} id='zxc' >
                    <button
                        className="button"
                        value={idx}
                        id={state.keysId[idx]}
                    >
                        {letter}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Board;