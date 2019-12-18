import React, { Component } from 'react';
import PlaylistContainer from './Playlist-container';
import Spinner from '@andes/spinner';
import './Dashboard.css';
import Axios from 'axios';

class Dashboard extends Component {

    state = {
        playlists: null,
        isLoading: false
    }

    componentDidMount() {
        this.setState({isLoading: true});
        setTimeout(() => {
            Axios.get('./playlists.json')
            .then(data => this.setState({
                playlists: data.data,
                isLoading: false
            }))
        }, 1000)
    }

    render() {
        return (
            <div className="dashboard-app container">
                <Spinner show={this.state.isLoading} />
                <header className="m-container flex flex-center-v">
                    <div className="profile flex flex-center-h flex-center-v">
                        <div className="profile__picture">
                            <img src="http://lorempixel.com/400/400" alt=""/>
                        </div>
                        {/*<div className="profile__name">
                            Hola Claudio!
                        </div>*/}
                    </div>
                    <div className="search">
                        <h1>Hola Claudio!</h1>
                        <input placeholder="Buscar" className="search-input" type="text"/>
                    </div>
                </header>
                { this.state.playlists && <PlaylistContainer playlists={this.state.playlists}></PlaylistContainer>}
            </div>
        )
    }
}

export default Dashboard;