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
      squares: [
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,1,-1,0,0,0],
                [0,0,0,-1,1,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
              ],
      xIsNext: true,
    }
  }

  handleClick(i: number, j:number) {
    const squares: Array<number>[] = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i][j]) {
      return;
    }
    squares[i][j] = this.state.xIsNext ? 1 : -1;
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }

  renderSquare(i: number, j:number) {
    return <Square
      value={this.state.squares[i][j]}
      onClick={() => this.handleClick(i, j)}
    />;
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next Player: " + (this.state.xIsNext ? 1 : -1);
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
          <Board squares={Array(9).fill("")}/>
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
