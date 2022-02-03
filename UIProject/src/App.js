import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import InitializeData from './pages/InitializeData';
import GuildPage from './pages/GuildPage';
import Login from './pages/Login';
import PlayerPage from './pages/PlayerPage';
import useToken from './components/useToken';
import './App.css';

function App() {
    const { token, setToken } = useToken();
  
    console.log('app token', token)
    if(!token) {
      return <Login setToken={setToken} />
    }
    
    return (
        <div className='App' style={{ width: window.innerWidth}}>
            <Router history={Router.browserHistory}>
                <Routes>
                    <Route
                        path="/"
                        element={<InitializeData/>}
                    />
                    <Route path="/Guild" element={<GuildPage/>} />
                    <Route path="/Player/:allyCode/" exact component={PlayerPage} />
                </Routes>
            </Router>
        </div>
    );
}

function mapStateToProps(state) {
    return {
    };
}

const mapDispatchToProps = (dispatch) => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
