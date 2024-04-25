import { useState, useEffect } from 'react';

import { PlayingState, createSpeechEngine } from './speech';

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/
const useSpeech = (sentences: Array<string>) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState([0, 0]);

  const [playbackState, setPlaybackState] = useState<PlayingState>("intialized");

  const speechEngine = createSpeechEngine({
    onBoundary: (e) => {
      setCurrentWordRange([e.charIndex, e.charLength]);
    },
    onEnd: (e) => {
      setCurrentSentenceIdx((idx) => idx + 1);
      setCurrentWordRange([0, 0]);
    },
    onStateUpdate: setPlaybackState,
  });

  // Load the current sentence into the speech engine
  useEffect(() => {
    if (sentences[currentSentenceIdx]) {
      speechEngine.load(sentences[currentSentenceIdx]);
    }
  }, [sentences, currentSentenceIdx]);

  const play = () => {
    if (playbackState === "paused") {
      window.speechSynthesis.resume();
    } else {
      speechEngine.play();
    }
  };
  const pause = () => {
    window.speechSynthesis.pause();
  };

  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
  };
};

export { useSpeech };
