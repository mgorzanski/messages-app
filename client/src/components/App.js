import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import AdminControlPanel from './AdminControlPanel';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="app">
                    <Route exact path="/" component={Home} />
                    <Route path="/admin-control-panel/" component={AdminControlPanel} />
                </div>
            </Router>
        );
    }
}

export default App;
