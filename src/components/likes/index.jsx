import { useState } from "react";

const Likes = ({ BlogID }) => {
    const [liked, setLiked] = useState(false);

    const toggleLiked = () => {
        setLiked(prevState => !prevState);
    };

/*     useEffect(() => {
        const fetchLikes = async () => {
            try {
                await fetch()
            }
        }
        const updateLikes = async () => {}
    }, [liked]); */
    return (
        <div>
            <button onClick={toggleLiked}>
                {liked ? "Liked" : "Like"}
            </button>
            1
        </div>
    );
}

export default Likes;