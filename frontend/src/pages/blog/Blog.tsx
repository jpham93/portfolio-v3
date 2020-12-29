import React, { useEffect } from 'react';
import './Blog.scss';
import { useParams } from 'react-router-dom';

const Blog = () => {

  const { blog_id } : { blog_id: string }       = useParams();

  useEffect(() => {

  }, []);

  return(
    <>
      <h1>Blog Page</h1>
    </>
  );
}

export default Blog;
