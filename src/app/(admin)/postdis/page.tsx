"use client";

import { useEffect, useState } from "react";
import { getAllPosts } from "@/utils/backend";
import { Box, Button, Spinner } from "@chakra-ui/react";
import PostDetail from "@/components/layout/PostDetail";

interface Post {
  _id: string;
  title: string;
}

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postId, setPostId] = useState<string | null>(null);

  const handleButtonClick = (id: string) => {
    setPostId(id);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPosts();
        setPosts(response);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Box>
      {/* Buttons to display posts with specific postId */}
      <Box mb={4}>
        {posts.map((post) => (
          <Button
            key={post._id}
            onClick={() => handleButtonClick(post._id)}
            mr={2}
          >
            {post.title}
          </Button>
        ))}
      </Box>

      {/* Conditionally render the PostDetail component when postId is set */}
      {postId && <PostDetail postId={postId} />}
    </Box>
  );
};

export default PostList;
