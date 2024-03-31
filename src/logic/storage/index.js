export const getGameToStorage = () =>  {
    window.localStorage.getItem('board')
}

export const getTurnFromStorage = () => {
    window.localStorage.getItem('turn')
}

export const saveGameToStorage = ({ board, turn }) => {
    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('turn', turn)
}

export const resetGameStorage = () => {
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
}