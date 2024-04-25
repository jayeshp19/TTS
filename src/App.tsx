import React, { useState, useEffect } from 'react';
import './App.css';

import { Controls } from './components/Controls';
import { CurrentlyReading } from './components/CurrentlyReading';
import { useSpeech } from './lib/useSpeech';
import { fetchContent, parseContentIntoSentences } from './lib/content';

function App() {
  const [content, setContent] = useState('');
  const sentences = parseContentIntoSentences(content);
  const {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
  } = useSpeech(sentences);

  useEffect(() => {
    const fetchNewContent = async () => {
      const newContent = await fetchContent();
      setContent(newContent);
    };

    fetchNewContent();
  }, []);

  const currentSentence = sentences[currentSentenceIdx];
  const currentWord = currentSentence?.substring(...(currentWordRange as [number, number]));

  const loadNewContent = async () => {
    const newContent = await fetchContent();
    setContent(newContent);
  };

  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        <CurrentlyReading
          currentWordRange={currentWordRange as [number, number]}
          currentSentenceIdx={currentSentenceIdx}
          sentences={sentences}
        />
      </div>
      <div>
        <Controls
          play={play}
          pause={pause}
          loadNewContent={loadNewContent}
          state={playbackState}
        />
      </div>
    </div>
  );
}

export default App;
