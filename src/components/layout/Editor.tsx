"use client";

import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { Box, Spinner } from "@chakra-ui/react";
import axios from "axios";

// Dynamically import ReactQuill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Editor = () => {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ header: [1, 2, 3, false] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["image", "link"],
    ],
  };

  const savePost = async () => {
    try {
      setLoading(true);
      await axios.post("/api/save-post", { content });
      alert("Post saved!");
    } catch (err) {
      console.error(err);
      alert("Error saving post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box w="100%" h="100%">
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <ReactQuill value={content} onChange={setContent} modules={modules} theme="snow" />
      )}
      <button
        onClick={savePost}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Save Post
      </button>
    </Box>
  );
};

export default Editor;
