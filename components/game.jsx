import React from 'react';
import Board from './board';
import * as Minesweeper from '../gameLogic';

class Game extends React.Component {
    constructor(props) {
        super(props);
        const board = new Minesweeper.Board(8, 10);
        // this.subscribers = []
        this.state = { board: board };

        this.updateGame = this.updateGame.bind(this);
        this.newGame = this.newGame.bind(this);
        this.dificulty = this.dificulty.bind(this);
        
    }

    // subscribe = (f, pos) => {
    //     this.subscribers[pos[0], pos[1]] = f
    // }

    // unsubscribe = (x, y) => {
    //     this.subscribers[x][y] = null
    // }

    updateGame(tile, flagged) {
        if (flagged) {
            tile.toggleFlag();
        } else {
            tile.explore();
        }

        // this.subscribers[tile.pos[0], tile.pos[1]]()
        this.setState({ board: this.state.board });
    }

    dificulty(e) {
        let dificulty = document.getElementById('dificulty');
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

    newGame(e) {
        e.preventDefault();
        this.dificulty()
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
                    <div className='inner-modal'>
                        {text}
                        <button onClick={this.newGame}>New Game</button>
                    </div>
                </div>
        }

        let bomb = '💣'

        return (
            <div className="game-main">
                {modal}
                <h1>Minesweeper {bomb}</h1>
                <div className='instructions'>
                    <p>Click to explore a tile.</p>
                    <p>alt+Click to flag a tile.</p>
                </div>
                <div className='game-area'>
                    <div className='game-controles'>
                        <button onClick={this.newGame}>New Game</button>
                        <select onChange={this.dificulty} name="dificiulty" id="dificulty">
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                    <div className='spacer'></div>
                    <div className='game-board'>
                        <Board board={this.state.board} updateGame={this.updateGame}/>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Game

