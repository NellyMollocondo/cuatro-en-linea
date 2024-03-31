import { useState } from 'react'
import { Square } from './components/Square';
import { TURNS } from './constants';
import { checkWinnerFrom, checkEndGame } from './logic/board';
import { getGameToStorage, getTurnFromStorage, saveGameToStorage, resetGameStorage } from './logic/storage';
import { WinnerModal } from './components/WinnerModal';

function App() {

  const [board, setBoard] = useState(() => {
    const boardFromStorage = getGameToStorage();
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(42).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = getTurnFromStorage();
    return turnFromStorage ?? TURNS.azul;
  });

  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(42).fill(null));
    setTurn(TURNS.azul);
    setWinner(null);

    resetGameStorage();
  }

  function changeTurn() {
    const newTurn = turn === TURNS.azul ? TURNS.verde : TURNS.azul
    setTurn(newTurn)
    return turn
  }

  function updateBoard(index) {
    if (board[index] || winner) return

    if (index >= 0 && index <= 34 && !board[index + 7]) {
      console.log(`el indice ${index + 7} contiene ${board[index + 7]}`)
      return
    }

    const newBoard = [...board]
    newBoard[index] = changeTurn()
    setBoard(newBoard)

    saveGameToStorage({
      board: newBoard,
      turn: changeTurn()
    })

    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }


  }

  return (
    <main className="board">
      <h1>Cuatro en línea</h1>
      <section className="game">
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}>
                {square}
              </Square>

            )
          })
        }
      </section>

      <button onClick={resetGame}>Reset del juego</button>

      <section className='turn'>
        <Square isSelected={turn === TURNS.azul}>
          {TURNS.azul}
        </Square>
        <Square isSelected={turn === TURNS.verde}>
          {TURNS.verde}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
