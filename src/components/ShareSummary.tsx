import { useState } from 'react';
import { Header } from './Header';
import { TerminalPrompt } from './TerminalPrompt';
import { PixelFireworks } from './PixelFireworks';
import { motion, AnimatePresence } from 'motion/react';

interface ShareSummaryProps {
  team: string;
  hotTake: 'AGREE' | 'DISAGREE';
  completionTime: number | 'fail';
  onComplete: () => void;
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

export function ShareSummary({ team, hotTake, completionTime, onComplete, onNavigateHome, onTerminalClick, isDebugMode, onNavigateBack, onNavigateForward, selectedDate, onDatePrevious, onDateNext, onDateClick }: ShareSummaryProps) {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleCopy = async () => {
    const timeDisplay = completionTime === 'fail' ? 'FAIL' : formatTime(completionTime);
    const summaryText = `startsh💩

🥇 ${team?.toUpperCase() || 'NO TEAM'}
🔥 ${hotTake || 'NO RESPONSE'}
⏱️ ${timeDisplay}`;
    
    let copySuccessful = false;
    
    try {
      // Try using the modern clipboard API
      await navigator.clipboard.writeText(summaryText);
      copySuccessful = true;
    } catch (err) {
      // Fallback: use textarea method
      try {
        const textarea = document.createElement('textarea');
        textarea.value = summaryText;
        textarea.style.position = 'fixed';
        textarea.style.left = '-999999px';
        textarea.style.top = '-999999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        copySuccessful = document.execCommand('copy');
        document.body.removeChild(textarea);
      } catch (fallbackErr) {
        copySuccessful = false;
      }
    }
    
    if (copySuccessful) {
      setModalMessage('Copied to clipboard!');
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    } else {
      setModalMessage('Failed to copy');
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    }
    
    if (!isDebugMode) {
      setTimeout(onComplete, 1500);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Header 
        onNavigateHome={onNavigateHome} 
        variant="green"
        isDebugMode={isDebugMode}
        onNavigateBack={onNavigateBack}
        onNavigateForward={onNavigateForward}
      />
      
      <div className="flex-1 overflow-y-auto px-3" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
        <div className="flex flex-col gap-8">
          <PixelFireworks variant="green" />

          <div className="text-[#00ff00] tracking-wider text-center">
            <p className="text-[20px]">great job.</p>
            <p className="text-[14px] mt-2">share with friends.</p>
            <p className="text-[14px] mt-1">peer pressure them.</p>
          </div>

          {/* SMS Bubble Container */}
          <div className="px-4">
            <div className="relative">
              {/* Speech bubble with tail */}
              <div className="border-4 border-white space-y-3 relative pt-[16px] pr-[16px] pb-[8px] pl-[16px]">
                <p className="text-white tracking-wider text-[14px]">🥇        <span className="text-[#00ff00]">{team?.toUpperCase() || 'NO TEAM'}</span></p>
                <p className="text-white tracking-wider text-[14px]">🔥    <span className="text-[#00ff00]">{hotTake || 'NO RESPONSE'}</span></p>
                <p className="text-white tracking-wider text-[14px]">⏱️      <span className="text-[#00ff00]">{completionTime === 'fail' ? 'FAIL' : formatTime(completionTime)}</span></p>
                
                {/* Tail/carat */}
                <div className="absolute -bottom-[14px] left-8">
                  <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[14px] border-t-white"></div>
                  <div className="absolute top-[-18px] left-[2px] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-black"></div>
                </div>
              </div>
              
              {/* Emoji row: Phone on left, pointing emoji centered */}
              <div className="relative flex justify-center items-center mt-3">
                <div className="absolute left-4 text-6xl">
                  🤳
                </div>
                
                <motion.div
                  className="text-6xl"
                  animate={{
                    y: [0, -8, 0]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  👇
                </motion.div>
              </div>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="w-full border-4 border-[#00ff00] bg-black p-4 text-[#00ff00] tracking-wider transition-all hover:bg-[#00ff00] hover:text-black active:scale-95 text-center text-[15px]"
          >
            Copy to Clipboard
          </button>
        </div>
      </div>

      <TerminalPrompt 
        variant="green" 
        onClick={onTerminalClick}
        isDebugMode={isDebugMode}
        selectedDate={selectedDate}
        onDatePrevious={onDatePrevious}
        onDateNext={onDateNext}
        onDateClick={onDateClick}
      />
      
      {/* Centered Modal with Veil */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Dark veil overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
            />
            
            {/* Modal content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center z-50 px-4"
              style={{ top: '30%', bottom: 'auto' }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#00ff00] border-4 border-[#00ff00] px-8 py-12 max-w-[280px] w-full flex items-center justify-center"
                style={{ aspectRatio: '3 / 5' }}
              >
                <p className="text-black tracking-wider text-center text-[16px]">
                  {modalMessage}
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
