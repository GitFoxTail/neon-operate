'use client';

import React, { useState } from "react";

export default function FileUploader(){
    const [file, setFile] = useState<File | null>(null);
    const [result, setResult] = useState<any>(null);

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
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleAnalyze} disabled={!file}>
                ドキュメントを分析
            </button>

            {result && (
                <div>
                    <h3>分析結果</h3>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}