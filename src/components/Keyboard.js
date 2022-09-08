import React, { useContext } from 'react';
import Context from '../context/Context';

const Keyboard = () => {
    const { onClick, handleDel, handleEnter, state } = useContext(Context)

    const handleKeyId = (str) => {
        let keyId;
        state.array.forEach((letter, idx) => {
          if (letter === str && state.keysId[idx] === 'exact') {
            keyId = 'exact'
          } else if (letter === str && state.keysId[idx] === 'exist' && keyId !== 'exact') {
            keyId = 'exist'
          } else if (letter === str && state.keysId[idx] === 'wrong') {
            keyId = 'wrong'
          }
        })
        return keyId
      }

    return (
        <div className='kbContainer'>
            <div>
                <button className='buttonKeybord' id={handleKeyId('Q')} onClick={onClick} disabled={state.disable}>Q</button>
                <button className='buttonKeybord' id={handleKeyId('W')} onClick={onClick} disabled={state.disable}>W</button>
                <button className='buttonKeybord' id={handleKeyId('E')} onClick={onClick} disabled={state.disable}>E</button>
                <button className='buttonKeybord' id={handleKeyId('R')} onClick={onClick} disabled={state.disable}>R</button>
                <button className='buttonKeybord' id={handleKeyId('T')} onClick={onClick} disabled={state.disable}>T</button>
                <button className='buttonKeybord' id={handleKeyId('Y')} onClick={onClick} disabled={state.disable}>Y</button>
                <button className='buttonKeybord' id={handleKeyId('U')} onClick={onClick} disabled={state.disable}>U</button>
                <button className='buttonKeybord' id={handleKeyId('I')} onClick={onClick} disabled={state.disable}>I</button>
                <button className='buttonKeybord' id={handleKeyId('O')} onClick={onClick} disabled={state.disable}>O</button>
                <button className='buttonKeybord' id={handleKeyId('P')} onClick={onClick} disabled={state.disable}>P</button>
            </div>
            <div>
                <button className='buttonKeybord' id={handleKeyId('A')} onClick={onClick} disabled={state.disable}>A</button>
                <button className='buttonKeybord' id={handleKeyId('S')} onClick={onClick} disabled={state.disable}>S</button>
                <button className='buttonKeybord' id={handleKeyId('D')} onClick={onClick} disabled={state.disable}>D</button>
                <button className='buttonKeybord' id={handleKeyId('F')} onClick={onClick} disabled={state.disable}>F</button>
                <button className='buttonKeybord' id={handleKeyId('G')} onClick={onClick} disabled={state.disable}>G</button>
                <button className='buttonKeybord' id={handleKeyId('H')} onClick={onClick} disabled={state.disable}>H</button>
                <button className='buttonKeybord' id={handleKeyId('J')} onClick={onClick} disabled={state.disable}>J</button>
                <button className='buttonKeybord' id={handleKeyId('K')} onClick={onClick} disabled={state.disable}>K</button>
                <button className='buttonKeybord' id={handleKeyId('L')} onClick={onClick} disabled={state.disable}>L</button>
            </div>
            <div>
                <button className='buttonKeybord buttonKeybord--auto' onClick={handleEnter} disabled={state.disable}>Enter</button>
                <button className='buttonKeybord' id={handleKeyId('Z')} onClick={onClick} disabled={state.disable} >Z</button>
                <button className='buttonKeybord' id={handleKeyId('X')} onClick={onClick} disabled={state.disable}>X</button>
                <button className='buttonKeybord' id={handleKeyId('C')} onClick={onClick} disabled={state.disable}>C</button>
                <button className='buttonKeybord' id={handleKeyId('V')} onClick={onClick} disabled={state.disable}>V</button>
                <button className='buttonKeybord' id={handleKeyId('B')} onClick={onClick} disabled={state.disable}>B</button>
                <button className='buttonKeybord' id={handleKeyId('N')} onClick={onClick} disabled={state.disable}>N</button>
                <button className='buttonKeybord' id={handleKeyId('M')} onClick={onClick} disabled={state.disable}>M</button>
                <button className='buttonKeybord buttonKeybord--auto' onClick={handleDel} disabled={state.disable}>delete</button>
            </div>
        </div>
    );
};

export default Keyboard;