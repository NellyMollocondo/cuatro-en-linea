import { WINNER_COMBOS } from "../constants"

export const checkWinnerFrom = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
        const [a, b, c, d] = combo
        if (
            boardToCheck[a] &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c] &&
            boardToCheck[a] === boardToCheck[d]
        ) {
            return boardToCheck[a]
        }
    }
    return null
}

export const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
}