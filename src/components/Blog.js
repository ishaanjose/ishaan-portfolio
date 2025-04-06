import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaImage, FaVideo, FaHeadphones, FaCode, FaFileAlt, FaCalendarAlt } from 'react-icons/fa';

// Add a date utility function at the top of your file
const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return dateString; // Return original string if invalid
    }
    
    // Format options for a cleaner presentation
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    };
    
    return date.toLocaleDateString('en-US', options);
  } catch (e) {
    console.error("Error formatting date:", e);
    return dateString; // Return original string if error
  }
};

// Keep all your existing styled components

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
  height: 100%;

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
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const PostTitle = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 12px;
  color: #333;
`;

// Update the PostDate styled component
const PostDate = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  
  svg {
    color: #888;
    font-size: 14px;
  }
`;

const PostExcerpt = styled.p`
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 16px;
  line-height: 1.5;
  flex-grow: 1;
`;

const PostIcon = styled.div`
  font-size: 1.2rem;
  color: #3498db;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
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


// Simple function to parse frontmatter without using gray-matter
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

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const blogIds = ['1', '2']; // Add more IDs as you create more blog posts
        
        const postsData = await Promise.all(
          blogIds.map(async (id, index) => {
            try {
              // Add some logging to debug issues
              console.log(`Attempting to fetch blog post: ${window.location.origin}/blog/${id}.md`);
              const response = await fetch(`/blog/${id}.md`);
              
              if (!response.ok) {
                console.error(`Failed to load blog post ${id}: ${response.status}`);
                return null;
              }
              
              const content = await response.text();
              console.log(`Successfully loaded blog post ${id}`);
              
              // Use our custom parser instead of gray-matter
              const { data, content: markdownContent } = parseFrontMatter(content);
              
              return {
                id: index + 1,
                slug: id,
                title: data.title || `Blog Post ${id}`,
                date: data.date || 'No date',
                image: data.image || 'https://picsum.photos/seed/default/800/600',
                excerpt: data.excerpt || '',
                type: data.type || 'Text',
                content: markdownContent
              };
            } catch (err) {
              console.error(`Error processing blog post ${id}:`, err);
              return null;
            }
          })
        );
        
        const validPosts = postsData.filter(post => post !== null);
        
        if (validPosts.length === 0) {
          setError("No blog posts could be loaded. Please check that your Markdown files exist in the correct location (public/blog/*.md).");
        } else {
          validPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
          setPosts(validPosts);
        }
      } catch (error) {
        console.error("Error loading blog posts:", error);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <LoadingMessage>Loading blog posts...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (posts.length === 0) {
    return <ErrorMessage>No blog posts found.</ErrorMessage>;
  }

  return (
    <BlogWrapper>
      <BlogGrid>
        {posts.map(post => (
          <BlogPost key={post.id} to={`/blog/${post.slug}`}>
            <PostImage src={post.image} alt={post.title} />
            <PostContent>
              <PostTitle>{post.title}</PostTitle>
              <PostDate>
                <FaCalendarAlt />
                {formatDate(post.date)}
              </PostDate>
              <PostExcerpt>{post.excerpt}</PostExcerpt>

            </PostContent>
          </BlogPost>
        ))}
      </BlogGrid>
    </BlogWrapper>
  );
}

export default Blog;