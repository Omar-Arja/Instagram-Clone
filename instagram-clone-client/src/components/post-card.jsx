import axios from "axios"
import React, { useState } from "react"

const PostCard = ({ id, user_id, username, image_url, is_liked, total_likes, caption }) => {

    const [is_Liked, setIs_liked] = useState(is_liked);
    const handleLikeChange = () => {
        axios.post('http://127.0.0.1:8000/api/posts/like/' + id, {},
        { headers: {Authorization: localStorage.getItem('headers')} })
        
        .then((res) => {
            setIs_liked(!is_Liked);
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        });
    };


    return (
       <div className="posts-container">
        <div className="post-card">
            <div className="post-card-header"> {username} </div>
            <div className="post-card-pic"> <img src={image_url} alt="post image" /> </div>
            <div className="post-card-likes">
                <svg onClick={handleLikeChange} xmlns="http://www.w3.org/2000/svg" width="20" height="20" cursor={'pointer'} viewBox="0 0 25 25" fill="none">
                    <mask id="mask0_554_16" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25">
                        <rect width="25" height="25" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_554_16)">
                        <path d="M12.4999 21.7105L10.9736 20.3589C9.2017 18.782 7.73679 17.4217 6.5789 16.278C5.421 15.1343 4.49995 14.1076 3.81574 13.1978C3.13153 12.288 2.65346 11.4519 2.38153 10.6895C2.1096 9.92699 1.97363 9.1472 1.97363 8.35008C1.97363 6.72118 2.52626 5.36087 3.63153 4.26916C4.73679 3.17745 6.11398 2.63159 7.76311 2.63159C8.67539 2.63159 9.54381 2.82221 10.3684 3.20344C11.1929 3.58467 11.9035 4.12186 12.4999 4.81501C13.0964 4.12186 13.807 3.58467 14.6315 3.20344C15.4561 2.82221 16.3245 2.63159 17.2368 2.63159C18.8859 2.63159 20.2631 3.17745 21.3684 4.26916C22.4736 5.36087 23.0263 6.72118 23.0263 8.35008C23.0263 9.1472 22.8903 9.92699 22.6184 10.6895C22.3464 11.4519 21.8684 12.288 21.1842 13.1978C20.4999 14.1076 19.5789 15.1343 18.421 16.278C17.2631 17.4217 15.7982 18.782 14.0263 20.3589L12.4999 21.7105ZM12.4999 18.9033C14.1842 17.413 15.5701 16.135 16.6578 15.0693C17.7456 14.0036 18.6052 13.0765 19.2368 12.288C19.8684 11.4996 20.307 10.7978 20.5526 10.1826C20.7982 9.56742 20.921 8.95658 20.921 8.35008C20.921 7.31035 20.5701 6.44392 19.8684 5.75077C19.1666 5.05762 18.2894 4.71104 17.2368 4.71104C16.4122 4.71104 15.6491 4.94065 14.9473 5.39986C14.2456 5.85907 13.7631 6.44392 13.4999 7.15439H11.4999C11.2368 6.44392 10.7543 5.85907 10.0526 5.39986C9.35083 4.94065 8.58767 4.71104 7.76311 4.71104C6.71047 4.71104 5.83328 5.05762 5.13153 5.75077C4.42977 6.44392 4.0789 7.31035 4.0789 8.35008C4.0789 8.95658 4.2017 9.56742 4.44732 10.1826C4.69293 10.7978 5.13153 11.4996 5.76311 12.288C6.39469 13.0765 7.25433 14.0036 8.34205 15.0693C9.42977 16.135 10.8157 17.413 12.4999 18.9033Z" fill={is_Liked?'#c52323':'#1C1B1F'}/>
                    </g>
                </svg>
                <div className="number-of-likes">
                    {total_likes} Likes
                </div>
            </div>
            <div className="post-card-caption">{caption}</div>
        </div>
       </div>
    )
}

export default PostCard