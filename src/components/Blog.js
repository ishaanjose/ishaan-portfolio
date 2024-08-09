import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BlogWrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
`;

const BlogPostItem = styled.div`
  margin-bottom: 25px;
  padding: 25px;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border-left: 5px solid transparent;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    border-left-color: #3498db;
    background-color: #f8f9fa;
  }
`;

const PostLink = styled(Link)`
  text-decoration: none;
  color: #333;
  transition: color 0.2s ease;

  &:hover {
    color: #3498db;
  }
`;

const PostTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 8px;
  color: #2c3e50;
  font-weight: 600;
  transition: color 0.2s ease;

  ${BlogPostItem}:hover & {
    color: #3498db;
  }
`;

const PostDate = styled.p`
  color: #7f8c8d;
  font-size: 14px;
  font-weight: 400;
  transition: color 0.2s ease;

  ${BlogPostItem}:hover & {
    color: #34495e;
  }
`;

function Blog() {
  const posts = [
    { id: 1, title: 'Post with Photo', date: 'Wednesday June 1, 2022' },
    { id: 2, title: 'Post with Video', date: 'Monday May 23, 2022' },
    { id: 3, title: 'Post with Audio', date: 'Wednesday May 18, 2022' },
    { id: 4, title: 'Post with Code', date: 'Tuesday May 17, 2022' },
    { id: 5, title: 'Post with Text', date: 'Friday April 8, 2022' },
  ];

  return (
    <BlogWrapper>
      {posts.map(post => (
        <BlogPostItem key={post.id}>
          <PostLink to={`/blog/${post.id}`}>
            <PostTitle>{post.title}</PostTitle>
          </PostLink>
          <PostDate>{post.date}</PostDate>
        </BlogPostItem>
      ))}
    </BlogWrapper>
  );
}

export default Blog;