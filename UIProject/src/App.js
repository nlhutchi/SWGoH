import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

function App() {

  return (
    <Router history={Router.browserHistory}>
      <Routes>
          <Route
              path="/"
              element={<div>Initialize Application</div>}
          />
          <Route path="/Guild" element={<div>Guild</div>} />
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
