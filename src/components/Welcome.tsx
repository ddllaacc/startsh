import { useState } from 'react';
import { TerminalPrompt } from './TerminalPrompt';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import poopEmoji from 'figma:asset/7114f84555e2e50e87b69cc8f921755e7a5edab9.png';

interface WelcomeProps {
  onStart: () => void;
  onTerminalClick?: () => void;
  isDebugMode?: boolean;
  onEnableDebugMode?: () => void;
  onDisableDebugMode?: () => void;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onDatePrevious: () => void;
  onDateNext: () => void;
  onDateClick: () => void;
  showCalendar: boolean;
  onCloseCalendar: () => void;
}

export function Welcome({ 
  onStart, 
  onTerminalClick, 
  isDebugMode, 
  onEnableDebugMode, 
  onDisableDebugMode,
  selectedDate,
  onDateChange,
  onDatePrevious,
  onDateNext,
  onDateClick,
  showCalendar,
  onCloseCalendar
}: WelcomeProps) {
  const [colorIndex, setColorIndex] = useState(0);
  const colors = ['red', 'green', 'blue'];
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  
  // Format date for display
  const formatDate = (date: Date) => {
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${dayOfWeek}, ${month}/${day}`;
  };
  
  const handleImageClick = () => {
    const newIndex = (colorIndex + 1) % colors.length;
    setColorIndex(newIndex);
    
    // If returning to red (index 0), disable debug mode
    if (newIndex === 0 && isDebugMode) {
      onDisableDebugMode?.();
    }
  };
  
  const getColorFilter = () => {
    switch (colors[colorIndex]) {
      case 'green':
        return 'hue-rotate(120deg)';
      case 'blue':
        return 'hue-rotate(240deg)';
      default:
        return 'none';
    }
  };

  const handleTerminalClick = () => {
    // If image is blue (index 2), show password modal
    if (colorIndex === 2) {
      setShowPasswordModal(true);
      setPassword('');
      setPasswordError(false);
    } else {
      // Otherwise, proceed with normal terminal behavior
      onTerminalClick?.();
    }
  };

  const handlePasswordSubmit = () => {
    if (password === 'p00persc00per') {
      // Correct password - enable debug mode
      onEnableDebugMode?.();
      setShowPasswordModal(false);
      setPassword('');
      setPasswordError(false);
    } else {
      // Incorrect password - show error
      setPasswordError(true);
    }
  };



  return (
    <div className="h-screen flex flex-col bg-black">
      <div className="flex-1 overflow-y-auto px-3" style={{ paddingBottom: '6rem' }}>
        <div className="flex flex-col items-center justify-start min-h-full">
          {/* Pixel Poop Emoji */}
          <div className="mb-8 mt-12">
            <img 
              src={poopEmoji} 
              alt="Pixel poop emoji" 
              className="w-64 h-auto cursor-pointer active:scale-95 transition-all"
              style={{ 
                imageRendering: 'pixelated',
                filter: getColorFilter()
              }}
              onClick={handleImageClick}
            />
          </div>

          {/* Date - with navigation arrows in debug mode */}
          <div className="mb-16 text-center">
            {isDebugMode ? (
              <div className="flex items-center gap-4 justify-center">
                <button
                  onClick={onDatePrevious}
                  className="text-[#ff0000] hover:opacity-70 active:scale-95 transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
                <p 
                  className="text-[#ff0000] tracking-wider cursor-pointer hover:opacity-70 active:scale-95 transition-all"
                  onClick={onDateClick}
                >
                  {formatDate(selectedDate)}
                </p>
                <button
                  onClick={onDateNext}
                  className="text-[#ff0000] hover:opacity-70 active:scale-95 transition-all"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            ) : (
              <p className="text-[#ff0000] tracking-wider">{formatDate(selectedDate)}</p>
            )}
          </div>

          {/* CTA Button */}
          <button
            onClick={onStart}
            className="w-full border-4 border-[#ff0000] bg-black p-6 text-[#ff0000] tracking-wider transition-all hover:bg-[#ff0000] hover:text-black active:scale-95 text-center text-[24px]"
          >
            startsh
          </button>
        </div>
      </div>
      
      <TerminalPrompt 
        onClick={handleTerminalClick}
        isDebugMode={isDebugMode}
        selectedDate={selectedDate}
        onDatePrevious={onDatePrevious}
        onDateNext={onDateNext}
        onDateClick={onDateClick}
      />

      {/* Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <>
            {/* Dark veil overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setShowPasswordModal(false)}
            />
            
            {/* Modal content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 flex items-center justify-center z-50 px-4"
            >
              <div className="bg-black border-4 border-[#ff0000] p-6 w-full max-w-sm">
                <h2 className="text-[#ff0000] tracking-wider text-center mb-6 text-xl">
                  Enter Password
                </h2>
                
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(false);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handlePasswordSubmit();
                    }
                  }}
                  className="w-full bg-black border-2 border-white text-white tracking-wider p-3 mb-4 focus:outline-none focus:border-[#ff0000]"
                  placeholder="password"
                  autoFocus
                />
                
                {passwordError && (
                  <p className="text-[#ff0000] tracking-wider text-center mb-4 text-sm">
                    Incorrect password
                  </p>
                )}
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowPasswordModal(false)}
                    className="flex-1 border-2 border-white bg-black p-3 text-white tracking-wider transition-all hover:bg-white hover:text-black active:scale-95"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePasswordSubmit}
                    className="flex-1 border-2 border-[#ff0000] bg-black p-3 text-[#ff0000] tracking-wider transition-all hover:bg-[#ff0000] hover:text-black active:scale-95"
                  >
                    Unlock
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>


    </div>
  );
}
