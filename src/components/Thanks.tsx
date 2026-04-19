import { useEffect } from 'react';
import { Header } from './Header';
import { TerminalPrompt } from './TerminalPrompt';

interface ThanksProps {
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

export function Thanks({ onComplete, onNavigateHome, onTerminalClick, isDebugMode, onNavigateBack, onNavigateForward, selectedDate, onDatePrevious, onDateNext, onDateClick }: ThanksProps) {
  useEffect(() => {
    if (!isDebugMode) {
      const timer = setTimeout(onComplete, 2100);
      return () => clearTimeout(timer);
    }
  }, [onComplete, isDebugMode]);

  return (
    <div className="h-screen flex flex-col">
      <Header 
        onNavigateHome={onNavigateHome}
        isDebugMode={isDebugMode}
        onNavigateBack={onNavigateBack}
        onNavigateForward={onNavigateForward}
      />
      
      <div className="flex-1 overflow-y-auto px-3 flex flex-col items-center" style={{ paddingTop: '35%', paddingBottom: '6rem' }}>
        <div className="text-center space-y-4 text-[#ff0000] tracking-wider text-2xl">
          <p>thanks.</p>
          <p>now go</p>
          <p>away.</p>
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
