import React from 'react';
import Track from './Track';
import List, { ListItem } from '@andes/list';
import './Playlist-item.css';

export default class PlaylistItem extends React.Component {
    state = {
        isActive: false
    }

    changeState = () => {
        this.setState({isActive: !this.state.isActive})
    }

    removePlaylist = (e) => {
        e.stopPropagation();
        alert('Removing ' + this.props.playlist.id);
    }

    render() {
        return(
            <React.Fragment>
                <ListItem
                    className="playlist-item"
                    onClick={ this.changeState }
                    primary={ <div>
                        <span>{this.props.playlist.name} </span>
                    </div> }
                    tertiary={<div className="playlist__actions">
                        <span>{this.props.playlist.tracks.length} {this.props.playlist.tracks.length !== 1 ? ' canciones' : ' cancion'}</span>
                        <span onClick={this.removePlaylist} className="icon-cross"></span>
                        <span className={this.state.isActive ? 'icon-circle-up' : 'icon-circle-down'}></span>
                    </div>}></ListItem>
                <List style={{display: this.state.isActive ? 'inherit' : 'none'}}>
                    { this.props.playlist.tracks.map(track => 
                        <Track track={track} key={track.id} style={{ color: "white"}}></Track>) }
                </List>
            </React.Fragment>
        )
    }
}
