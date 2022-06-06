import React, {forwardRef} from "react";
import "./Post.css";
import { Button, Avatar } from "@mui/material";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


const Post = React.forwardRef((props,ref) => {
    return (
        <div className="post" ref={ref}>
            <div className="post__avatar">
                <Avatar src={props.avatar}/>
            </div>
            <div className="post__body">
                <div className="post__header">
                    <div className="post__headerText">
                        <h3>
                            {props.displayName}
                            <span className="post__headerSpecial">
                                {props.verified &&<VerifiedUserIcon className="post__badge" />}@{props.userName}
                            </span>
                        </h3>
                    </div>
                    <div className="post__headerDescription">
                        <p>{props.text}</p>
                    </div>
                </div>
                <img
                    src={props.image}
                    alt=""
                ></img>
                <div className="post__footer">
                    {/* <ChatBubbleOutlineIcon fontSize="small" /> */}
                    {/* <FavoriteBorderIcon fontSize="small" /> */}
                </div>
            </div>
        </div>
    )
})

export default Post