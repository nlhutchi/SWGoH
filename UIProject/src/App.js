import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import InitializeData from './pages/InitializeData';
import GuildData from './pages/GuildData';
import Login from './pages/Login';
import useToken from './components/useToken';
import './App.css';

function App() {
    const { token, setToken } = useToken();
  
    console.log('app token', token)
    if(!token) {
      return <Login setToken={setToken} />
    }
    
    return (
        <Router history={Router.browserHistory}>
            <Routes>
                <Route
                    path="/"
                    element={<InitializeData/>}
                />
                <Route path="/Guild" element={<GuildData/>} />
            </Routes>
        </Router>
    );
}

function mapStateToProps(state) {
    return {
    };
}

const mapDispatchToProps = (dispatch) => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
