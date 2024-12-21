"use client";

import { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import PostDetail from "@/components/layout/PostDetail"; // Assuming PostDetail component is defined

const PostPage = () => {
  const [postId, setPostId] = useState<string | null>(null);

  const handleButtonClick = (id: string) => {
    setPostId(id); // Set the post ID to display the post
  };

  return (
    <Box>
      {/* Buttons to display posts with specific postId */}
      <Button onClick={() => handleButtonClick("67662b51e8be0a3f11a40476")}>Post 1</Button>

      {/* Conditionally render the PostDetail component when postId is set */}
      {postId && <PostDetail postId={postId} />}
    </Box>
  );
};

export default PostPage;
