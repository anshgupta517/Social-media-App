import { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://localhost:5000/api/posts', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPosts(res.data);
      } catch (error) {
        console.error(error);
        if (error.response.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map(post => (
        <div key={post._id}>
          <p>{post.content}</p>
          <small>Posted by: {post.author.username}</small>
        </div>
      ))}
    </div>
  );
};

export default HomePage;