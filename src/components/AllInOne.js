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
                    <button className='buttonKeybord' onClick={onClick}>Q</button>
                    <button className='buttonKeybord' onClick={onClick}>W</button>
                    <button className='buttonKeybord' onClick={onClick}>E</button>
                    <button className='buttonKeybord' onClick={onClick}>R</button>
                    <button className='buttonKeybord' onClick={onClick}>T</button>
                    <button className='buttonKeybord' onClick={onClick}>Y</button>
                    <button className='buttonKeybord' onClick={onClick}>U</button>
                    <button className='buttonKeybord' onClick={onClick}>I</button>
                    <button className='buttonKeybord' onClick={onClick}>O</button>
                    <button className='buttonKeybord' onClick={onClick}>P</button>
                </div>
                <div>
                    <button className='buttonKeybord' onClick={onClick}>A</button>
                    <button className='buttonKeybord' onClick={onClick}>S</button>
                    <button className='buttonKeybord' onClick={onClick}>D</button>
                    <button className='buttonKeybord' onClick={onClick}>F</button>
                    <button className='buttonKeybord' onClick={onClick}>G</button>
                    <button className='buttonKeybord' onClick={onClick}>H</button>
                    <button className='buttonKeybord' onClick={onClick}>J</button>
                    <button className='buttonKeybord' onClick={onClick}>K</button>
                    <button className='buttonKeybord' onClick={onClick}>L</button>
                </div>
                <div>
                    <button className='buttonKeybord buttonKeybord--auto' onClick={handleEnter}>Enter</button>
                    <button className='buttonKeybord' onClick={onClick}>Z</button>
                    <button className='buttonKeybord' onClick={onClick}>X</button>
                    <button className='buttonKeybord' onClick={onClick}>C</button>
                    <button className='buttonKeybord' onClick={onClick}>V</button>
                    <button className='buttonKeybord' onClick={onClick}>B</button>
                    <button className='buttonKeybord' onClick={onClick}>N</button>
                    <button className='buttonKeybord' onClick={onClick}>M</button>
                    <button className='buttonKeybord buttonKeybord--auto' onClick={handleDel}>del</button>
                </div>
            </div>
        </div>
    );
};

export default AllInOne;