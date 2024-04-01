import { useState } from 'react';
import { Square } from './components/Square';
import { Message } from './components/Message';
import { TURNS } from './constants';
import { checkWinnerFrom, checkEndGame } from './logic/board';
import { saveGameToStorage, resetGameStorage } from './logic/storage';
import { WinnerModal } from './components/WinnerModal';

function App() {
  const [showMessage, setShowMessage] = useState(false)

  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')

    if (boardFromStorage) return JSON.parse(boardFromStorage)
    else return Array(42).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.azul;
  });

  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(42).fill(null));
    setTurn(TURNS.azul);
    setWinner(null);

    resetGameStorage();
  }

  function handleClick(){
    const newShowMessage = showMessage=='true' ? null : 'true';
    setShowMessage(newShowMessage) ;
  } 

  function updateBoard(index) {
    if (board[index] || winner) return

    if (index >= 0 && index <= 34 && !board[index + 7]) {
      console.log(`el indice ${index + 7} contiene ${board[index + 7]}`)
      return
    }

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.azul ? TURNS.verde : TURNS.azul
    setTurn(newTurn)

    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })

    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }

  }

  return (
    <>
      <header className='header'>
        <span className='header__help' onClick={handleClick}>🕹️</span>
        {showMessage && <Message />}
      </header>

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
    </>
  )
}

export default App
