import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        setError(err);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error loading posts: {error.message}</div>;

  return (
    <div>
      <h1>Global Feed</h1>
      {posts.map(post => (
        <div key={post._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <p>{post.content}</p>
          <p>By: {post.author.username}</p>
        </div>
      ))}
    </div>
  );
};

export default GlobalFeedPage; 