import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { FaArrowLeft, FaCalendarAlt } from 'react-icons/fa';

// Add the same parseFrontMatter function from Blog.js
const parseFrontMatter = (content) => {
  const frontMatterRegex = /^---\r?\n([\s\S]*?)\r?\n---/;
  const match = frontMatterRegex.exec(content);
  
  if (!match) {
    return { 
      data: {}, 
      content: content 
    };
  }
  
  const frontMatter = match[1];
  const restContent = content.replace(match[0], '');
  
  // Parse the frontmatter into an object
  const data = {};
  frontMatter.split('\n').forEach(item => {
    const [key, ...valueParts] = item.split(':');
    if (key && valueParts.length) {
      data[key.trim()] = valueParts.join(':').trim();
    }
  });
  
  return { 
    data, 
    content: restContent 
  };
};

const BlogPostWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #555;
  margin-bottom: 30px;
  text-decoration: none;
  
  &:hover {
    color: #3498db;
  }
`;

const PostHeader = styled.div`
  margin-bottom: 40px;
`;

const PostTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 15px;
`;

const PostDate = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  margin-bottom: 20px;
`;

const PostImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 30px;
`;

const PostContent = styled.div`
  line-height: 1.8;
  
  h1, h2, h3, h4, h5, h6 {
    margin-top: 1.5em;
    margin-bottom: 0.8em;
  }
  
  p {
    margin-bottom: 1.2em;
  }
  
  ul, ol {
    margin-bottom: 1.2em;
    padding-left: 1.5em;
  }
  
  a {
    color: #3498db;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  blockquote {
    border-left: 4px solid #ddd;
    padding-left: 1rem;
    margin-left: 0;
    font-style: italic;
  }
  
  code {
    background: #f5f5f5;
    padding: 0.2em 0.4em;
    border-radius: 3px;
  }
  
  pre {
    background: #f5f5f5;
    padding: 1em;
    border-radius: 5px;
    overflow-x: auto;
    
    code {
      background: none;
      padding: 0;
    }
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
  color: #555;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
  color: #e74c3c;
`;

function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/blog/${id}.md`);
        
        if (!response.ok) {
          throw new Error(`Failed to load blog post: ${response.status}`);
        }
        
        const content = await response.text();
        const { data, content: markdownContent } = parseFrontMatter(content);
        
        setPost({
          title: data.title,
          date: data.date,
          image: data.image,
          content: markdownContent
        });
      } catch (error) {
        console.error('Error loading blog post:', error);
        setError('Failed to load blog post. It might not exist or there was an error processing it.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [id]);
  
  if (loading) {
    return <LoadingMessage>Loading blog post...</LoadingMessage>;
  }
  
  if (error) {
    return (
      <BlogPostWrapper>
        <BackButton to="/blog">
          <FaArrowLeft /> Back to blog
        </BackButton>
        <ErrorMessage>{error}</ErrorMessage>
      </BlogPostWrapper>
    );
  }
  
  return (
    <BlogPostWrapper>
      <BackButton to="/blog">
        <FaArrowLeft /> Back to blog
      </BackButton>
      
      <PostHeader>
        <PostTitle>{post.title}</PostTitle>
        <PostDate>
          <FaCalendarAlt /> {post.date}
        </PostDate>
        <PostImage src={post.image} alt={post.title} />
      </PostHeader>
      
      <PostContent>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </PostContent>
    </BlogPostWrapper>
  );
}

export default BlogPost;