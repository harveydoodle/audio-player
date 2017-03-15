import React, {Component} from 'react';
import { Link } from 'react-router';

class SongsList extends Component {
    render() {
        const songsArray = this.props.songs;
        const songName = songsArray.map((song, index) => {
            return (<li key={index}>
                <button onClick={(e)=>this.props.selectSong(index)} type="button">
                    play
                </button> 
                <Link to={/songs/ + song.id}>{song.title} </Link>
            <br/>
            </li>);
        })
        return (
            <div>
                <h1>Songs List Page</h1>
                <ul>
                    {songName}
                </ul>
            </div>
        )
    }
}

export default SongsList;