import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeaderProps {
  onNavigateHome?: () => void;
  variant?: 'red' | 'green';
  isDebugMode?: boolean;
  onNavigateBack?: () => void;
  onNavigateForward?: () => void;
}

export function Header({ onNavigateHome, variant = 'red', isDebugMode, onNavigateBack, onNavigateForward }: HeaderProps) {
  const color = variant === 'green' ? '#00ff00' : '#ff0000';
  
  return (
    <div className="fixed top-0 left-0 right-0 bg-black z-50">
      <div className="w-full max-w-sm mx-auto px-3 pt-4 pb-2">
        <div className="relative mb-2 flex items-center justify-center">
          {/* Back arrow in debug mode */}
          {isDebugMode && onNavigateBack && (
            <button
              onClick={onNavigateBack}
              className="absolute left-0 hover:opacity-70 active:scale-95 transition-all"
              style={{ color }}
            >
              <ChevronLeft size={20} />
            </button>
          )}
          
          <h1 
            className="text-center tracking-wider text-sm cursor-pointer hover:opacity-70 active:scale-95 transition-all" 
            style={{ color }}
            onClick={onNavigateHome}
          >
            startsh
          </h1>
          
          {/* Forward arrow in debug mode */}
          {isDebugMode && onNavigateForward && (
            <button
              onClick={onNavigateForward}
              className="absolute right-0 hover:opacity-70 active:scale-95 transition-all"
              style={{ color }}
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>
        <div className="border-t-2" style={{ 
          borderStyle: 'dotted',
          borderWidth: '2px',
          borderColor: color
        }} />
      </div>
    </div>
  );
}
