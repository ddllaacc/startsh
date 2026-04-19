import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Header } from './Header';
import { TerminalPrompt } from './TerminalPrompt';

interface BoxBreathingProps {
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

export function BoxBreathing({ onNavigateHome, onTerminalClick, isDebugMode, onNavigateBack, onNavigateForward, selectedDate, onDatePrevious, onDateNext, onDateClick }: BoxBreathingProps) {
  const [phase, setPhase] = useState(0); // 0: inhale, 1: hold, 2: exhale, 3: hold
  const [currentSecond, setCurrentSecond] = useState(1);
  const [millisInSecond, setMillisInSecond] = useState(0);
  const [progressInPhase, setProgressInPhase] = useState(0); // 0-1 progress within current phase
  const [totalElapsedSeconds, setTotalElapsedSeconds] = useState(0);
  
  useEffect(() => {
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const totalSeconds = Math.floor(elapsed / 1000);
      const currentPhase = Math.floor(totalSeconds / 4) % 4;
      
      // Update phase every 4 seconds
      setPhase(currentPhase);
      
      // Update current second (1-4) within the current phase
      setCurrentSecond((totalSeconds % 4) + 1);
      
      // Update milliseconds within current second
      setMillisInSecond(elapsed % 1000);
      
      // Calculate progress within current 4-second phase (0-1)
      const millisInPhase = elapsed % 4000;
      setProgressInPhase(millisInPhase / 4000);
      
      // Update total elapsed time
      setTotalElapsedSeconds(totalSeconds);
    }, 16); // ~60fps for smooth animation
    
    return () => clearInterval(interval);
  }, []);
  
  const boxSize = 280;
  const padding = 40;
  const dotSize = 12;

  // Calculate dot position based on phase and progress (centered on line)
  const getDotPosition = () => {
    const offset = dotSize / 2; // Center the dot on the line
    
    // Calculate position based on phase and progress within that phase
    switch (phase) {
      case 0: // inhale - moving UP the left side
        return { 
          x: 0 - offset, 
          y: boxSize - (progressInPhase * boxSize) - offset 
        };
      case 1: // hold - moving RIGHT across the top
        return { 
          x: (progressInPhase * boxSize) - offset, 
          y: 0 - offset 
        };
      case 2: // exhale - moving DOWN the right side
        return { 
          x: boxSize - offset, 
          y: (progressInPhase * boxSize) - offset 
        };
      case 3: // hold - moving LEFT across the bottom
        return { 
          x: boxSize - (progressInPhase * boxSize) - offset, 
          y: boxSize - offset 
        };
      default:
        return { x: -offset, y: boxSize - offset };
    }
  };

  const pos = getDotPosition();
  
  // Calculate dot scale based on breathing phase
  const getDotScale = () => {
    switch (phase) {
      case 0: // inhale - grow from 1x to 4x
        return 1 + (progressInPhase * 3); // 1 + (0-1 * 3) = 1 to 4
      case 1: // hold at top - stay at 4x
        return 4;
      case 2: // exhale - shrink from 4x to 1x
        return 4 - (progressInPhase * 3); // 4 - (0-1 * 3) = 4 to 1
      case 3: // hold at bottom - stay at 1x
        return 1;
      default:
        return 1;
    }
  };
  
  const dotScale = getDotScale();
  
  // Calculate opacity for the "4" - fade out during the final second
  const getNumberOpacity = () => {
    if (currentSecond === 4) {
      return 1 - (millisInSecond / 1000);
    }
    return 1;
  };
  
  // Calculate which parts of the box should be red based on overall progress
  const getLineSegments = () => {
    // Total progress around the perimeter (0-4, one unit per side)
    const totalProgress = phase + progressInPhase;
    
    // Each side's color and opacity
    return {
      left: getSegmentColor(0, totalProgress),
      top: getSegmentColor(1, totalProgress),
      right: getSegmentColor(2, totalProgress),
      bottom: getSegmentColor(3, totalProgress),
    };
  };
  
  const getSegmentColor = (segmentPhase: number, totalProgress: number) => {
    const segmentStart = segmentPhase;
    const segmentEnd = segmentPhase + 1;
    
    if (totalProgress >= segmentStart && totalProgress < segmentEnd) {
      // Currently on this segment - partial red
      const segmentProgress = totalProgress - segmentStart;
      return { 
        redProgress: segmentProgress,
        isActive: true 
      };
    } else if (totalProgress >= segmentEnd) {
      // Past this segment - fade from red to white (40% faster)
      const timeSincePassed = totalProgress - segmentEnd;
      const fadeProgress = Math.min(timeSincePassed / 1.43, 0.85); // Cap at 0.85 so trail stays visible
      return { 
        redProgress: 1,
        fadeToWhite: fadeProgress,
        isActive: false 
      };
    } else if (totalProgress < segmentStart) {
      // We've wrapped around - this segment was completed in the previous cycle
      // Calculate time since completion: (4 - segmentEnd) + totalProgress
      const timeSincePassed = (4 - segmentEnd) + totalProgress;
      const fadeProgress = Math.min(timeSincePassed / 1.43, 0.85); // Cap at 0.85 so trail stays visible
      return { 
        redProgress: 1,
        fadeToWhite: fadeProgress,
        isActive: false 
      };
    } else {
      // Haven't reached this segment yet
      return { 
        redProgress: 0,
        isActive: false 
      };
    }
  };
  
  const segments = getLineSegments();
  
  // Format total elapsed time as MM:SS
  const formatElapsedTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };
  
  // Helper to get color for a segment
  const getSegmentStrokeColor = (segment: any) => {
    if (!segment.isActive && segment.redProgress === 0) {
      return 'white';
    }
    if (segment.fadeToWhite !== undefined) {
      // Interpolate from red to white
      const r = 255;
      const g = Math.round(segment.fadeToWhite * 255);
      const b = Math.round(segment.fadeToWhite * 255);
      return `rgb(${r}, ${g}, ${b})`;
    }
    return '#ff0000';
  };

  return (
    <div className="h-screen flex flex-col">
      <Header 
        onNavigateHome={onNavigateHome}
        isDebugMode={isDebugMode}
        onNavigateBack={onNavigateBack}
        onNavigateForward={onNavigateForward}
      />
      
      <div className="flex-1 overflow-y-auto px-3 flex flex-col items-center" style={{ paddingTop: '35%', paddingBottom: '6rem' }}>
        {/* Breathe label */}
        <div className="text-center text-gray-400 tracking-wider" style={{ fontSize: '32px' }}>
          breathe
        </div>

        {/* Elapsed timer */}
        <div className="mt-2 mb-8 text-center text-gray-400 tracking-wider" style={{ fontSize: '16px' }}>
          {formatElapsedTime(totalElapsedSeconds)}
        </div>

        <div 
          className="relative"
          style={{ 
            width: boxSize + padding * 2, 
            height: boxSize + padding * 2 
          }}
        >
          {/* Static white dashed box outline (background) */}
          <svg
            className="absolute"
            style={{ 
              left: padding, 
              top: padding,
              width: boxSize,
              height: boxSize
            }}
          >
            <rect
              x="0"
              y="0"
              width={boxSize}
              height={boxSize}
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </svg>

          {/* Animated red trail segments (overlay, dashed with aligned offsets) */}
          <svg
            className="absolute"
            style={{ 
              left: padding, 
              top: padding,
              width: boxSize,
              height: boxSize
            }}
          >
            {/* Left side (inhale) - red trail */}
            {segments.left.redProgress > 0 && (
              <line
                x1="0"
                y1={boxSize}
                x2="0"
                y2={boxSize - (boxSize * segments.left.redProgress)}
                stroke={getSegmentStrokeColor(segments.left)}
                strokeWidth="2"
                strokeDasharray="4 4"
                strokeDashoffset={0}
              />
            )}
            
            {/* Top side (hold) - red trail */}
            {segments.top.redProgress > 0 && (
              <line
                x1="0"
                y1="0"
                x2={boxSize * segments.top.redProgress}
                y2="0"
                stroke={getSegmentStrokeColor(segments.top)}
                strokeWidth="2"
                strokeDasharray="4 4"
                strokeDashoffset={-(boxSize % 8)}
              />
            )}
            
            {/* Right side (exhale) - red trail */}
            {segments.right.redProgress > 0 && (
              <line
                x1={boxSize}
                y1="0"
                x2={boxSize}
                y2={boxSize * segments.right.redProgress}
                stroke={getSegmentStrokeColor(segments.right)}
                strokeWidth="2"
                strokeDasharray="4 4"
                strokeDashoffset={-((boxSize * 2) % 8)}
              />
            )}
            
            {/* Bottom side (hold) - red trail */}
            {segments.bottom.redProgress > 0 && (
              <line
                x1={boxSize}
                y1={boxSize}
                x2={boxSize - (boxSize * segments.bottom.redProgress)}
                y2={boxSize}
                stroke={getSegmentStrokeColor(segments.bottom)}
                strokeWidth="2"
                strokeDasharray="4 4"
                strokeDashoffset={-((boxSize * 3) % 8)}
              />
            )}
          </svg>

          {/* Left label: INHALE (vertical) */}
          <div 
            className="absolute text-white tracking-wider flex flex-col"
            style={{ 
              left: padding + 15,
              top: '50%',
              transform: 'translateY(-50%)',
              writingMode: 'vertical-rl',
              textOrientation: 'mixed'
            }}
          >
            INHALE
          </div>

          {/* Top label: HOLD */}
          <div 
            className="absolute text-white tracking-wider text-center"
            style={{ 
              top: padding + 15,
              left: '50%',
              transform: 'translateX(-50%)'
            }}
          >
            HOLD
          </div>

          {/* Right label: EXHALE (vertical) */}
          <div 
            className="absolute text-white tracking-wider flex flex-col"
            style={{ 
              right: padding + 15,
              top: '50%',
              transform: 'translateY(-50%)',
              writingMode: 'vertical-rl',
              textOrientation: 'mixed'
            }}
          >
            EXHALE
          </div>

          {/* Bottom label: HOLD */}
          <div 
            className="absolute text-white tracking-wider text-center"
            style={{ 
              bottom: padding + 15,
              left: '50%',
              transform: 'translateX(-50%)'
            }}
          >
            HOLD
          </div>



          {/* Animated dot - centered on the line */}
          <motion.div
            className="absolute w-3 h-3 rounded-full bg-[#ff0000]"
            style={{
              left: padding,
              top: padding,
              boxShadow: '0 0 10px #ff0000, 0 0 20px #ff0000'
            }}
            animate={{
              x: pos.x,
              y: pos.y,
              scale: dotScale
            }}
            transition={{
              duration: 0,
            }}
          />
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
