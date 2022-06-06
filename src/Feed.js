import React, { useEffect, useInsertionEffect, useState } from "react";
import './Feed.css';
import TweetBox from "./TweetBox";
import Post from "./Post";
import db from './firebase';
import { getFirestore, collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import FlipMove from "react-flip-move";

function Feed() {
    const [posts, setPosts] = useState([])


    useEffect(() => {
        const dbRef = collection(db, 'posts')
        const newPost = onSnapshot(dbRef, {
            next: (snapshot) => {
                setPosts(snapshot.docs.map(doc => (
                    doc.data()
                )));
            },
            error: (err) => {
                console.log("Nothing in the db or something is broken")
            }
        });
        console.log(posts);
        return newPost;
    }, []);

    return (
        <div className="feed">
            <div className="feed__header">
                <h2>James's Tweetfolio</h2>

                <TweetBox />

                <FlipMove>
                {posts.map(post => (
                    <Post
                    key={post.text}
                    displayName={post.displayName}
                    userName={post.userName}
                    verified= {post.verified}
                    text={post.text}
                    avatar={post.avatar}
                    image={post.image}
                    timestamp={post.timestamp}
                    />
                ))}
                </FlipMove>


            </div>
        </div>
    )
}


export default Feed