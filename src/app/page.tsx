"use client"
import Image from "next/image";
import { useState } from "react";
import CameraCapture from "@/components/camera_capture";

export default function Home() {
  return (
    <div>
      <CameraCapture />
    </div>
  );
}
