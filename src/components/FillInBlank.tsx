import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './Header';
import { TerminalPrompt } from './TerminalPrompt';

interface FillInBlankProps {
  onComplete: (time: number | 'fail') => void;
  category: string;
  answer: string;
  puzzle: string;
  onNavigateHome?: () => void;
  onTerminalClick?: () => void;
  isDebugMode?: boolean;
  onNavigateBack?: () => void;
  onNavigateForward?: () => void;
  selectedDate?: Date;
  onDatePrevious?: () => void;
  onDateNext?: () => void;
  onDateClick?: () => void;
}

export function FillInBlank({ onComplete, category, answer: rawAnswer, puzzle, onNavigateHome, onTerminalClick, isDebugMode, onNavigateBack, onNavigateForward, selectedDate, onDatePrevious, onDateNext, onDateClick }: FillInBlankProps) {
  // Parse the puzzle string to create display pattern and map to answer
  const displayPattern = puzzle.split('').map((char, index) => {
    if (char === ' ') {
      return { char: ' ', isDash: false };
    } else if (char === '-') {
      // Find the correct letter from the answer at this position (preserve original case)
      return { char: rawAnswer[index] || '', isDash: true };
    } else {
      return { char, isDash: false };
    }
  });

  const [filledLetters, setFilledLetters] = useState<{ [key: number]: string }>({});
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showResetMessage, setShowResetMessage] = useState(false);

  // Select first empty dash on mount
  useEffect(() => {
    const firstDash = displayPattern.findIndex(item => item.isDash);
    if (firstDash !== -1) {
      setSelectedIndex(firstDash);
    }
  }, []);

  // Timer
  useEffect(() => {
    if (isComplete) return;
    
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isComplete]);

  // Format timer as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Check if puzzle is complete
  useEffect(() => {
    const dashIndices = displayPattern
      .map((item, idx) => (item.isDash ? idx : -1))
      .filter(idx => idx !== -1);

    const allFilled = dashIndices.every(idx => filledLetters[idx]);
    
    if (allFilled && !isComplete) {
      setIsComplete(true);
      setTimeout(() => onComplete(timer), 500);
    }
  }, [filledLetters, displayPattern, isComplete, onComplete, timer]);

  // Keyboard input handler
  useEffect(() => {
    if (isComplete) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      
      // Only handle A-Z keys
      if (key.length === 1 && key >= 'A' && key <= 'Z') {
        event.preventDefault();
        handleLetterClick(key);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isComplete, selectedIndex, filledLetters]);

  const handleDashClick = (index: number) => {
    if (displayPattern[index].isDash) {
      setSelectedIndex(index);
    }
  };

  const handleLetterClick = (letter: string) => {
    if (selectedIndex === null) {
      // Auto-select first empty dash
      const firstEmptyDash = displayPattern.findIndex(
        (item, idx) => item.isDash && !filledLetters[idx]
      );
      if (firstEmptyDash !== -1) {
        handleLetterInput(firstEmptyDash, letter);
      }
      return;
    }

    handleLetterInput(selectedIndex, letter);
  };

  const handleLetterInput = (index: number, letter: string) => {
    const correctLetter = displayPattern[index].char;
    
    if (letter.toUpperCase() === correctLetter.toUpperCase()) {
      // Correct! Store the letter in its original case from the answer
      setFilledLetters(prev => ({ ...prev, [index]: correctLetter }));
      
      // Move to next dash
      const nextDash = displayPattern.findIndex(
        (item, idx) => idx > index && item.isDash && !filledLetters[idx]
      );
      setSelectedIndex(nextDash !== -1 ? nextDash : null);
    } else {
      // Wrong!
      const newWrongCount = wrongGuesses + 1;
      setWrongGuesses(newWrongCount);
      
      if (newWrongCount >= 3) {
        // Show reset message
        setShowResetMessage(true);
        
        // Clear all filled letters
        setFilledLetters({});
        setWrongGuesses(0);
        
        // Select the first dash so it blinks
        const firstDash = displayPattern.findIndex(item => item.isDash);
        setSelectedIndex(firstDash !== -1 ? firstDash : null);
        
        // Hide message after 2 seconds
        setTimeout(() => {
          setShowResetMessage(false);
        }, 2000);
      }
    }
  };

  const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ];

  return (
    <div className="h-screen flex flex-col">
      <Header 
        onNavigateHome={onNavigateHome}
        isDebugMode={isDebugMode}
        onNavigateBack={onNavigateBack}
        onNavigateForward={onNavigateForward}
      />
      
      <div className="flex-1 overflow-y-auto px-3" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
        <div className="flex flex-col">
          {/* Interactive riddle */}
          <div className="border-2 border-dotted border-[#ff0000] text-center p-[24px]">
            {/* Category and Timer on one line */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-[#ff0000] tracking-wider text-[13px]">
                {category.toLowerCase()}
              </p>
              <p className="text-gray-400 tracking-wider text-[13px]">
                {formatTime(timer)}
              </p>
            </div>
            <div className="text-white tracking-wider text-2xl flex flex-wrap justify-center gap-x-6 gap-y-1 text-[18px]">
              {(() => {
                // Group letters into words
                const words: number[][] = [];
                let currentWord: number[] = [];
                
                displayPattern.forEach((item, index) => {
                  if (item.char === ' ') {
                    if (currentWord.length > 0) {
                      words.push(currentWord);
                      currentWord = [];
                    }
                  } else {
                    currentWord.push(index);
                  }
                });
                
                if (currentWord.length > 0) {
                  words.push(currentWord);
                }
                
                // Render each word as a non-breaking unit
                return words.map((word, wordIdx) => (
                  <span key={`word-${wordIdx}`} className="inline-flex gap-[1px] whitespace-nowrap">
                    {word.map((index) => {
                      const item = displayPattern[index];
                      
                      if (!item.isDash) {
                        return (
                          <span key={index} className="inline-block">
                            {item.char}
                          </span>
                        );
                      }

                      // It's a dash
                      const isSelected = selectedIndex === index;
                      const isFilled = filledLetters[index];

                      return (
                        <span
                          key={index}
                          onClick={() => handleDashClick(index)}
                          className={`inline-block cursor-pointer min-w-[16px] relative ${
                            isSelected && !isFilled ? '' : (isSelected ? 'text-[#ff0000]' : 'text-white')
                          }`}
                        >
                          {isFilled ? (
                            isFilled
                          ) : isSelected ? (
                            <span className="inline-block relative">
                              _
                              <span 
                                className="absolute left-0 bg-[#ff0000] blink align-bottom"
                                style={{ 
                                  width: '0.85em',
                                  height: '1.25em',
                                  verticalAlign: '-0.05em',
                                  top: '-8px'
                                }}
                              />
                            </span>
                          ) : (
                            '_'
                          )}
                        </span>
                      );
                    })}
                  </span>
                ));
              })()}
            </div>
          </div>

          {/* Error indicator and Give Up Button */}
          <div className="flex justify-between items-center mt-8 h-[1.5rem]">
            <AnimatePresence mode="wait">
              {showResetMessage ? (
                <motion.div
                  key="reset-message"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.0 }}
                  className="text-[#ff0000] tracking-wider"
                >
                  wrong. dummy.
                </motion.div>
              ) : (
                <div key="error-xs-and-button" className="flex justify-between items-center w-full">
                  <div className="flex gap-1">
                    {Array.from({ length: wrongGuesses }).map((_, i) => (
                      <span key={i} className="text-[#ff0000] tracking-wider">X</span>
                    ))}
                  </div>
                  <button
                    onClick={() => onComplete('fail')}
                    className="border-2 border-[#ff0000] bg-black px-3 py-1 text-[#ff0000] tracking-wider transition-all hover:bg-[#ff0000] hover:text-black active:scale-95 text-[14px]"
                  >
                    give up
                  </button>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* QWERTY Keyboard */}
          <div className="space-y-2 mt-8 max-w-[min(100%,380px)] mx-auto w-full mb-16">
            {keyboardRows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-1">
                {row.map((letter) => (
                  <button
                    key={letter}
                    onPointerDown={(e) => {
                      e.preventDefault();
                      handleLetterClick(letter);
                    }}
                    className="bg-gray-400 text-black tracking-wider origin-bottom active:scale-[1.4] active:bg-[#ff0000] flex items-center justify-center flex-1 max-w-[36px] min-h-[75px] pb-6"
                    style={{ 
                      touchAction: 'manipulation',
                      WebkitTapHighlightColor: 'transparent'
                    }}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <TerminalPrompt 
        onClick={onTerminalClick}
        isDebugMode={isDebugMode}
        selectedDate={selectedDate}
        onDatePrevious={onDatePrevious}
        onDateNext={onDateNext}
        onDateClick={onDateClick}
      />
    </div>
  );
}