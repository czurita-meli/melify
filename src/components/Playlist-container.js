import React, { Component } from 'react';
import Button from '@andes/button';
import List from '@andes/list';
import PlaylistItem from './Playlist-item';
import Modal from '@andes/modal';
import Form from '@andes/form';
import TextField from '@andes/textField';

import './Playlist-container.css'

export default class PlaylistContainer extends Component {

    state = {
        isModalVisible: false,
        playlists: this.props.playlists
    }

    toggleModal = () => {
        this.setState({
            isModalVisible: !this.state.isModalVisible
        })
    }

    onChangePlaylists = (e) => {
        const searching = new RegExp(e.currentTarget.value, 'gi');
        const inmutablePlaylist = JSON.parse(JSON.stringify(this.props.playlists));
        const filteredPlaylists = [];
        if (e.currentTarget.value.length > 2) {
            inmutablePlaylist.forEach(playlist => {
                let tracks;
                tracks = playlist.tracks.filter(track => (
                    track.name.search(searching) !== -1) || track.artists.some(artist => artist.search(searching) !== -1)
                    );
                if(tracks.length) {
                    filteredPlaylists.push(playlist);
                    filteredPlaylists[filteredPlaylists.length -1].tracks = tracks;
                }
            })
            this.setState({playlists: filteredPlaylists
                
                })
        } else {
            this.setState({playlists: this.props.playlists})
        }
    }

    render = () => {
        
        return(
            <div className="playlist container-v">
                <Modal
                    onClose={this.toggleModal}
                    visible={this.state.isModalVisible}>
                    <Form>
                        <div className="flex flex-center-h">
                            <h2 className="andes-form-dialog__title">Crear Playlist</h2>
                        </div>
                        <TextField label="Nombre"></TextField>
                        <TextField label="Descripción"></TextField>
                        <div className="container-v form-button flex flex-center-h">
                            <Button>Crear</Button>
                        </div>
                    </Form>
                </Modal>
                <div className="playlist__actions flex between flex-center-v m-container">
                    <span className="playlist__title">Tus Playlists</span>
                    <div className="playlist-search">
                        <input onChange={this.onChangePlaylists} placeholder="Buscar en playlists" className="search-input" type="text"/>
                    </div>
                    <Button onClick={this.toggleModal}>Nueva Playlist</Button>
                </div>
                <div className="m-container">
                    <List>
                        { this.state.playlists.map(playlist => <PlaylistItem playlist={playlist} key={playlist.id}></PlaylistItem>) }
                    </List>
                </div>
            </div>
        )
    }
}