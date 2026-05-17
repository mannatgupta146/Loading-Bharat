import React from 'react';
import NewsFeed from './NewsFeed.jsx';

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="w-full h-full">
        <NewsFeed />
      </div>
    </div>
  );
};

export default Dashboard;
