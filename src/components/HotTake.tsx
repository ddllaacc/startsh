import { Header } from './Header';
import { TerminalPrompt } from './TerminalPrompt';

interface HotTakeProps {
  onSelect: (selection: 'AGREE' | 'DISAGREE') => void;
  selectedTake: 'AGREE' | 'DISAGREE' | null;
  hotTakeText: string;
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

export function HotTake({ onSelect, selectedTake, hotTakeText, onNavigateHome, onTerminalClick, isDebugMode, onNavigateBack, onNavigateForward, selectedDate, onDatePrevious, onDateNext, onDateClick }: HotTakeProps) {
  return (
    <div className="h-screen flex flex-col">
      <Header 
        onNavigateHome={onNavigateHome}
        isDebugMode={isDebugMode}
        onNavigateBack={onNavigateBack}
        onNavigateForward={onNavigateForward}
      />
      
      <div className="flex-1 overflow-y-auto px-3 flex flex-col" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
        <div className="border-2 border-dotted border-[#ff0000] text-center p-[16px]">
          <p className="text-white tracking-wider leading-relaxed lowercase text-[20px]">
            {hotTakeText}
          </p>
        </div>

        <div className="flex-1 flex items-center">
          <div className="space-y-6 w-full">
            <button
              onClick={() => onSelect('AGREE')}
              className="w-full border-4 border-white bg-black p-6 text-white tracking-wider transition-all hover:bg-white hover:text-black active:scale-95"
            >
              AGREE
            </button>

            <button
              onClick={() => onSelect('DISAGREE')}
              className="w-full border-4 border-white bg-black p-6 text-white tracking-wider transition-all hover:bg-white hover:text-black active:scale-95"
            >
              DISAGREE
            </button>
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
