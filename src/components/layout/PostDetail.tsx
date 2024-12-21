import { useEffect, useState } from "react";
import { Box, Heading, Text, Spinner } from "@chakra-ui/react";
import { Post } from "@/interfaces/Post";
import { getPostById } from "@/utils/backend";

interface PostDetailProps {
  postId: string;
}

const PostDetail: React.FC<PostDetailProps> = ({ postId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post : Post = await getPostById(postId);
        setPost(post);
      } catch (error) {
        setError("Failed to fetch post");
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return <Spinner size="lg" />;
  }

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  if (!post) {
    return <Text>No post found</Text>;
  }

  return (
    <Box maxW="800px" mx="auto" p={4}>
      <Heading mb={4}>{post.title}</Heading>
      <Text mb={4} fontSize="sm" color="gray.500">
        Published: {new Date(post.createdAt).toLocaleDateString()}
      </Text>
      {/* Render the Quill editor's HTML content */}
      <Box
        dangerouslySetInnerHTML={{ __html: post.content }} // Safely render the HTML content from Quill
        style={{ padding: "1rem", borderRadius: "8px", border: "1px solid #ddd" }}
      />
      <Text fontSize="sm" color="gray.500">
        Views: {post.views} | Status: {post.isPublished ? "Published" : "Draft"}
      </Text>
    </Box>
  );
};

export default PostDetail;
