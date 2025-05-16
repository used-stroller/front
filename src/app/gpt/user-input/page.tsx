'use client';
import { useState } from 'react';
export default function RecommendPage() {
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const handleRecommend = async () => {
        setLoading(true);
        setResult('');
        const res = await fetch("http://localhost:8081/test/stream", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "text/event-stream", // 또는 application/ndjson
            },
        });
        const reader = res.body?.getReader();
        const decoder = new TextDecoder('utf-8');
        let fullText = '';
        let buffer = '';
        while (true) {
            const { value, done } = await reader!.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            buffer += chunk;
            const lastSpaceIdx = buffer.lastIndexOf(' ');
            if (lastSpaceIdx !== -1) {
                const flush = buffer.slice(0, lastSpaceIdx + 1); // 마지막 단어까지 포함
                fullText += flush;
                buffer = buffer.slice(lastSpaceIdx + 1); // 다음 chunk 대비 나머지 보관
                setResult(fullText);
            }
        }
        // 마지막 남은 단어 붙이기
        if (buffer.length > 0) {
            fullText += buffer;
            setResult(fullText);
        }
        setLoading(false);
    };
    return (
        <main className="p-4 max-w-md mx-auto">
            <h1 className="text-lg font-bold mb-4">AI 유모차 추천</h1>
            <button
                onClick={handleRecommend}
                disabled={loading}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md mb-4"
            >
                {loading ? '추천 중...' : 'AI 추천 받기'}
            </button>
            <div className="whitespace-pre-wrap text-sm bg-gray-100 p-3 rounded-md">
                {result || '여기에 추천 결과가 표시됩니다.'}
            </div>
        </main>
    );
}