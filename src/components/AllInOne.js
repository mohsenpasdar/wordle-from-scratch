import React, { useEffect, useState } from 'react';
import { keyboardLetters, generateWordSet } from '../helpers/words.js'
import { distinction } from '../helpers/distinction.js';

const AllInOne = () => {
    const [wordSet, setWordSet] = useState(new Set())
    const [todayWord, setTodayWord] = useState('')
    const [newGame, setNewGame] = useState(false)
    

    const wordleArray = todayWord.toUpperCase().split('')
    const [state, setState] = useState({
        row: 1,
        boxNo: 0,
        array: Array(30).fill(""),
        keysId: Array(30).fill(''),
        gameStatus: 'playing',
        disable: false
    })

    const onClick = (e) => {
        if ((state.boxNo / (5 * state.row)) !== 1 && state.boxNo < 30) {
            state.array[state.boxNo] = e.target.innerHTML
            setState(state => ({
                ...state,
                boxNo: ++state.boxNo
            }))
        }
    }

    const handleDel = () => {
        if (state.boxNo % 5 !== 0 || state.boxNo / (5 * state.row) === 1) {
            setState(state => ({
                ...state,
                boxNo: --state.boxNo
            }))
            state.array[state.boxNo - 1] = ''
        }
    }

    const handleEnter = () => {
        if (state.row < 7 && state.boxNo % (5 * state.row) === 0 && state.boxNo !== 0) {
            const guess = state.array.slice(state.boxNo - 5, state.boxNo).join('')

            if (wordSet.has(guess.toLocaleLowerCase())) {
                setState(state => ({
                    ...state,
                    keysId: distinction(wordleArray, state.array)
                }))

                setState(state => ({
                    ...state,
                    row: ++state.row
                }))

                setState(state => ({
                    ...state,
                    gameStatus: checkGameStatus(state.keysId.slice(state.boxNo - 5, state.boxNo), state.row)
                }))

                setState(state => ({
                    ...state,
                    disable: state.gameStatus === 'success' || state.gameStatus === 'failure'
                }))
            }
            else alert('not in word list')
        }
    }

    const keyPress = (e) => {
        if (keyboardLetters.includes(e.key.toUpperCase()) && !state.disable) {
            if ((state.boxNo / (5 * state.row)) !== 1 && state.boxNo < 30) {
                state.array[state.boxNo] = e.key.toUpperCase()
                setState(state => ({
                    ...state,
                    boxNo: ++state.boxNo
                }))
            }
        } else if (e.key === 'Enter') {
            if (state.row < 7 && state.boxNo % (5 * state.row) === 0 && state.boxNo !== 0) {
                const guess = state.array.slice(state.boxNo - 5, state.boxNo).join('')

                if (wordSet.has(guess.toLocaleLowerCase())) {
                    setState(state => ({
                        ...state,
                        keysId: distinction(wordleArray, state.array)
                    }))
                    setState(state => ({
                        ...state,
                        row: ++state.row
                    }))
                    setState(state => ({
                        ...state,
                        gameStatus: checkGameStatus(state.keysId.slice(state.boxNo - 5, state.boxNo), state.row)
                    }))

                    setState(state => ({
                        ...state,
                        disable: state.gameStatus === 'success' || state.gameStatus === 'failure'
                    }))
                }
                else alert('not in word list')
            }
        } else if (e.key === 'Delete' || e.key === 'Backspace') {
            if (state.boxNo % 5 !== 0 || state.boxNo / (5 * state.row) === 1) {
                setState(state => ({
                    ...state,
                    boxNo: --state.boxNo
                }))
                state.array[state.boxNo - 1] = ''
            }
        }
    }

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

    const checkGameStatus = (arr, row) => {
        // console.log('arr', arr)
        // console.log(state.row)
        if (arr.every(element => element === 'exact')) {
            return 'success'
        }
        else if (row === 7 && !arr.every(element => element === 'exact')) {
            return 'failure'
        }
    }

    const handleResetGAme = () => {
        setState({
            ...state,
            row: 1,
            boxNo: 0,
            array: Array(30).fill(""),
            keysId: Array(30).fill(''),
            gameStatus: 'playing',
            disable: false
        })
        setNewGame(!newGame)
    }


    useEffect(() => {
        document.addEventListener('keydown', keyPress)
        return () => document.removeEventListener('keydown', keyPress)
    })

    useEffect(() => {
        generateWordSet().then(words => {
            setWordSet(words.wordSet)
            setTodayWord(words.todayWord)
        })
    }, [newGame])

    return (
        <div>
            <h1>WORDLE</h1>
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
            {state.gameStatus && (state.gameStatus === 'success' ?
                <h1>Great, you guessed the wordle!</h1> :
                state.gameStatus === 'failure' ? <h1>Nice try, the wordle was {todayWord.toUpperCase()}</h1> : ''
            )}
            {state.disable && (state.disable ? <button onClick={handleResetGAme}>NEW GAME</button> : '')}
        </div>
    );
};

export default AllInOne;