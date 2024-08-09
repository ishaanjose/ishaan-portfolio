import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const BlogPostWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const PostTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 5px;
`;

const PostDate = styled.p`
  color: #888;
  font-size: 14px;
  margin-bottom: 20px;
`;

const PostImage = styled.img`
  width: 100%;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const PostContent = styled.div`
  line-height: 1.6;

  h2 {
    font-size: 20px;
    margin-top: 30px;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 18px;
    margin-top: 25px;
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 15px;
  }

  a {
    color: #0066cc;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated API call or data fetching
    const fetchPost = async () => {
      // In a real app, you'd fetch data based on the ID
      // For now, we'll use a timeout to simulate an API call
      setTimeout(() => {
        const dummyPost = {
          id: id,
          title: 'Post with Photo',
          date: 'Wednesday June 1, 2022',
          image: 'https://example.com/path-to-leaf-image.jpg',
          content: `
            <p>This is a blog post example showcasing an image. You can conditionally show layers within your blog posts using Toggles. Here, the "Has Banner" Toggle is hooked up to the "Visibility" property, allowing you to define whether or not you want any given article to include a banner or not.</p>
            <h2>H2 Heading</h2>
            <p>This is a paragraph. Thai basil curry lime almonds green bowl Thai dragon pepper crispy cherries lentils red grapes grapefruit banana four-layer kung pao pepper cremini mushrooms Chinese five-spice powder chickpea crust pizza cherry bomb pepper tasty chia seeds. <a href="#">This is an inline link</a>.</p>
            <h3>H3 Heading</h3>
            <p>This is another paragraph. Thai basil curry lime almonds green bowl Thai dragon pepper...</p>
          `
        };
        setPost(dummyPost);
        setLoading(false);
      }, 500); // Simulate a 500ms delay
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <BlogPostWrapper>
      <PostTitle>{post.title}</PostTitle>
      <PostDate>{post.date}</PostDate>
      {post.image && <PostImage src={post.image} alt={post.title} />}
      <PostContent dangerouslySetInnerHTML={{ __html: post.content }} />
    </BlogPostWrapper>
  );
}

export default BlogPost;