import { useState, useEffect } from "react"
import axios from "axios"
import PostCard from "./post-card"

const PostFeed = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
          try {
            const res = await axios.get('http://localhost:8000/api/posts/feed', { headers: {Authorization: localStorage.getItem('headers')} });
            setPosts(res.data.posts);
          } catch (err) {
            console.log('Error logging in:', err);
          }
        };
    
        getPosts();
      }, []);


    return (
        <div className="posts-container">
            {posts.map((post) => (<PostCard key={post.id} {...post} />
            ))}
        </div>
    )
}

export default PostFeed