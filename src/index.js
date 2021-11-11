import React from 'react';
import ReactDOM from 'react-dom';
//import Instabug from 'instabug-reactnative';

/**
 * Note: There is dependencies for React Native deveopment. Instabug was the intention of the new feature here. 
 */
import './index.css';

function Greeting() {
  let personal = {
    firstName: "Jim",
    lastName: "Cooper",
    age: 18,
    isAdult: true
  };
  personal.age = 29;
  let message = 'Hello';
  let sayHi = function hi() {
    console.log(message);
  };
  sayHi(personal.message);
}


Greeting();
let message = Greeting();
console.log(message, `because I'm feeling all alone...you can't see me ` && `is there anybody out there?`);

if (message === `Hello`) {
  Greeting(` because I'm feeling all alone...you can't see me`);
  console.log(`You can't see me as I did not eveluate as equal exactly as the initial setting of the message to Hello...`);
}
console.log(`because I'm feeling all alone...





and I wanted you to see this...`);

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.PureComponent {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />

    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game4 extends React.PureComponent {
  constructor(props) {
    // 2. Initialize and configure Instabug in the constructor or componentWillMount
    //Instabug.start('xxxxxxxxxxxxxxxxxxxx', [Instabug.invocationEvent.shake, Instabug.invocationEvent.screenshot]);
    // Note: This app key string may need to be unique to you. 
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null, NaN) // switch null values as needed.
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    /**Dev wants to use this step parameter 
     * that is not being read/used at all */
    const moves = history.map((triplestep, move) => {
      console.log(triplestep);// updating three steps at a time...
      // null values set for now, but make new determination as to this value.
      const desc = move ?
        ' Back to #.' + move :
        ' Start ';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = " Winner: " + winner;
    } else {
      status = " Next UP! : " + (this.state.xIsNext ? "Dr. Faulkner" : "WOPR ");
    }
    /**Board style below are not finished, but the concept is for this style to affect the 
    onClick and on each step/move reflect the styles with the strings X O... */
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
            style={{
              height: 200,
              width: 200,
              borderRadius: 50,
              color: "#fff",
              backgroundColor: "#333",
              position: "absolute",
              bottom: 200,
              right: 200,
              fontSize: 20,
              cursor: "pointer"
            }}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}



ReactDOM.render(<Game4 />, document.getElementById("root"));

function calculateWinner(squares) {

  const lines = [
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 1, 2]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
    //...

  }
  return null;
}




