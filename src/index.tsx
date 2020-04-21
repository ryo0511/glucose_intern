import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

interface SquarePropsInterface {
  value: number;
  onClick: () => void
}

function Square(props: SquarePropsInterface){
  return (
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

interface BoardPropsInterface{
  squares: Array<number>[]
}

interface BoardStateInterface{
  squares: Array<number>[];
  xIsNext: boolean;
}

class Board extends React.Component<BoardPropsInterface, BoardStateInterface> {
  constructor(props: BoardPropsInterface) {
    super(props);
    this.state = {
      squares: boardInit(),
      xIsNext: false,
    }
  }

  reverseEightLine(i: number, j: number, stoneColor: number) {
    var squares = JSON.parse(JSON.stringify(this.state.squares))
    var isUserStone = false
    var reversedFlag = false
    var reversedLineCount = 0
    var directionList = [
                          [-1, -1], [ 0, -1], [ 1, -1],
                          [-1,  0],           [ 1,  0],
                          [-1,  1], [ 0,  1], [ 1,  1]
                        ]
    for (const direction of directionList) {
      const squaresBackUp = JSON.parse(JSON.stringify(squares))
      var x = j
      var y = i
      isUserStone = false
      reversedFlag = false
      while (true){
        x += direction[0]
        y += direction[1]
        if (x < 0 || 7 < x || y < 0 || 7 < y) {
          break
        }
        if (squares[y][x] === 0) {
          break
        }
        if (squares[y][x] === stoneColor) {
          isUserStone = true
          break
        }
        squares[y][x] = stoneColor
        reversedFlag = true
      }
      if ((!reversedFlag || !isUserStone)) {
        squares = squaresBackUp
      } else {
        reversedLineCount += 1
      }
    }
    if (reversedLineCount > 0) {
      squares[i][j] = stoneColor
      return squares
    }
    return false
  }

  handleClick(i: number, j:number) {
    const stoneColor = this.state.xIsNext ? 1 : -1;
    for (var dir=0; dir<9; dir++) {
      const newSquares = this.reverseEightLine(i, j, stoneColor)
      if (!newSquares) {
        return
      }
      this.setState({
        squares: newSquares,
        xIsNext: !this.state.xIsNext
      });
    }
  }

  renderSquare(i: number, j:number) {
    return <Square
      value={this.state.squares[i][j]}
      onClick={() => this.handleClick(i, j)}
    />;
  }

  render() {
    countStone(this.state.squares);
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next Player: " + (this.state.xIsNext ? "黒" : "白");
    }

    return (
      <div>
        <div className="status">{status}</div>
        { [0,1,2,3,4,5,6,7].map((i) =>
          <div className="board-row">
            { [0,1,2,3,4,5,6,7].map((j) => this.renderSquare(i, j))}
          </div>
        )}
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={boardInit()}/>
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function countStone(squares: Array<number>[]) {
  var black: number = 0;
  var white: number = 0;

  for (const values of squares) {
    for (const value of values) {
      if (value === 1) {
        black++;
      } else if (value === -1) {
        white++;
      }
    }
  }

  console.log("black=", black)
  console.log("white=", white)
  return null;
}

function boardInit() {
  return [
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,1,-1,0,0,0],
            [0,0,0,-1,1,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
          ]
}

function calculateWinner(squares: Array<number>[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
