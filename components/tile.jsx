import React from 'react';

class Tile extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        let flagged
        if (e.altKey) {
            flagged = true
        } else {
            flagged = false
        }

        this.props.updateGame(this.props.tile, flagged)
    }

    render() {
        const tile = this.props.tile
        let text
        let klass
        let count
        // console.log('tile')
        if (tile.explored) {
            if (tile.bombed) {
                klass = 'bombed';
                text = '💣';
            } else {
                klass = 'explored';
                count = tile.adjacentBombCount();
                text = (count > 0 ? `${count}` : '');
            }
        } else if (tile.flagged) {
            klass = 'flagged'
            text = '⛳️';
        } else {
            klass = 'unexplored';
        }

        klass = `tile ${klass}`;
        return (
            <div className={klass} onClick={this.handleClick}>{text}</div>
        );
    }
}

export default Tile;