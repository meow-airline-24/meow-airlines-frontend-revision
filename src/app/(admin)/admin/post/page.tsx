"use client";

import { Box, AbsoluteCenter } from "@chakra-ui/react";
import Editor from "@/components/layout/Editor";

export default function Post() {
  return (
    <Box bg="gray.100" w="100vw" h="100vh">
      <AbsoluteCenter axis="both">
        <Box bg="white" p={6} borderRadius="md" shadow="md">
          <Editor />
        </Box>
      </AbsoluteCenter>
    </Box>
  );
}
