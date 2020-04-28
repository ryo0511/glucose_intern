import React, {useState} from 'react'
import Button from './Button'
import Square from './Square'
import boardStatus from '../actions/boardStatus'

export default class Board extends React.Component {
  handleClick(i: number, j: number) {
    const stoneColor = boardStatus.xIsNext ? 1 : -1
    const newSquares = boardStatus.reverseEightLine(i, j, stoneColor, boardStatus.squares)
    if (!newSquares) {
      return
    }
    boardStatus.squares = newSquares
    boardStatus.xIsNext = !boardStatus.xIsNext
  }

  renderSquare(i: number, j: number) {
    const stoneColor = boardStatus.xIsNext ? 1 : -1
    boardStatus.canPut(i, j, stoneColor, boardStatus.squares)
    return <Square value={boardStatus.squares[i][j]} onClick={() => this.handleClick(i, j)} />
  }

  render() {
    const winner = boardStatus.calculateWinner(boardStatus.squares)
    let status: string
    if (winner) {
      status = winner
    } else {
      status = 'Next Player: ' + (boardStatus.xIsNext ? '黒' : '白')
    }

    return (
      <div>
        <div className="status">{status}</div>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div className="board-row">{[0, 1, 2, 3, 4, 5, 6, 7].map((j) => this.renderSquare(i, j))}</div>
        ))}
        <Button
          stoneCounts={() => boardStatus.countStone(boardStatus.squares)}
          onClickPass={() => boardStatus.pass()}
          onClickInit={() => boardStatus.boardInit()}
        />
      </div>
    )
  }
}
