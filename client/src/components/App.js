import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <div className="app">
                <Router>
                    <Route exact path="/" component={Home} />
                </Router>
            </div>
        );
    }
}

export default App;
