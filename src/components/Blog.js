import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaImage, FaVideo, FaHeadphones, FaCode, FaFileAlt } from 'react-icons/fa';

const BlogWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
`;

const BlogPost = styled(Link)`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }
`;

const PostImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const PostContent = styled.div`
  padding: 20px;
`;

const PostTitle = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 12px;
  color: #333;
`;

const PostDate = styled.p`
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 16px;
`;

const PostIcon = styled.div`
  font-size: 1.2rem;
  color: #3498db;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const getPostIcon = (title) => {
  if (title.includes('Photo')) return <FaImage />;
  if (title.includes('Video')) return <FaVideo />;
  if (title.includes('Audio')) return <FaHeadphones />;
  if (title.includes('Code')) return <FaCode />;
  return <FaFileAlt />;
};

function Blog() {
  const posts = [
    { 
      id: 1, 
      title: 'Post with Photo', 
      date: 'Wednesday June 1, 2022',
      image: 'https://picsum.photos/seed/photo1/800/600'
    },
    { 
      id: 2, 
      title: 'Post with Video', 
      date: 'Monday May 23, 2022',
      image: 'https://picsum.photos/seed/video2/800/600'
    },
    { 
      id: 3, 
      title: 'Post with Audio', 
      date: 'Wednesday May 18, 2022',
      image: 'https://picsum.photos/seed/audio3/800/600'
    },
    { 
      id: 4, 
      title: 'Post with Code', 
      date: 'Tuesday May 17, 2022',
      image: 'https://picsum.photos/seed/code4/800/600'
    },
    { 
      id: 5, 
      title: 'Post with Text', 
      date: 'Friday April 8, 2022',
      image: 'https://picsum.photos/seed/text5/800/600'
    },
  ];

  return (
    <BlogWrapper>
      <BlogGrid>
        {posts.map(post => (
          <BlogPost key={post.id} to={`/blog/${post.id}`}>
            <PostImage src={post.image} alt={post.title} />
            <PostContent>
              <PostTitle>{post.title}</PostTitle>
              <PostDate>{post.date}</PostDate>
              <PostIcon>
                {getPostIcon(post.title)}
                <span>{post.title.split(' ').pop()}</span>
              </PostIcon>
            </PostContent>
          </BlogPost>
        ))}
      </BlogGrid>
    </BlogWrapper>
  );
}

export default Blog;