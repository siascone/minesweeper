import { getHashes } from "crypto";
import { number } from "prop-types";

Tile.DELTAS = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
]

export class Tile {
    constructor(board, position) {
        this.board = board;
        this.position = position;
        this.bombed = false;
        this.explored = false;
        this.flagged = false;
    }

    adjacentBombCount() {
        let bombCount = 0;
        this.neighbors().forEach(neighbor => {
            if (neighbor.bombed) {
                bombCount += 1
            }
        });
        return bombCount
    }

    explore() {
        if (this.flagged || this.explored) {
            return this;
        }

        this.explored = true;
        if (!this.bombed && this.adjacentBombCount() === 0) {
            this.neighbors().forEach(tile => {
                tile.explore();
            });
        }
    }

    neighbors() {
        const adjacentCoordinants = [];
        Tile.DELTAS.forEach(delta => {
            const newPosition = [delta[0] + this.position[0], delta[1] + this.position[1]];
            if (this.board.onBoard(newPosition)) {
                adjacentCoordinants.push(newPosition);
            }
        })
    }

    plantBomb() {
        this.bombed = true;
    }

    toggleFlag() {
        if (!this.explored) {
            this.flagged = !this.flagged;
            return true
        }

        return false
    }
}

export class Board {
    constructor(gridSize, numBombs) {
        this.gridSize = gridSize;
        this.grid = [];
        this.numBombs = numBombs;
        this.generateBoard();
        this.plantBombs();
    }

    generateBoard() {
        for (let i = 0; i < this.gridSize; i++) {
            this.grid.push([]);
            for (let j = 0; j < this.gridSize; j++) {
                const tile = new Tile(this, [i, j]);
                this.grid[i].push[tile];
            }
        }
    }

    onBoard(position) {
        return (
            position[0] >= 0 && position[0] < this.gridSize && 
                position[1] >= 0 && position[1] < this.gridSize
        );
    }

    plantBombs() {
        let totalPlantedBombs = 0;
        while(totalPlantedBombs < this.numBombs) {
            const row = Math.floor(Math.random() * (this.gridSize - 1));
            const col = Math.floor(Math.random() * (this.gridSize - 1));

            let tile = this.grid[row][col];
            if (!tile.bombed) {
                tile.plantBomb();
                totalPlantedBombs++
            }
        }
    }

    lost() {
        let lost = false;
        this.grid.forEach(row => {
            row.forEach(tile => {
                if (tile.bombed && tile.explored) {
                    lost = true;
                }
            });
        });
        return lost
    }

    won() {
        let won = true;
        this.grid.forEach(row => {
            row.forEach(tile => {
                if (tile.flagged === tile.revealed || tile.flagged !== tile.bombed) {
                    won = false
                }
            });
        });
        return won
    }
}
