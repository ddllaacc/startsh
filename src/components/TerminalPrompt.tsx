import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TerminalPromptProps {
  variant?: 'red' | 'green';
  onClick?: () => void;
  isDebugMode?: boolean;
  selectedDate?: Date;
  onDatePrevious?: () => void;
  onDateNext?: () => void;
  onDateClick?: () => void;
}

export function TerminalPrompt({ 
  variant = 'red', 
  onClick, 
  isDebugMode, 
  selectedDate, 
  onDatePrevious, 
  onDateNext,
  onDateClick 
}: TerminalPromptProps) {
  const color = variant === 'green' ? '#00ff00' : '#ff0000';
  
  const formatDateShort = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear().toString().slice(-2);
    return `${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}/${year}`;
  };
  
  return (
    <div 
      className="fixed bottom-0 left-0 right-0 bg-black z-50 px-6 pb-8 pt-4 cursor-pointer" 
      style={{ color }}
    >
      <div className="w-full max-w-sm mx-auto">
        {isDebugMode && selectedDate ? (
          <div className="flex items-center justify-between">
            {/* Terminal prompt on left */}
            <div className="flex items-center gap-2" onClick={onClick}>
              <span>&gt;</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                _
              </motion.span>
            </div>
            
            {/* Date controls on right */}
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDatePrevious?.();
                }}
                className="hover:opacity-70 active:scale-95 transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              <span 
                onClick={(e) => {
                  e.stopPropagation();
                  onDateClick?.();
                }}
                className="text-sm hover:opacity-70 active:scale-95 transition-all"
              >
                {formatDateShort(selectedDate)}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDateNext?.();
                }}
                className="hover:opacity-70 active:scale-95 transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2" onClick={onClick}>
            <span>&gt;</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              _
            </motion.span>
          </div>
        )}
      </div>
    </div>
  );
}
