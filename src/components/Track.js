import React from 'react';
import { ListItem } from '@andes/list';
import './Track.css';

export default class Track extends React.Component {

    state = {
        isPlaying: false
    }
    song;

    changeStatus = () => {
        this.state.isPlaying ? this.song.pause() : this.song.play();
        this.setState({
            isPlaying: !this.state.isPlaying
        })
    }

    removeTrack = (e) => {
        e.stopPropagation();
        alert('Removing ' + this.props.track.id);
    }

    componentDidMount() {
        this.song = document.querySelector(`audio[name="${this.props.track.id}"]`);
    }

    render() {
        return (
            <ListItem
            image={{src: this.props.track.image}}
            primary={ `${this.props.track.name} - ${this.props.track.artists}` }
            tertiary={
                <div className="track-actions flex flex-center-v">
                    <audio name={this.props.track.id} src={this.props.track.preview}></audio>
                    <span onClick={this.removeTrack} className="icon-cross"></span>
                    <span
                    className={`${this.state.isPlaying ? 'icon-pause' : 'icon-play2'} track-icon`}
                    onClick={this.changeStatus}></span>
                </div>}></ListItem>
        )
    }
}
