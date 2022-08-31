import React, { useEffect, useState } from 'react';
import { wordle, db, keyboardLetters } from '../helpers/words.js'
import { distinction } from '../helpers/distinction.js';

const AllInOne = () => {

    const wordleArray = wordle.split('')
    const [array, setArray] = useState(Array(30).fill(""));
    const [row, setRow] = useState(1)
    const [ID, setID] = useState(Array(30).fill(''))

    const [boxNo, setBoxNo] = useState(0)

    const onClick = (e) => {
        if ((boxNo / (5 * row)) !== 1 && boxNo < 30) {
            array[boxNo] = e.target.innerHTML
            setBoxNo(boxNo => ++boxNo)
        }
    }
    const handleDel = () => {
        if (boxNo % 5 !== 0 || boxNo / (5 * row) === 1) {
            setBoxNo(boxNo => --boxNo)
            array[boxNo - 1] = ''
        }
    }

    const handleEnter = () => {
        if (row < 7 && boxNo % (5 * row) === 0 && boxNo !== 0) {
            const guess = array.slice(boxNo - 5, boxNo).join('')

            if (db.includes(guess)) {
                setID(distinction(wordleArray, array))
                
                setRow(row => ++row)
            }
            else alert('not in word list')
        }
    }

    // const handleKeyDown = (event) => {
    //     if ((boxNo / (5 * row)) !== 1 && boxNo < 30) {
    //         array[boxNo] = event.key.toUpperCase()
    //         console.log(event.key.toUpperCase());
    //         setBoxNo(boxNo => ++boxNo)
    //     }
    // }
    const keyPress = (e) => {
        if (keyboardLetters.includes(e.key.toUpperCase())) {
            if ((boxNo / (5 * row)) !== 1 && boxNo < 30) {
                array[boxNo] = e.key.toUpperCase()
                setBoxNo(boxNo => ++boxNo)
            }
        } else if (e.key === 'Enter') {
            if (row < 7 && boxNo % (5 * row) === 0 && boxNo !== 0) {
                const guess = array.slice(boxNo - 5, boxNo).join('')

                if (db.includes(guess)) {
                    setID(distinction(wordleArray, array))
                    setRow(row => ++row)
                }
                else alert('not in word list')
            }
        } else if (e.key === 'Delete' || e.key === 'Backspace') {
            if (boxNo % 5 !== 0 || boxNo / (5 * row) === 1) {
                setBoxNo(boxNo => --boxNo)
                array[boxNo - 1] = ''
            }
        }
    }

    const handleKeyId = (str) => {
        let keyId;
        array.forEach((letter, idx) => {
            if (letter === str && ID[idx] === 'exact') {
                keyId = 'exact'
            } else if (letter === str && ID[idx] === 'exist' && keyId !== 'exact') {
                keyId = 'exist'
            } else if (letter === str && ID[idx] === 'wrong') {
                keyId = 'wrong'
            }
        })
        return keyId
    }

    useEffect(() => {
        document.addEventListener('keydown', keyPress)
        return () => document.removeEventListener('keydown', keyPress)
    })



    return (
        <div>
            <h1>Wordle game</h1>
            <div className='boxes-container'>
                {array.map((letter, idx) => (
                    <div className="box-item" key={idx} id='zxc' >
                        <button
                            className="button"
                            value={idx}
                            id={ID[idx]}
                        >
                            {letter}
                        </button>
                    </div>
                ))}
            </div>

            <div className='kbContainer'>
                <div>
                    <button className='buttonKeybord' id={handleKeyId('Q')} onClick={onClick}>Q</button>
                    <button className='buttonKeybord' id={handleKeyId('W')} onClick={onClick}>W</button>
                    <button className='buttonKeybord' id={handleKeyId('E')} onClick={onClick}>E</button>
                    <button className='buttonKeybord' id={handleKeyId('R')} onClick={onClick}>R</button>
                    <button className='buttonKeybord' id={handleKeyId('T')} onClick={onClick}>T</button>
                    <button className='buttonKeybord' id={handleKeyId('Y')} onClick={onClick}>Y</button>
                    <button className='buttonKeybord' id={handleKeyId('U')} onClick={onClick}>U</button>
                    <button className='buttonKeybord' id={handleKeyId('I')} onClick={onClick}>I</button>
                    <button className='buttonKeybord' id={handleKeyId('O')} onClick={onClick}>O</button>
                    <button className='buttonKeybord' id={handleKeyId('P')} onClick={onClick}>P</button>
                </div>
                <div>
                    <button className='buttonKeybord' id={handleKeyId('A')} onClick={onClick}>A</button>
                    <button className='buttonKeybord' id={handleKeyId('S')} onClick={onClick}>S</button>
                    <button className='buttonKeybord' id={handleKeyId('D')} onClick={onClick}>D</button>
                    <button className='buttonKeybord' id={handleKeyId('F')} onClick={onClick}>F</button>
                    <button className='buttonKeybord' id={handleKeyId('G')} onClick={onClick}>G</button>
                    <button className='buttonKeybord' id={handleKeyId('H')} onClick={onClick}>H</button>
                    <button className='buttonKeybord' id={handleKeyId('J')} onClick={onClick}>J</button>
                    <button className='buttonKeybord' id={handleKeyId('K')} onClick={onClick}>K</button>
                    <button className='buttonKeybord' id={handleKeyId('L')} onClick={onClick}>L</button>
                </div>
                <div>
                    <button className='buttonKeybord buttonKeybord--auto' onClick={handleEnter}>Enter</button>
                    <button className='buttonKeybord' id={handleKeyId('Z')} onClick={onClick}>Z</button>
                    <button className='buttonKeybord' id={handleKeyId('X')} onClick={onClick}>X</button>
                    <button className='buttonKeybord' id={handleKeyId('C')} onClick={onClick}>C</button>
                    <button className='buttonKeybord' id={handleKeyId('V')} onClick={onClick}>V</button>
                    <button className='buttonKeybord' id={handleKeyId('B')} onClick={onClick}>B</button>
                    <button className='buttonKeybord' id={handleKeyId('N')} onClick={onClick}>N</button>
                    <button className='buttonKeybord' id={handleKeyId('M')} onClick={onClick}>M</button>
                    <button className='buttonKeybord buttonKeybord--auto' onClick={handleDel}>del</button>
                </div>
            </div>
        </div>
    );
};

export default AllInOne;