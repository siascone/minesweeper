import React from 'react';
import Tile from './tile'
import * as Minesweeper from '../gameLogic';

class Board extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Tile />
        );
    }
}

export default Board;