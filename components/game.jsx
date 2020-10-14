import React from 'react';
// import Board from './board';
// import * as Minesweeper from '../gameLogic';

class Game extends React.Component {
    constructor(props) {
        super(props);
        // const board = new Minesweeper.Board(10, 10);
        // this.state = { board: board };

        // this.updateGame = this.updateGame.bind(this)

    }

    updateGame() {

    }

    render() {
        return (
            <div>
                {/* <Board board={this.state.board} updateGame={this.updateGame} /> */}
                This is Minesweeper
            </div>
        );
    }
}

export default Game

