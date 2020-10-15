import React from 'react';
import Board from './board';
import * as Minesweeper from '../gameLogic';

class Game extends React.Component {
    constructor(props) {
        super(props);
        const board = new Minesweeper.Board(9, 10);
        this.state = { board: board };

        this.updateGame = this.updateGame.bind(this);
        this.newGame = this.newGame.bind(this)
    }

    updateGame(tile, flagged) {
        if (flagged) {
            tile.toggleFlag();
        } else {
            tile.explore();
        }

        this.setState({ board: this.state.board });
    }

    // dificulty(event) {
    //     event.preventDefault();
        

    // }

    newGame(event) {
        event.preventDefault();
        const board = new Minesweeper.Board(9, 10)
        this.setState({ board: board})
    }

    render() {
        let modal
        
        if (this.state.board.won() || this.state.board.lost()) {
            let text
            if (this.state.board.won()) {
                text = `You have won!`
            } else {
                text = 'You have lost.'
            }

            modal = 
                <div>
                    {text}
                </div>
        }

        return (
            <div>
                {modal}
                <Board board={this.state.board} updateGame={this.updateGame}/>
                <button onClick={this.newGame}>New Game</button>
            </div>
        );
    }
}

export default Game

