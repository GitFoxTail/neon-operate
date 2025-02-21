"use client"
import CameraCapture from "@/components/camera_capture";

import React from "react";
import DocumentAnalyzer from "@/components/DocumentAnalyzer";
import FileUploader from "@/components/FileUploader";

export default function HomePage() {
  return (
    <main>
      {/* <div>
        <CameraCapture />
      </div> */}
      <h1 className="bg-gray-500 text-white h-24 text-center">ドキュメント分析ツール</h1>
      {/* <DocumentAnalyzer /> */}
      <FileUploader />
    </main>
  );
}
