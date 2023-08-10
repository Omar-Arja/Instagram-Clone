import React, { useState } from "react";
import axios from "axios";

const SearchResults = ({ id, first_name, last_name, username, is_following }) => {
    const [is_Following, setIs_Following] = useState(is_following);

    const handleFollow = async () => {
        try {
            const res = await axios.post(`http://localhost:8000/api/user/follow/${username}`, {}, { headers: {Authorization: localStorage.getItem('headers')} });
            setIs_Following(true);
        } catch (err) {
            console.log('Error:', err);
        }
    };

    const handleUnfollow = async () => {
        try {
            const res = await axios.post(`http://localhost:8000/api/user/unfollow/${username}`, {}, { headers: {Authorization: localStorage.getItem('headers')} });
            setIs_Following(false);
        } catch (err) {
            console.log('Error:', err);
        }
    };

  return (
    <div className="user-profile">
        <div>{username} <br/><span className="user-profile-name">{first_name} {last_name}</span></div>
        <div className="follow/unfollow-btn">
            {is_Following ? <button className="unfollow-btn" onClick={handleUnfollow}>Unfollow</button> : <button className="follow-btn" onClick={handleFollow}>Follow</button>}
        </div>
    </div>
  );
};

export default SearchResults;
