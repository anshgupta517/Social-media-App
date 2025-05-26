import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/GlobalFeed.css';

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

const GlobalFeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts/all');
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="p-4">Loading posts...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="feed-container">
      <div className="feed-header">
        <h1>Global Feed</h1>
      </div>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map(post => (
          <div key={post._id} className="feed-post">
            <div className="feed-post-header">
              <span className="feed-post-author">{post.author?.username || 'Unknown'}</span>
              {/* Add date here if available in post data */}
            </div>
            <div className="feed-post-content">
              <p>{post.content}</p>
            </div>
            {/* Add actions (like, comment, etc.) here */}
          </div>
        ))
      )}
    </div>
  );
};

export default GlobalFeedPage; 