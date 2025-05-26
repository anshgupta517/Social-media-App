import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Global Feed</h1>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map(post => (
          <div key={post._id} className="border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
            <p className="text-gray-800">{post.content}</p>
            <p className="text-sm text-gray-500 mt-2">By: {post.author?.username || 'Unknown'}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default GlobalFeedPage; 