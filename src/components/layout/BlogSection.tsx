"use client";

import { useState, useEffect } from "react";
import { Box, Flex, HStack, VStack, Spinner, Text } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import PostDetail from "@/components/layout/PostDetail";
import { getAllPosts } from "@/utils/backend";
import { FaCloudShowersHeavy } from "react-icons/fa";

interface Post {
  _id: string;
  title: string;
}

export default function BlogSection() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [postId, setPostId] = useState<string | null>(null);

  // Fetch posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPosts();
        setPosts(response);
        if (response.length > 0) {
          setPostId(response[0]._id); // Set the first post ID by default
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Update page and selected post when user navigates
  const handlePageChange = (page: number) => {
    setPage(page);
    const post = posts[page - 1];
    setPostId(post?._id || null);
  };

  return (
    <Box
      width="960px"
      height="640px"
      bg="white"
      borderRadius={8}
      borderWidth={1}
    >
      {loading ? (
        <Flex paddingTop={12} align="center" direction="column">
          <VStack marginTop={12}>
            <Spinner borderWidth={3} size="lg" color="blue.700" />
            <Text
              marginTop={4}
              fontSize="xl"
              fontWeight="medium"
              color="gray.600"
            >
              Loading...
            </Text>
          </VStack>
        </Flex>
      ) : (
        <Flex height="100%" padding={4} direction="column">
          {posts.length === 0 ? (
            <EmptyState
              height="100%"
              icon={<FaCloudShowersHeavy />}
              color="blue.700"
              size="lg"
              title="Wow! Such empty"
              description="There are currently no posts"
            />
          ) : (
            <>
              <Box height="100%">
                {postId && <PostDetail postId={postId} />}
              </Box>

              <PaginationRoot
                width="100%"
                justifyItems="center"
                marginTop={4}
                count={posts.length}
                pageSize={1}
                page={page}
                onPageChange={(e) => handlePageChange(e.page)}
              >
                <HStack>
                  <PaginationPrevTrigger />
                  <PaginationItems />
                  <PaginationNextTrigger />
                </HStack>
              </PaginationRoot>
            </>
          )}
        </Flex>
      )}
    </Box>
  );
}
