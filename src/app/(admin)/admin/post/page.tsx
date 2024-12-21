"use client";

import { Box, AbsoluteCenter } from "@chakra-ui/react";
import Editor from "@/components/layout/Editor";
import Sidebar from "@/components/layout/Sidebar";

export default function Post() {
  return (
    <div style={{ display: "flex", height: "125vh" }}>
      <Sidebar />
      <main
        style={{
          flex: 1,
          padding: "20px",
          backgroundColor: "#f1f5f9", // Light gray background
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>Posts</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80%",
          }}
        >
          <div style={{ width: "80%", maxWidth: "800px" }}>
            <Editor />
          </div>
        </div>
      </main>
    </div>
  );
}
