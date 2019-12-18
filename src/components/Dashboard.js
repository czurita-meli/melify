import React, { Component } from 'react';
import PlaylistContainer from './Playlist-container';
import Spinner from '@andes/spinner';
import './Dashboard.css';
import Axios from 'axios';

class Dashboard extends Component {

    state = {
        playlists: null,
        user: null,
        isLoading: false
    }

    componentDidMount() {
        this.setState({isLoading: true});
        const playlists = Axios.get('http://localhost:5000/playlists', {
            headers: {Authorization: localStorage.getItem('token')}
        })
        const user = Axios.get('http://localhost:5000/user', {
            headers: {Authorization: localStorage.getItem('token')}
        })

        Promise.all([playlists, user])
            .then(([playlists, user]) => {
                this.setState({
                    playlists: playlists.data,
                    user: user.data,
                    isLoading: false
                })
            })
            .catch(err => {
                this.props.history.push('/');
                throw new Error('Hubo un error al obtener los datos de usuario y playlists. ' + err);
                
            })
    }

    logout = () => {
        localStorage.removeItem('token');
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="dashboard-app container">
                <Spinner show={this.state.isLoading} />
                <header className="m-container flex flex-center-v">
                    <div className="profile flex flex-center-h flex-center-v">
                        <div className="profile__picture">
                            {this.state.user && <img src={this.state.user.image} alt=""/> }
                        </div>
                        {<div onClick={this.logout} className="profile__name">
                            Salir
                        </div>}
                    </div>
                    <div className="search">
                        {this.state.user && <h1>Hola {this.state.user.display_name}!</h1>}
                        <input placeholder="Buscar" className="search-input" type="text"/>
                    </div>
                </header>
                { this.state.playlists && <PlaylistContainer playlists={this.state.playlists}></PlaylistContainer>}
            </div>
        )
    }
}

export default Dashboard;