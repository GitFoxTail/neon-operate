import React from "react";

interface ResultDisplayProps {
    result: any;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
    return (
        <div>
            <h3>抽出されたテキスト</h3>
            {result.content && <p>{result.content}</p>}
        </div>
    )
}