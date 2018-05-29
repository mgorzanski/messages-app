import React, { Component } from 'react';
import './index.css';
import HeaderNav from './HeaderNav';
import BottomNav from './BottomNav';
import Nav from './Nav';

class Sidebar extends Component {
    render() {
        return (
            <aside className="sidebar">
                <HeaderNav />
                <Nav />
                <BottomNav />
            </aside>
        );
    }
}

export default Sidebar;
