import { MoreVert } from '@material-ui/icons'
import React from 'react'
import './post.css'

export default function Post() {
  return (
    <div className='post'>
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <img className='postProfileImg' src="/assets/person/default.jpeg" alt="" />
                    <span className="postUsername">Username</span>
                    <span className="postDate">1 min ago ...</span>
                </div>
                <div className="postTopRight">
                    <MoreVert />
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">First Post</span>
                <img src="/assets/person/default.jpeg" alt="" className="postImg" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img className='likeIcon' src="assets/like.jpeg" alt="" />
                    <img className='likeIcon' src="assets/heart.jpeg" alt="" />
                    <span className="postLikeCounter">100 people liked.</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">10 comments.</span>
                </div>
            </div>
        </div>
    </div>
  )
}
