import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";

const Likes = ({ BlogID }) => {
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const { authenticated } = useAuth();

    const fetchLikes = async () => {
        try {
            const response = await fetch(`/api/blogLikes/read?BlogID=${BlogID}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const { likes } = await response.json();
            setLikes(likes);
        } catch (error) {
            alert(`Error in fetching Likes, ${error.message}`);
        }
    };

    const checkUserLikeStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`/api/like/read?BlogID=${BlogID}&username=${token}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const { liked } = await response.json();
            setLiked(liked);
        } catch (error) {
            alert(`Error checking user like status: ${error.message}`);
        }
    };
    const toggleLiked = async () => {
        if (!authenticated) {
            alert('Like this blog? Sign in to make your opinion count.');
            return;
        }
        const token = localStorage.getItem('token');
        try {
            if (liked) {
                await axios.post('/api/like/delete', { username: token, BlogID });
            } else {
                await axios.post('/api/like/create', { username: token, BlogID });
            }
            setLiked(prevState => !prevState);
        } catch (err) {
            alert(`Error ${liked ? 'deleting' : 'creating'} Like: ${err.message}`);
        }
    };

    useEffect(() => {
        fetchLikes();
        if (authenticated) {
            checkUserLikeStatus();
        }
    }, [liked, authenticated, BlogID]);

    return (
        <div>
            <button onClick={toggleLiked}>
                {liked ? "Liked" : "Like"}
            </button>
            <span>{likes}</span>
        </div>
    );
};

export default Likes;