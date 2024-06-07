"use client"

import { useState, ChangeEvent } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function Home() {
    const [result, setResult] = useState<string>('');
    const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>(null);

    async function generateContent() {
        const genAI = new GoogleGenerativeAI('AIzaSyD0-ittuEbbVcKxKSal4ZzRdnvFkD5LDyE');
        const model = await genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = 'What\'s the error?';
        const imageParts = selectedImage ? [
            {
                inlineData: {
                    data: typeof selectedImage === 'string' ? selectedImage : Buffer.from(selectedImage).toString('base64'),
                    mimeType: 'image/png',
                },
            }
        ] : [];

        try {
            const result = await model.generateContent([prompt, ...imageParts]);
            const response = await result.response;
            const text: string = await response.text();
            setResult(text);
        } catch (error) {
            console.error('Error generating content:', error);
        }
    }

    function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            if (reader.result) {
                setSelectedImage(reader.result);
            }
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    return (
        <div>
            <h1>Google Generative AI Result</h1>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={generateContent}>Generate Content</button>
            <p>{result}</p>
        </div>
    );
}
