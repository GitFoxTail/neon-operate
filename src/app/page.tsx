"use client"
import CameraCapture from "@/components/camera_capture";

import React from "react";
import DocumentAnalyzer from "@/components/DocumentAnalyzer";
import FileUploader from "@/components/FileUploader";

export default function HomePage() {
  return (
    <main>
      <div>
        <CameraCapture />
      </div>
      <h1>ドキュメント分析ツール</h1>
      <DocumentAnalyzer />
      <hr />
      <FileUploader />
    </main>
  );
}
