import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import InitializeData from './pages/InitializeData';
import GuildData from './pages/GuildData';
import './App.css';

function App() {
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
