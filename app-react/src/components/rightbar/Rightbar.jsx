import React from 'react'
import './rightbar.css'

export default function Rightbar() {
  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        <div className="birthdayContainer">
          <img src="/assets/person/default.jpeg" alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b>You</b> and <b>2 other people</b> have a birthday today.
          </span>
        </div>
        <h4 className="rightbarFriendList">Online friends</h4>
        <ul className="rightbarFriendList">
          <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
              <img src="/assets/person/default.jpeg" alt="" className="rightbarProfileImg" />
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">Friend Username</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
