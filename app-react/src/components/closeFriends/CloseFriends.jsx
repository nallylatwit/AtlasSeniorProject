import React from 'react'
import './closeFriends.css'

export default function CloseFriends({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
  <li className="sidebarFriend">
    <img 
        src={PF+user.profilePicture}
        alt="1" 
        className="sidebarFriendImg" 
    />
    <span className="sidebarFriendName">{user.username}</span>
  </li>
  )
}
