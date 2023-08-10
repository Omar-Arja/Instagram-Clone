import React from 'react';
import Search from './search';
import CreatePost from './create-post';

const Sidebar = () => {
  return (
    <div className="sidebar">
        <div className='sidebar-header'><h2>Instagram</h2></div>
        <CreatePost />
        <Search />
    </div>
  );
};

export default Sidebar;