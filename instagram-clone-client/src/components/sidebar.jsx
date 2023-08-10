import React from 'react';
import Search from './search';

const Sidebar = () => {
  return (
    <div className="sidebar">
        <div className='sidebar-header'><h2>Instagram</h2></div>
      <Search />
    </div>
  );
};

export default Sidebar;