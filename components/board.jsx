import React from 'react';
import Tile from './tile'

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.renderRows = this.renderRows.bind(this);
        this.renderTiles = this.renderTiles.bind(this);
    }

    render() {
        // console.log('board')
        return (
            <div className='baord-gird'>
                {this.renderRows()}
            </div>
        );
    }

    renderRows() {
        const board = this.props.board
        return board.grid.map((row, idx) => {
            return (
                <div className='board-row'>
                    {this.renderTiles(row, idx)}
                </div>
            );
        });
    }

    renderTiles(row, idx) {
        const board = this.props.board
        return row.map((tile, jdx) => {
            return (
                <Tile 
                    tile={tile}
                    updateGame={this.props.updateGame}
                    key={jdx / Math.random()}
                />
            );
        });
    }
}

export default Board;