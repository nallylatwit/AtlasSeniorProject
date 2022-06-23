import React from 'react';
import "./topbar.css";
import { Search, Person, Chat, Notifications } from '@material-ui/icons';

export default function Topbar() {
    return (
        <div className='topbarContainer'>
            <div className="topbarLeft">
                <span className='logo'>Atlas</span>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className='searchIcon'/>
                    <input placeholder='search for a post' className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLinks">Homepage</span>
                    <span className="topbarLinks">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <img src="/assets/person/default.jpeg" alt="1" className="topbarImg" />
            </div>
        </div>
    )
}