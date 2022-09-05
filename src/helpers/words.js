import wordBank from "./wordle-bank.txt";

export const wordle = 'ABUSE'

export const db = ['STRIP', 'IRRIT', 'TEACH', 'TALKY', 'GREAT', 'MIMIC', 'RIIRT', 'SHEKE', 'READY', 'EMAIL', 'CHAIR', 'PHONE', 'PHASE', 'RISKY', 'HAHKE']

export const keyboardLetters = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D',
    'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'
]

export const generateWordSet = async () => {
    let wordSet
    let todayWord
    await fetch(wordBank)
        .then(response => response.text())
        .then(result => {
            const wordArr = result.split('\r\n')
            todayWord = wordArr[Math.floor(Math.random() * wordArr.length)];
            wordSet = new Set(wordArr)
        })
    return { wordSet, todayWord }
}