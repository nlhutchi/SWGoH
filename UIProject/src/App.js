import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactLoading from "react-loading";
import GuildPage from './pages/GuildPage';
import Login from './pages/Login';
import PlayerPage from './pages/PlayerPage';
import PlanTW from './pages/PlanTW';
import useToken from './components/useToken';
import { makeStyles } from '@mui/styles';
import './App.css';
import axios from 'axios';
import APIEndPoints from './services/api';
import { setCharacterMasterData, setGLMasterData } from './actions/MasterDataActions';

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
    const masterDataCalls = [
        {
            endpoint:APIEndPoints.CHARACTER_DATA,
            callBack: props.setCharacterMasterData
        },
        {
            endpoint: APIEndPoints.GL_REQ_DATA,
            callBack: props.setGLMasterData
        }
    ];

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
        var promiseArray = [];
        masterDataCalls.forEach((call) => {
            promiseArray.push(
                axios({
                    method: 'get',
                    url: call.endpoint
                })
                    .then((response) => {
                        console.log('response', response)
                        call.callBack(response.data);
                    })
                    .catch((error) => {
                        console.error(error);
                        setIsLoadingError(true);
                    })
            );
        })
        await Promise.all(promiseArray)
            .then(() => {
                setIsLoading(false);
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
                                <Route path="/PlanTW/:guildId/" element={<PlanTW />} />
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
    setCharacterMasterData: (characterData) => dispatch(setCharacterMasterData(characterData)),
    setGLMasterData: (glData) => dispatch(setGLMasterData(glData))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
