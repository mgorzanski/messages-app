import React, { Component } from 'react';
import './index.css';
import HeaderBar from './HeaderBar';
import HeaderNav from './HeaderNav';
import BottomBar from './BottomBar';
import BottomNav from './BottomNav';
import UserInfo from './UserInfo';
import Nav from './Nav';
import Thread from './Thread';

class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <main className="main">
                    <HeaderBar />
                    <section className="content">
                        <UserInfo />
                        <Thread />
                    </section>
                    <BottomBar />
                </main>
                <aside className="sidebar">
                    <HeaderNav />
                    <Nav />
                    <BottomNav />
                </aside>
            </React.Fragment>
        );
    }
}

export default Home;
