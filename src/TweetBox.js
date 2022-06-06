import React from "react";
import "./TweetBox.css";
import { Button, Avatar } from "@mui/material";
import { useState } from "react";
import db from './firebase';
import { collection, addDoc } from "firebase/firestore";



function TweetBox() {
    const [tweetMessage, setTweetMessage] = useState("");
    const [tweetImage, setTweetImage] = useState("");
    const sendTweet = async msg => {
        msg.preventDefault();

        const newTweet = await addDoc(collection(db, 'posts'), {
            displayName: 'James2',
            userName: 'bambam2',
            verified: true,
            text: tweetMessage,
            avatar: "",
        })
        setTweetImage("");
        setTweetMessage("");
        return newTweet;
    }


    return (
        <div className="tweetBox">
            <form>
                <div className="tweetBox__input">
                    {/* <Avatar /> */}
                    <input 
                    onChange={msg => setTweetMessage(msg.target.value)}
                    value={tweetMessage}
                    placeholder="what's happening? Type here" 
                    type="text">
                    {/* <input placeholder="Enter image URL" type="text"></input> */}
                    </input>
                </div>
                <input
                    onChange={image => setTweetImage(image.target.value)}
                    value={tweetImage}
                    className="tweetBox__imageInput"
                    placeholder="Optional: Enter image URL"
                    type="text"
                ></input> 
                <Button onClick={sendTweet} class="tweetBox__tweetButton">Tweet</Button>
            </form>
        </div>
    )
}

export default TweetBox