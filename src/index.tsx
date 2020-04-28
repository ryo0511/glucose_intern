import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as boardManegement from './boardManegement'

interface SquarePropsInterface {
  value: number
  onClick: () => void
}

function Square(props: SquarePropsInterface) {
  let stoneColor: string
  switch (props.value) {
    case 1:
      stoneColor = 'black-stone'
      break
    case -1:
      stoneColor = 'white-stone'
      break
    case 2:
      stoneColor = 'can-put'
      break
    default:
      stoneColor = 'no-stone'
      break
  }
  return (
    <button className="square" onClick={props.onClick}>
      <div className={stoneColor} />
    </button>
  )
}

interface BoardPropsInterface {
  squares: Array<number>[]
}

interface BoardStateInterface {
  squares: Array<number>[]
  xIsNext: boolean
}

class Board extends React.Component<BoardPropsInterface, BoardStateInterface> {
  constructor(props: BoardPropsInterface) {
    super(props)
    this.state = {
      squares: boardManegement.initialBoard,
      xIsNext: false,
    }
  }

  handleClick(i: number, j: number) {
    const stoneColor = this.state.xIsNext ? 1 : -1
    const newSquares = boardManegement.reverseEightLine(i, j, stoneColor, this.state.squares)
    if (!newSquares) {
      return
    }
    this.setState({
      squares: newSquares,
      xIsNext: !this.state.xIsNext,
    })
  }

  renderSquare(i: number, j: number) {
    const stoneColor = this.state.xIsNext ? 1 : -1
    boardManegement.canPut(i, j, stoneColor, this.state.squares)
    return <Square
      value={this.state.squares[i][j]} onClick={() => this.handleClick(i, j)}
    />
  }

  pass() {
    this.setState({
      xIsNext: !this.state.xIsNext,
    })
  }

  boardInit() {
    this.setState({
      squares: boardManegement.initialBoard,
      xIsNext: false,
    })
  }

  render() {
    const winner = boardManegement.calculateWinner(this.state.squares)
    let status: string
    if (winner) {
      status = winner
    } else {
      status = 'Next Player: ' + (this.state.xIsNext ? '黒' : '白')
    }

    return (
      <div>
        <div className="status">{status}</div>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div className="board-row">{[0, 1, 2, 3, 4, 5, 6, 7].map((j) => this.renderSquare(i, j))}</div>
        ))}
        <Button
          stoneCounts={() => boardManegement.countStone(this.state.squares)}
          onClickPass={() => this.pass()}
          onClickInit={() => this.boardInit()}
        />
      </div>
    )
  }
}

interface ButtonPropsInterface {
  stoneCounts: () => Array<number>
  onClickPass: () => void
  onClickInit: () => void
}

function Button(props: ButtonPropsInterface) {
  const [black, white, nextPlayerCanPut] = props.stoneCounts()
  if (black + white === 64) {
    return <button onClick={props.onClickInit}> 最初から </button>
  }
  console.log('nextPlayerCanPut', nextPlayerCanPut)
  if (nextPlayerCanPut === 0) {
    return <button onClick={props.onClickPass}> パス </button>
  }
  return <div />
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={boardManegement.initialBoard} />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    )
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'))
