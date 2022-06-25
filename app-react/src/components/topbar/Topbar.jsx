import React from 'react';
import "./topbar.css";
import { Search, Person, Chat, Notifications } from '@material-ui/icons';
import {Link} from "react-router-dom";
import {AuthContext} from '../../context/AuthContext'
import {logoutCall} from '../../apiCalls'
import {useContext} from 'react';

export default function Topbar() {


    const {user,dispatch} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const handleClick = () => {
        logoutCall(
            dispatch
        );
    }

    return (
        <div className='topbarContainer'>
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration:"none"}}>
                    <span className='logo'>Atlas</span>
                </Link>

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
                <Link to={`/profile/${user.username}`}>
                    <img
                        src={user.profilePicture ? PF+user.profilePicture : PF+"person/default.jpeg"} 
                        alt="1" 
                        className="topbarImg" 
                    />
                </Link>

                <span className='topbarLink' onClick={handleClick}>Sign Out</span>

            </div>
        </div>
    )
}