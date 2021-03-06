import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.match.params.slug);
    const album = albumData.find( album =>
      {
  		return album.slug === this.props.match.params.slug
  		});

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      volume: .5,
      isPlaying: false
     };

     this.audioElement = document.createElement('audio');
     this.audioElement.src = album.songs[0].audioSrc;
     this.audioElement.volume = this.state.volume;
  }

  componentDidMount() {
    this.eventListeners = {
       timeupdate: e => {
         this.setState({ currentTime: this.audioElement.currentTime });
       },
       durationchange: e => {
         this.setState({ duration: this.audioElement.duration });
       }
     };
     this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
     this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
   }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeUpdate', this.eventListeners.timeUpdate);
    this.audioElement.removeEventListener('durationChange', this.eventListeners.durationChange);
  }

  play() {
    this.audioElement.play();
    this.setState({isPlaying: true});
  }

  pause() {
    this.audioElement.pause();
    this.setState({isPlaying: false});
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({currentSong: song});
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong ===song;
    if (this.state.isPlaying && isSameSong){
      this.pause();
    } else {
      if(!isSameSong) {this.setSong(song); }
      this.play();
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(this.state.album.songs.length - 1, currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration* e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime});
  }
  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ volume: newVolume});
  }

  formatTime(sec){
    if(sec == NaN){
      return "-:--"
    } else {
      return Math.floor(sec / 60) + ":" + Math.floor(sec % 60 ? sec % 60 : '00')
    }
  }

  render() {
    return (
      <section className="Album">
        <section id="album-info">
          <img id = "album-cover-art" src={this.state.album.albumCover} alt = "album cover" />
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
       </section>
       <table id="somg-list">
         <colgroup>
           <col id="song-number-column" />
           <col id="song-title-column" />
           <col id="song-duration-column" />
         </colgroup>
         <tbody>
            {this.state.album.songs.map( (song, index) =>
             <tr className="song" key={index} onclick={() => this.handleSongClick(song)} >
               <td className="song-actions">
                   <button>
                     <span className="song-number">{index+1}</span>
                     <span className="ion-play"></span>
                     <span className="ion-pause"></span>
                   </button>
               </td>
               <td className="song-title">{song.title}</td>
               <td className="song-duration">{song.duration}</td>
             </tr>
             )}
         </tbody>
       </table>
       <PlayerBar
         isPlaying={this.state.isPlaying}
         currentSong={this.state.currentSong}
         currentTime={this.audioElement.currentTime}
         duration={this.audioElement.duration}
         handleSongClick={() =>this.handleSongClick(this.state.currentSong)}
         handlePrevClick={() =>this.handlePrevClick()}
         handleNextClick={() =>this.handleNextClick()}
         handleTimeChange={(e) =>this.handleTimeChange(e)}
         handleVolumeChange={(e) =>this.handleVolumeChange(e)}
         formatTime={(e) => this.formatTime(e)}
         />
      </section>
    );
  }
}


export default Album;
