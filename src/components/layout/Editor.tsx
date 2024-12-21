"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Button, Input, VStack } from "@chakra-ui/react";
import "quill/dist/quill.snow.css";
import { createPost } from "@/utils/backend";


let Quill: any; // Declare Quill as a global variable

const Editor = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [quill, setQuill] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const initializeQuill = async () => {
      if (!editorRef.current || quill) return;

      try {
        // Dynamically import Quill when the component is rendered on the client
        const QuillModule = await import("quill");
        Quill = QuillModule.default || QuillModule;

        // Custom Image Handler
        const imageHandler = () => {
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          input.click();

          input.onchange = async () => {
            const file = input.files ? input.files[0] : null;
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                const range = quillInstance.getSelection();
                quillInstance.insertEmbed(range.index, "image", reader.result);
              };
              reader.readAsDataURL(file);
            }
          };
        };

        const quillInstance = new Quill(editorRef.current, {
          theme: "snow",
          modules: {
            toolbar: {
              container: [
                [{ font: [] }],
                [{ size: ["small", false, "large", "huge"] }],
                ["bold", "italic", "underline", "strike"],
                [{ color: [] }, { background: [] }],
                [{ script: "sub" }, { script: "super" }],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ indent: "-1" }, { indent: "+1" }],
                [{ direction: "rtl" }],
                ["blockquote", "code-block"],
                [{ align: [] }],
                ["link", "image", "video"],
                ["clean"],
              ],
              handlers: { image: imageHandler },
            },
          },
        });

        // Add CSS styles for resizable and centerable images
        quillInstance.root.addEventListener(
          "click",
          (event: { target: HTMLElement }) => {
            const target = event.target as HTMLElement;
            if (target.tagName === "IMG") {
              target.setAttribute("contenteditable", "false");
              target.style.border = "2px dashed #ccc";
              target.style.cursor = "move";
              target.style.resize = "both";
              target.style.maxWidth = "70%";
              target.style.height = "auto";
              target.style.display = "block";
              target.style.margin = "auto"; // Center the image
            }
          }
        );

        setQuill(quillInstance);
      } catch (error) {
        console.error("Failed to initialize Quill:", error);
      }
    };

    initializeQuill();
  }, [quill]);

  const savePost = async () => {
    if (!quill) return;

    try {
      setLoading(true);

      const content = quill.root.innerHTML;

      await createPost(title, content);

      alert("Post saved!");
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Failed to save post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack align="stretch" gap={4}>
      <Input
        placeholder="Enter post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Box
        ref={editorRef}
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          height: "300px",
          overflow: "hidden",
        }}
      />
      <Button mt={4} colorScheme="blue" onClick={savePost} >
        Save Post
      </Button>
    </VStack>
  );
};

export default Editor;
