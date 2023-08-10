import React, { useState } from 'react';
import axios from 'axios';


const CreatePost = () => {
    const [textInput, setTextInput] = useState("");
    const [fileInput, setFileInput] = useState(null);
    const [showDiv, setShowDiv] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const handleTextChange = (event) => {
        setTextInput(event.target.value);
    };

    const handleFileChange = (event) => {
        setFileInput(event.target.files[0]);
    };

    const toggleCreatePostForm = () => {
        if (showDiv) {
            hideCreatePostForm();
        } else {
            showCreatePostForm();
        }
    };

    const showCreatePostForm = () => {
        setShowDiv(true);
        setIsMounted(true);
    };

    const hideCreatePostForm = () => {
        setIsMounted(false);
    };

    const handlePostSubmit = async () => {
        const formData = new FormData();
        formData.append("caption", textInput);
        formData.append("image", fileInput);

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/posts/create",
                formData,{headers: {Authorization: localStorage.getItem('headers')}});

            console.log(response.data);
        } catch (error) {
            console.error("Error sending data:", error);
        }

        setTextInput("");
        setFileInput(null);
        hideCreatePostForm();
    };

    const mountedStyle = { animation: "inAnimation 250ms ease-in" };
    const unmountedStyle = {animation: "outAnimation 500ms ease-out", animationFillMode: "forwards",
    };

    return (
        <div className="create-post">
            <button className="toggle-form-btn" onClick={toggleCreatePostForm}>
                Create Post
            </button>
            {showDiv && (
                <div className="transitionDiv" style={isMounted ? mountedStyle : unmountedStyle} onAnimationEnd={() => {
                        if (!isMounted) setShowDiv(false);
                    }}>
                    <textarea className="caption-input" placeholder="Write a caption" value={textInput}
                        onChange={handleTextChange}
                    />
                    <input className="image-input" type="file" accept="image/*" onChange={handleFileChange} />
                    <button className="post-btn" onClick={handlePostSubmit}> Post </button>
                </div>
            )}
        </div>
    );
};

export default CreatePost;
