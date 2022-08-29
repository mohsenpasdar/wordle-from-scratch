export const distinction = (wordleArray, array) => {
    let wordleArrayClone
    let guessArray
    const arrayClone = [...array]
    let output = Array(30).fill('')
    for (let i = 0; i < output.length; i++) {
        if (i % 5 === 0) {
            wordleArrayClone = [...wordleArray]
        }

        if (!array[i]) {
            output[i] = ''
        } else if (array[i] === wordleArray[i % 5]) {
            wordleArrayClone[i % 5] = ''
            arrayClone[i] = ''
            output[i] = 'exact'
        } else if (!wordleArray.includes(array[i])) {
            arrayClone[i % 5] = ''
            output[i] = 'wrong'
        } else {
            output[i] = 'idle'
        }
        if (i % 5 === 4) {
            guessArray = arrayClone.slice(i-4, i+1)
            for (let j = 0; j < guessArray.length; j++) {
                if (output[i-4+j] === 'idle' && wordleArrayClone.includes(guessArray[j])) {
                    output[i-4+j] = 'exist'
                    wordleArrayClone[wordleArrayClone.indexOf(guessArray[j])] = ''
                } else if (output[i-4+j] === 'idle') {
                    output[i-4+j] = 'wrong'
                }
            }
        }
    }
    return output
}