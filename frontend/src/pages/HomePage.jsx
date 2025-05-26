import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Home.css';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/posts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(res.data);
      setError(null);
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        setError(error.response?.data?.message || error.message || 'Failed to fetch posts');
      }
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostContentChange = (e) => {
    setNewPostContent(e.target.value);
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) {
      setError('Post content cannot be empty.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/posts', 
        { content: newPostContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewPostContent(''); // Clear input after successful post
      setError(null);
      fetchPosts(); // Refresh the post list
    } catch (error) {
      console.error('Failed to create post:', error);
      setError(error.response?.data?.message || error.message || 'Failed to create post');
    }
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Welcome to the Social Media App</h1>
        <p>See what your friends are up to!</p>
      </div>

      <div className="create-post-section">
        <h2>Create New Post</h2>
        <form onSubmit={handleCreatePost}>
          <textarea
            value={newPostContent}
            onChange={handlePostContentChange}
            placeholder="What's on your mind?"
            rows="4"
            cols="50"
          />
          <button type="submit">Post</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>

      <div className="home-content">
        {posts.map(post => (
          <div key={post._id} className="home-card">
            <h2>Post by: {post.author.username}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;