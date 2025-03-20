// src/components/listings.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Listings = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/posts');
        setPosts(response.data);
      } catch (error) {
        setError('Error fetching posts');
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="container">{error}</div>;
  }

  return (
    <div className="container">
      <h2>Available Listings</h2>
      {posts.length === 0 ? (
        <p>No listings available.</p>
      ) : (
        posts.map(post => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <p>Price: ${post.price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Listings;