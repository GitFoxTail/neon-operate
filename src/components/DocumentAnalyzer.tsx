'use client'

import React, { useState } from "react";

export default function DocumentAnalyzer(){
    const [documentUrl, setDocumentUrl] = useState('');
    const [result, setResult] = useState<any>(null);

    const handleAnalyze = async () => {
        const response = await fetch('/api/analyze-document', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ documentUrl }),
        });

        const data = await response.json();
        setResult(data.result);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="ドキュメントのURLを入力"
                value={documentUrl}
                onChange={(e) => setDocumentUrl(e.target.value)}
            />
            <button onClick={handleAnalyze}>ドキュメントを分析</button>

            {result && (
                <div>
                    <h3>分析結果：</h3>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}