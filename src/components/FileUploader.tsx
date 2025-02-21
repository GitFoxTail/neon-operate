'use client';

import React, { useState, useEffect } from "react";
import { FaCamera } from "react-icons/fa";

export default function FileUploader(){
    const [file, setFile] = useState<File | null>(null);
    const [result, setResult] = useState<any>(null);

    // fileの変更を監視するuseEffect
    useEffect(() => {
        if (file){
            setResult("loading...");
            handleAnalyze();
        }
    }, [file])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files){
            setFile(e.target.files[0]);
        }
    };

    const handleAnalyze = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload-and-analyze', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        setResult(data.result);
    };

    return (
        <div>
            <div className="grid rounded-full border-blue-400 hover:bg-blue-400 border-4 w-40 h-40 place-items-center">
                <label className="grid w-full h-full place-items-center cursor-pointer">
                    <FaCamera className="w-1/2 h-1/2"/>
                    <input type="file" onChange={handleFileChange} className="hidden"/>
                </label>
            </div>
            {/* <button onClick={handleAnalyze} disabled={!file} className="border m-5 text-xl">
                ドキュメントを分析
            </button> */}

            {result && (
                <div>
                    <h3 className="font-bold text-2xl">OCR結果</h3>
                    <p className="whitespace-pre border border-black">{typeof result === 'string' ? result: result.content}</p>
                </div>
            )}
        </div>
    );
}