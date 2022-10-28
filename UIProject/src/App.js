import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ReactLoading from "react-loading";
import GuildPage from './pages/GuildPage';
import Login from './pages/Login';
import PlayerPage from './pages/PlayerPage';
import useToken from './components/useToken';
import { makeStyles } from '@mui/styles';
import './App.css';
import axios from 'axios';
import APIEndPoints from './services/api';
import { setCharacterMasterData } from './actions/MasterDataActions';

const useStyles = makeStyles({
    loadingSpinner: {
        display: 'flex',
        flex: '1',
        justifyContent: 'center',
        margin: 10
    }
});

function App(props) {
    const classes = useStyles();
    const { token, setToken } = useToken();
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isLoadingError, setIsLoadingError ] = useState(false);

    useEffect(() => {
        setToken(null)
        setIsLoading(true);
    }, []);

    useEffect(() => {
        if(isLoading) {
            loadMasterData();
        };
    }, [isLoading]);

    const loadMasterData = async () => {
        axios({
            method: 'get',
            url: APIEndPoints.CHARACTER_DATA
        })
            .then((response) => {
                props.setCharacterMasterData(response.data);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoadingError(true);
            });
    }
    
    if(!token) {
        return <Login setToken={setToken} />
    } else {
        return (
            <div className='App'>
                {
                    isLoading ? 
                        <div className={classes.loadingSpinner}>
                            <ReactLoading height={'20%'} width={'20%'} type='spinningBubbles' color='#1976d2'/>
                        </div> :
                        <Router history={Router.browserHistory}>
                            <Routes>
                                <Route path="/" element={<GuildPage/>} />
                                <Route path="/Player/:guildId/:allyCode/" element={<PlayerPage />} />
                            </Routes>
                        </Router>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
    };
}

const mapDispatchToProps = (dispatch) => ({
    setCharacterMasterData: (characterData) => dispatch(setCharacterMasterData(characterData))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
