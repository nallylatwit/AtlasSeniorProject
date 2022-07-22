import React from 'react'
//import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
//import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import { Search, Person, Chat, Notifications } from '@material-ui/icons';
import {Link} from "react-router-dom";
import {logoutCall} from '../../apiCalls'
import {useEffect, useState, useContext} from 'react';
import Share from '../../components/share/Share'
import Post from '../../components/post/Post'
import '../../components/feed/feed.css'
import axios from "axios"
import {AuthContext} from '../../context/AuthContext';
import './home.css'



export function Feed(props, {username}) {
    const [posts, setPosts] = useState([]);
    const {user} = useContext(AuthContext);
  //test

    useEffect(()=>{
      const fetchPosts = async () => {
        const res = username 
        ? await axios.get("/posts/profile/"+username)
        : await axios.get("/posts/timeline/"+user._id);
        setPosts(res.data.sort((p1,p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt)
        }))
      };
      
      const fetchUserPosts = async () => {
      }

      if (props.search === "following") {
        fetchPosts();
      } else {
        fetchUserPosts();
      }
      //console.log(props.search)
      //fetchPosts();
    }, [username,user._id,props])
    return (
      <div className='feed'>
        <div className="feedWrapper">
          {(!username || username === user.username) && <Share/>}
          {posts.map((p) => (
            <Post key={p._id} post={p}/>
          ))}
        </div>
      </div>
    )
}
  
export function Topbar(props) {

const {user,dispatch} = useContext(AuthContext);
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

const handleClick = () => {
    logoutCall(
        dispatch
    );
}

const handleSubmit = (e) => {
    e.preventDefault();
    props.onChangeSearch(document.getElementById('searchTxt').value)
    localStorage.setItem('searchTerm', document.getElementById('searchTxt').value);
    //console.log(localStorage.getItem('searchTerm'));
}
//console.log(props.search)
return (
    <div className='topbarContainer'>
        <div className="topbarLeft">
            <Link to="/" style={{textDecoration:"none"}}>
                <span className='logo'>Atlas</span>
            </Link>

        </div>
        <div className="topbarCenter">
            <div className="searchbar">
                <form className='searchBox' onSubmit={handleSubmit}>
                    <button className='searchButton' type='submit'>
                        <Search className='searchIcon'/>
                    </button>
                    <input className="searchInput" type='text' id='searchTxt'/>
                </form>
            </div>
        </div>
        <div className="topbarRight">
            <div className="topbarLinks">
                {/* <span className="topbarLinks">Homepage</span>
                <span className="topbarLinks">Timeline</span> */}
            </div>
            <div className="topbarIcons">
                {/* <div className="topbarIconItem">
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
                </div> */}
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

export default function Home() {
    const [search, setSearch] = useState("");

    return (
        <>
            <Topbar search={search} onChangeSearch={(newSearch)=>setSearch(newSearch)}/>
            <div className="homeContainer">
            {/* <Sidebar /> */}
            <Feed search={search}/>
            {/* <Rightbar /> */}
            </div>
            
        </>
    )
}