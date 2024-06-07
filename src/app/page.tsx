

'use client';

import { useState } from 'react';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const askQuestion = async () => {
    const res = await fetch('/api/run_python', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: question }),
    });

    
    const data = await res.json();
    console.log(data);
    console.log(data.result);
    setAnswer(data.result);
  };

  return (
    <div>
      <h1>Ask a Question</h1>
      <input
        className='text-black'
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={askQuestion}>Ask</button>
      <h2>Answer</h2>
      <p>{answer}</p>
    </div>
  );
}
