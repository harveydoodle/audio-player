import React, {Component} from 'react';

class SongDetails extends Component {
    render() {
        const songId = this.props.params.id;
        const songsArray = this.props.songs;

        let details = songsArray.filter((title, description, songId)=>{
            if (songsArray.id === songId) {
                return songsArray.title
            }
        })
        return (
            <div>
                <h1>Song Details Page</h1>
                    <h3>{songsArray[songId].title}</h3> 
                    <button onClick={(e)=>this.props.selectSong(songId)} type="button">play</button>
                    <p>{songsArray[songId].description}</p>
            </div>
        )
    }
}

export default SongDetails;