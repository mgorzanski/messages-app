import React, { Component } from 'react';
import './App.css';
import HeaderBar from './HeaderBar';
import HeaderNav from './HeaderNav';
import BottomBar from './BottomBar';
import BottomNav from './BottomNav';
import UserInfo from './UserInfo';
import Nav from './Nav';
import Thread from './Thread';

class App extends Component {
    render() {
        return (
            <div className="app">
                <main className="page-content">
                    <HeaderBar />
                    <div className="thread">
                        <UserInfo />
                        <Thread />
                    </div>
                    <BottomBar />
                </main>
                <aside className="sidebar">
                    <HeaderNav />
                    <Nav />
                    <BottomNav />
                </aside>
            </div>
        );
    }
}

export default App;
