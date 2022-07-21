import React from 'react'
import Online from '../online/Online'
import './rightbar.css'
import { Users } from '../dummyData.js'
import { useEffect, useContext } from 'react';
import { useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
// import {Add} from '@material-ui/icons'

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  var currentFollowingList = localStorage.getItem('currentFollowing');
  const [followed, setFollowed] = useState(currentFollowingList.includes(user?._id));
  var followTxt = "";
  const [buttonText, setButtonText] = useState(followTxt);

// TODO: fix this
  useEffect(() => {
    const getMyFriends = async () => {
      try {
        const myFriendList = await axios.get("/users/friends/" + currentUser._id);
        var friendArray = [];
        console.log(myFriendList);
        for (var friend of Object.keys(myFriendList)) {
          if (friend == "data") {
            console.log(myFriendList[friend])
            for (var i = 0; i < myFriendList[friend].length; i++) {
              console.log(myFriendList[friend][i]._id)
              friendArray.push(myFriendList[friend][i]._id)
            }
          }
        }
        //console.log(myFriendList)
        console.log(friendArray)
      } catch (err) {
        console.log(err);
      }
    }
    getMyFriends();
    setFollowed(currentFollowingList.includes(user?.id));
  }, [currentUser, user])

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    }
    getFriends();
  }, [user]);

  useEffect(() => {

  }, [currentUser]);

  const onLoad = async () => {
    // console.log(currentUser.following);
    // console.log("LOOKING AT USER: " + user?._id);
    // console.log("LOGGED IN AS USER:" + currentUser._id);
    // console.log("LOOKING AT FOLLOWING: "+user?.following);
    // console.log("LOGGED IN FOLLOWING:" + currentFollowingList);
    // console.log(currentUser.following.includes(user?.id));
    // setButtonText(currentFollowingList.includes(user?._id) ? "Unfollow" : "Follow");
  }

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put("/users/" + user._id + "/follow", { userId: currentUser._id });
        dispatch({ type: "UNFOLLOW", payload: user._id });
        console.log("USER FOLLOWED SUCCESSFULLY");
        //setButtonText("Unfollow");
      } else if (!followed) {
        try {
          await axios.put("/users/" + user._id + "/unfollow", { userId: currentUser._id });
          console.log("USER UNFOLLOWED SUCCESSFULLY");
          //setButtonText("Follow");
        } catch (err) {
          await axios.put("/users/" + user._id + "/follow", { userId: currentUser._id });
          console.log("USER FOLLOWED SUCCESSFULLY");
          //setButtonText("Unfollow");
        }
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (err) {
      //etFollowed(!followed);
    }
  }
  // const handleClick = async () => {
  //   try{
  //     if(followed){
  //       await axios.put("/users/"+user._id+"/follow", {userId: currentUser._id});
  //       dispatch({ type:"UNFOLLOW", payload: user._id});
  //     } else if(!followed){
  //       await axios.put("/users/"+user._id+"/unfollow", {userId: currentUser._id})
  //       dispatch({ type:"FOLLOW", payload: user._id});
  //     }
  //   } catch (err) {
  //     setFollowed(!followed);
  //   }
  // }
  // const handleClick = async () => {
  //   try{
  //     if(followed){
  //       await axios.put("/users/"+user._id+"/unfollow", {userId: currentUser._id});
  //       dispatch({ type:"UNFOLLOW", payload: user._id});
  //     } else {
  //       await axios.put("/users/"+user._id+"/follow", {userId: currentUser._id});
  //       dispatch({ type:"FOLLOW", payload: user._id});
  //     }
  //   } catch (err) {
  //     setFollowed(!followed);
  //   }
  // }

  const HomeRightBar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img
            src={`${PF}person/default.jpeg`}
            alt=""
            className="birthdayImg"
          />
          <span className="birthdayText">
            <b>You</b> and <b>2 other people</b> have a birthday today.
          </span>
        </div>
        <h4 className="rightbarFriendList">Online friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    )
  };

  const ProfileRightBar = () => {
    onLoad();
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {buttonText}{/*<Add/>*/}
          </button>
        )}
        <h4 className="rightbarTitle">User infor</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          {/* <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">School:</span>
          <span className="rightbarInfoValue">Wentworth</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Major:</span>
          <span className="rightbarInfoValue">CompSci</span>
        </div> */}
        </div>
        <h4 className="rightbarTitle">Following</h4>
        <div className="rightbarFollowings">
          {friends.map(friend => (
            <Link to={"/profile/" + friend.username} style={{ textDecoration: "none" }} key={friend.username}>
              <div className="rightbarFollowing">
                <img
                  src={friend.profilePicture ? PF + friend.profilePicture : PF + "person/default.jpeg"}
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>

          ))}

        </div>
      </>
    )

  }
  // var followBtn = document.getElementById("rightBarFollowButton");
  // followed ? followBtn.innerText = "Unfollow" : followBtn.innerText = "Follow";
  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  )
}
