import { Header } from './Header';
import { TerminalPrompt } from './TerminalPrompt';

interface PickTeamProps {
  onSelect: (team: string) => void;
  selectedTeam: string | null;
  team1: string;
  team2: string;
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

export function PickTeam({ onSelect, selectedTeam, team1, team2, onNavigateHome, onTerminalClick, isDebugMode, onNavigateBack, onNavigateForward, selectedDate, onDatePrevious, onDateNext, onDateClick }: PickTeamProps) {
  return (
    <div className="h-screen flex flex-col">
      <Header 
        onNavigateHome={onNavigateHome}
        isDebugMode={isDebugMode}
        onNavigateBack={onNavigateBack}
        onNavigateForward={onNavigateForward}
      />
      
      <div className="flex-1 overflow-y-auto px-3 flex flex-col" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
        <div className="border-2 border-dotted border-[#ff0000] text-center px-[24px] py-[45px]">
          <h2 className="text-white tracking-wider">pick a team</h2>
        </div>

        <div className="flex-1 flex items-center">
          <div className="space-y-6 w-full">
            <button
              onClick={() => onSelect(team1)}
              className="w-full border-4 border-white bg-black p-6 text-white tracking-wider transition-all hover:bg-white hover:text-black active:scale-95"
            >
              {team1.toUpperCase()}
            </button>

            <button
              onClick={() => onSelect(team2)}
              className="w-full border-4 border-white bg-black p-6 text-white tracking-wider transition-all hover:bg-white hover:text-black active:scale-95"
            >
              {team2.toUpperCase()}
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
