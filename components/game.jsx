import React from 'react';
import Board from './board';
import * as Minesweeper from '../gameLogic';

class Game extends React.Component {
    constructor(props) {
        super(props);
        const board = new Minesweeper.Board(9, 10);
        this.state = { board: board };

        this.updateGame = this.updateGame.bind(this);
        this.newGame = this.newGame.bind(this);
        this.dificulty = this.dificulty.bind(this);
    }

    updateGame(tile, flagged) {
        if (flagged) {
            tile.toggleFlag();
        } else {
            tile.explore();
        }

        this.setState({ board: this.state.board });
    }

    dificulty(event) {
        event.preventDefault();
        let dificulty = document.getElementsByName('dificulty');
        if (dificulty.value === 'easy') {
            const board = new Minesweeper.Board(8, 10)
            this.setState({ board: board })
        } else if (dificulty.value === 'medium') {
            const board = new Minesweeper.Board(16, 40)
            this.setState({ board: board })
        } else if (dificulty.value === 'hard') {
            const board = new Minesweeper.Board(21, 99)
            this.setState({ board: board })
        }
    }

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
                <div className='modal'>
                    {text}
                </div>
        }

        let newGame

        if (this.state.board.won() || !this.state.board.lost()) {
            newGame = '🙂'
        } else {
            newGame = '☹️'
        }

        

        return (
            <div className="game-main">
                {modal}
                <h1>Minesweeper</h1>
                <div className='game-area'>
                    <div className='game-controles'>
                        <button onClick={this.newGame}>New Game</button>
                        {/* <label for='dificulty'></label> */}
                        <select onChange={this.dificulty()} name="dificiulty" id="dificulty">
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                    <div className='game-board'>
                        <Board board={this.state.board} updateGame={this.updateGame}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game

