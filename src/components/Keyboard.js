import React from 'react';

const Keyboard = () => {
        
    
    return (
        <div className='kbContainer'>
            <div>
                <button className='buttonKeybord'>Q</button>
                <button className='buttonKeybord'>W</button>
                <button className='buttonKeybord'>E</button>
                <button className='buttonKeybord'>R</button>
                <button className='buttonKeybord'>T</button>
                <button className='buttonKeybord'>Y</button>
                <button className='buttonKeybord'>U</button>
                <button className='buttonKeybord'>I</button>
                <button className='buttonKeybord'>O</button>
                <button className='buttonKeybord'>P</button>
            </div>
            <div>
                <button className='buttonKeybord'>A</button>
                <button className='buttonKeybord'>S</button>
                <button className='buttonKeybord'>D</button>
                <button className='buttonKeybord'>F</button>
                <button className='buttonKeybord'>G</button>
                <button className='buttonKeybord'>H</button>
                <button className='buttonKeybord'>J</button>
                <button className='buttonKeybord'>K</button>
                <button className='buttonKeybord'>L</button>
            </div>
            <div>
                <button className='buttonKeybord buttonKeybord--auto'>Enter</button>
                <button className='buttonKeybord'>Z</button>
                <button className='buttonKeybord'>X</button>
                <button className='buttonKeybord'>C</button>
                <button className='buttonKeybord'>V</button>
                <button className='buttonKeybord'>B</button>
                <button className='buttonKeybord'>N</button>
                <button className='buttonKeybord'>M</button>
                <button className='buttonKeybord buttonKeybord--auto'>del</button>
            </div>
        </div>
    );
};

export default Keyboard;