"use client"

import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./comments.module.css";

const Comments = ({ BlogID }) => {
    const [writtenComment, setWrittenComment] = useState('');
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newCommentPosted, setNewCommentPosted] = useState(false);
    const { authenticated } = useAuth();

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`/api/comment/read?BlogID=${BlogID}`);
                if (!response.ok) {
                    throw error;
                }
                const data = await response.json();
                setComments(data);
            } catch (error) {
                alert(`Error in fetching comments: ${error}`);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [newCommentPosted]);
    
    const toggleNewCommentPosted = () => {
        setNewCommentPosted(prevState => !prevState);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (authenticated) {
            try {
                const token = localStorage.getItem('token');
                const formData = {
                    username: token,
                    BlogID: BlogID,
                    content: writtenComment
                };
                const res = await axios.post("/api/comment/create", formData);
                alert(`Comment posted successfully, ${res.data.message}`);
                toggleNewCommentPosted();
            } catch (error) {
                alert(`Error in posting comment: ${error}`);
            }
        } else {
            alert('Not logged in');
        }
    };

    if (loading) {
        return <div>Loading comments...</div>;
    }
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Comments</h1>
            {authenticated ? (
                <div className={styles.write}>
                    <textarea
                        placeholder="write a comment..."
                        className={styles.input}
                        value={writtenComment}
                        onChange={(e) => setWrittenComment(e.target.value)}
                    />
                    <button
                        className={styles.button}
                        onClick={handleSubmit}
                    >Send</button>
                </div>
            ) : (
                <Link href="/login">Login to write a comment</Link>
            )}
            <div className={styles.comments}>
                {comments?.map((comment, index) => (
                    <div key={index} className={styles.comment}>
                        <div className={styles.userInfo}>
                            <span className={styles.username}>{comment?.username}</span>
                            <span className={styles.date}>{comment?.createdAt}</span>
                        </div>
                        <div className={styles.desc}>{comment?.content}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comments;