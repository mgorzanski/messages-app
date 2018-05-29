import React, { Component } from 'react';
import './index.css';
import HeaderBar from './HeaderBar';
import BottomBar from './BottomBar';
import UserInfo from './UserInfo';
import Thread from './Thread';
import Sidebar from './../Sidebar';

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
                <Sidebar />
            </React.Fragment>
        );
    }
}

export default Home;
