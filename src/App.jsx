import { useState } from "react"
import Player from "./Components/Player"
import GameBoard from "./Components/GameBoard"
import Log from "./Components/Log"
import { WINNING_COMBINATIONS } from "./winning-combinations"
import GameOver from "./Components/GameOver"

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

const INITIAL_GAME_BOARD = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
]

function deriveActivePlayer(gameTruns) {
  let currentPlayer = 'X';
  if (gameTruns.length > 0 && gameTruns[0].player === 'X') {
    currentPlayer = 'O'
  }
  return currentPlayer;
}

function deriveWinner(gameBoard, players) {
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
    
    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner
}

function deriveGameBoard(gameTruns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(col => [...col])];
  for (const turn of gameTruns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS)

  const [gameTruns, setGameTurns] = useState([])
  const activePlayer = deriveActivePlayer(gameTruns);
  const gameBoard = deriveGameBoard(gameTruns)
  const winner = deriveWinner(gameBoard, players)
  const hasDraw = gameTruns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns];

      return updatedTurns;
    })
  }

  function handleRestart(){
    setGameTurns([])
  }

  function handlePlayerName(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers, [symbol]: newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id='players' className="highlight-player">
          <Player initialName={PLAYERS.X} symbol={"X"} isActive={activePlayer === 'X'} onChangeName={handlePlayerName}></Player>
          <Player initialName={PLAYERS.O} symbol={"O"} isActive={activePlayer === 'O'} onChangeName={handlePlayerName}></Player>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} restart={handleRestart}/> }
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTruns} />
    </main>
  )
}

export default App
