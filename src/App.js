// FEEDBACK: 
// 1) Generally nice job. The only sort of glitch is that whenever you move songs and move back, it will just continue playing that
// song from where it last was and I think it's related to the fact that you have several instances of the music player.
// It's definitely better than where it used to be though! You used to have the problem of several players playing different music.

// - Thuy

//this file is for UI display
import React, { Component } from 'react';
import { Link } from 'react-router';
import SongDetails from './components/SongDetails';
import SongsList from './components/SongsList';

class App extends Component {
  constructor(){
    super();
    this.state = {
      id:0,
      playing: false,
    }
    this.playSong = this.playSong.bind(this);
    this.pauseSong = this.pauseSong.bind(this);
    this.previousSong = this.previousSong.bind(this);
    this.nextSong = this.nextSong.bind(this);
    this.selectSong = this.selectSong.bind(this);
  }
  
  // AUDIO PLAYER 
  playSong() {
    this.setState({
      playing: true
    })
    let song = document.getElementById(this.state.id);
    song.play();
  }

  pauseSong() {
    this.setState({
      playing: false
    })
    let song = document.getElementById(this.state.id);
    song.pause();
  }

  previousSong() {
    this.pauseSong();
    if (this.state.id > 0) {
      this.setState({
        id: this.state.id - 1
      })
    }

    let prevSong = document.getElementById((this.state.id - 1));
    prevSong.play();
  }

  nextSong() {
    this.pauseSong();

    if(this.state.id < 2) {
      this.setState({
        id: this.state.id + 1
      })
    }

    let nextSong = document.getElementById(this.state.id + 1);
    nextSong.play();
  }
  //END AUDIO PLAYER

  selectSong(selectedIndex) {
    // stops current song from playing
    let currentSong = document.getElementById(this.state.id);
    if (this.state.playing) {
      currentSong.pause();
    }

    // load the next song
    this.setState({
        id: selectedIndex,
        playing: true
    })
    // let song = document.getElementById(index);
    let selectedSong = document.getElementById(selectedIndex)
    selectedSong.play();
  }

  render() {
    const songsArray = this.props.route.songs;

    return (
      <div className="App">
        <Link to='/songs'>Songs List</Link>
        <Link to={`/songs/${this.state.id}`}>Song Details</Link><br/>
        <AudioPlayer 
          playSong={this.playSong} 
          pauseSong={this.pauseSong} 
          previousSong={this.previousSong} 
          nextSong={this.nextSong} 
          id={this.state.id} 
          song = {songsArray}
        />
        
        {React.cloneElement( // will clone and return this.props.children; new children will replace prev children
          this.props.children,  // will have this.props.children's original props
          { 
            songs: this.props.route.songs, 
            selectSong: this.selectSong
          } 
        )}
      </div>
    );
  }
}

class AudioPlayer extends Component {
  render () {  
    const songsArray = this.props.song;
    // console.log(songsArray)
    const audioArray = songsArray.map((song,index)=>{
      return <audio id={index} src={songsArray[index].source} type="audio/mp3"/>
    })
    return (
      <div>
        <h4>{songsArray[this.props.id].title}</h4>
        <button onClick={this.props.playSong} type="button">Play audio</button>
        <button onClick={this.props.pauseSong} type="button">Pause audio</button>
        <button disabled={this.props.id < 1} onClick={this.props.previousSong} type="button">Previous song</button>
        <button disabled={this.props.id > 1} onClick={this.props.nextSong} type="button">Next song</button>
        {audioArray}
      </div>
    );
  }
}


export default App;
