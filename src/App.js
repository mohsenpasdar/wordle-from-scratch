import React, { useEffect, useState } from 'react';
import './App.css';
import '../src/styles/styles.scss'
import Context from './context/Context';
import Keyboard from './components/Keyboard'
import Board from './components/Board';
import { keyboardLetters, generateWordSet } from './helpers/words'
import { distinction } from './helpers/distinction.js';

const App = () => {
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

  const checkGameStatus = (arr, row) => {
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
    <div className='App'>
      <Context.Provider value={{ state, setState, handleEnter }}>
        <h1 id={'title'}>WORDLE</h1>
        <Board />
        <Keyboard />
        {state.gameStatus && (state.gameStatus === 'success' ?
          <h1>Great, you guessed the wordle!</h1> :
          state.gameStatus === 'failure' ? <h1>Nice try, the wordle was {todayWord.toUpperCase()}</h1> : ''
        )}
        {state.disable && (state.disable ? <button onClick={handleResetGAme}>NEW GAME</button> : '')}
      </Context.Provider>
    </div>
  );
};

export default App;
