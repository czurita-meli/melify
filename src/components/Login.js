import React from 'react';
import Card from '@andes/card';
import Button from '@andes/button';
import './Login.css';
import Axios from 'axios';

class Login extends React.Component {

    code;
    state = {
        spotifyLogin: ''
    }

    componentDidMount() {
        this.prepareToken();
        if (this.code) {
            Axios.get('http://localhost:5000/token', {
                headers: {code: this.code}
            }).then(res => {
                localStorage.setItem('token', res.data.token);
                this.props.history.push('/dashboard');
            })
        }
    }

    prepareToken = () => {
        const pattern = /code=[\w-]+/;
        const clientId = '26ff4f9c1dca42bdb44a88bb1826f779';
        const scopes = [
            'user-read-playback-state',
            'ugc-image-upload',
            'streaming',
            'playlist-read-private',
            'playlist-modify-private'
        ]
        const redirectUrl = 'http://localhost:3000';

        this.code = window.location.href
            .match(pattern) && window.location.href
                .match(pattern)[0].slice(5)
        this.setState({
            spotifyLogin: `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUrl}&scope=${scopes.join('%20')}&state=34fFs29kd09`
        })
    }
    
    render() {
        return (
            <div>
                { !this.code && 
                <div className="login-container">
                    <Card className="login-card">
                        <div className="login__elements">
                            <h1 style={{color: 'rgba(0, 0, 0, 0.8)'}}>Ingresar a Melify</h1>
                            <a href={ this.state.spotifyLogin }>
                                <Button>Ingresar</Button>
                            </a>
                        </div>
                    </Card>
                </div> }
            </div>
        )
    }
}

export default Login;