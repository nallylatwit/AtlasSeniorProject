import React from 'react'
import './rightbar.css'

export default function Rightbar({profile}) {
  const HomeRightBar = () => {
    return (
      <>
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
      </>
    )
  };

  const ProfileRightBar = () => {
    return (
      <>
      <h4 className="rightbarTitle">User infor</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From:</span>
          <span className="rightbarInfoValue">Boston</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">School:</span>
          <span className="rightbarInfoValue">Wentworth</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Major:</span>
          <span className="rightbarInfoValue">CompSci</span>
        </div>
      </div>
      <h4 className="rightbarTitle">Friends</h4>
      <div className="rightbarFollowings">
        <div className="rightbarFollowing">
          <img src="/assets/person/default.jpeg" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">Following Name</span>
        </div>
      </div>
      </>
    )
  }

  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        <ProfileRightBar />
      </div>
    </div>
  )
}
