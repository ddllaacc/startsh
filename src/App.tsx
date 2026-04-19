import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Welcome } from './components/Welcome';
import { PickTeam } from './components/PickTeam';
import { HotTake } from './components/HotTake';
import { FillInBlank } from './components/FillInBlank';
import { ShareSummary } from './components/ShareSummary';
import { Thanks } from './components/Thanks';
import { BoxBreathing } from './components/BoxBreathing';
import { Toaster } from './components/ui/toaster';
import { Calendar } from './components/ui/calendar';
import { getDailyChallengeForDate } from './utils/dailyData';
import poopEmoji from 'figma:asset/7114f84555e2e50e87b69cc8f921755e7a5edab9.png';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [team, setTeam] = useState<string | null>(null);
  const [hotTake, setHotTake] = useState<'AGREE' | 'DISAGREE' | null>(null);
  const [completionTime, setCompletionTime] = useState<number | 'fail'>(0);
  const [isDebugMode, setIsDebugMode] = useState(() => {
    return localStorage.getItem('startsh_debug_mode') === 'true';
  });
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  // Get daily challenge data for selected date
  const dailyChallenge = useMemo(() => {
    return getDailyChallengeForDate(selectedDate);
  }, [selectedDate]);

  // Configure PWA meta tags and icons
  useEffect(() => {
    // Set theme color to black
    let themeColor = document.querySelector('meta[name="theme-color"]');
    if (!themeColor) {
      themeColor = document.createElement('meta');
      themeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(themeColor);
    }
    themeColor.setAttribute('content', '#000000');

    // Set viewport meta tag with proper config
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      document.head.appendChild(viewport);
    }
    viewport.setAttribute('content', 'width=device-width, initial-scale=1, viewport-fit=cover');

    // Set iOS status bar style to black
    let statusBarStyle = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    if (!statusBarStyle) {
      statusBarStyle = document.createElement('meta');
      statusBarStyle.setAttribute('name', 'apple-mobile-web-app-status-bar-style');
      document.head.appendChild(statusBarStyle);
    }
    statusBarStyle.setAttribute('content', 'black');

    // Enable standalone mode
    let capable = document.querySelector('meta[name="apple-mobile-web-app-capable"]');
    if (!capable) {
      capable = document.createElement('meta');
      capable.setAttribute('name', 'apple-mobile-web-app-capable');
      document.head.appendChild(capable);
    }
    capable.setAttribute('content', 'yes');

    // Set apple touch icon using the poop emoji image
    let appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]');
    if (!appleTouchIcon) {
      appleTouchIcon = document.createElement('link');
      appleTouchIcon.setAttribute('rel', 'apple-touch-icon');
      document.head.appendChild(appleTouchIcon);
    }
    appleTouchIcon.setAttribute('href', poopEmoji);

    // Set regular favicon
    let favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.setAttribute('rel', 'icon');
      document.head.appendChild(favicon);
    }
    favicon.setAttribute('href', poopEmoji);

    // Set app title
    document.title = 'startsh daily';

    // Force status bar color by setting body background immediately
    document.body.style.backgroundColor = '#000000';
  }, []);

  const enableDebugMode = () => {
    setIsDebugMode(true);
    localStorage.setItem('startsh_debug_mode', 'true');
  };

  const disableDebugMode = () => {
    setIsDebugMode(false);
    localStorage.removeItem('startsh_debug_mode');
  };

  const handleDatePrevious = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const handleDateNext = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const handleDateClick = () => {
    setShowCalendar(true);
  };

  const navigateToScreen = (screenIndex: number) => {
    setCurrentScreen(screenIndex);
  };

  const navigateBack = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const navigateForward = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const handleNavigateHome = () => {
    setCurrentScreen(0);
  };

  const handleWelcomeStart = () => {
    if (isDebugMode) {
      setCurrentScreen(1);
    } else {
      setTimeout(() => setCurrentScreen(1), 300);
    }
  };

  const handleTeamSelect = (selectedTeam: string) => {
    setTeam(selectedTeam);
    if (isDebugMode) {
      setCurrentScreen(2);
    } else {
      setTimeout(() => setCurrentScreen(2), 300);
    }
  };

  const handleHotTakeSelect = (selection: 'AGREE' | 'DISAGREE') => {
    setHotTake(selection);
    if (isDebugMode) {
      setCurrentScreen(3);
    } else {
      setTimeout(() => setCurrentScreen(3), 300);
    }
  };

  const handleFillInBlankComplete = (time: number) => {
    setCompletionTime(time);
    if (isDebugMode) {
      setCurrentScreen(4);
    } else {
      setTimeout(() => setCurrentScreen(4), 300);
    }
  };

  const handleShareComplete = () => {
    if (!isDebugMode) {
      setTimeout(() => setCurrentScreen(5), 300);
    }
  };

  const handleThanksComplete = () => {
    if (!isDebugMode) {
      setTimeout(() => setCurrentScreen(6), 300);
    }
  };

  const goToBoxBreathing = () => {
    setCurrentScreen(6);
  };

  const screens = [
    <Welcome 
      onStart={handleWelcomeStart} 
      onTerminalClick={goToBoxBreathing}
      isDebugMode={isDebugMode}
      onEnableDebugMode={enableDebugMode}
      onDisableDebugMode={disableDebugMode}
      selectedDate={selectedDate}
      onDateChange={setSelectedDate}
      onDatePrevious={handleDatePrevious}
      onDateNext={handleDateNext}
      onDateClick={handleDateClick}
      showCalendar={showCalendar}
      onCloseCalendar={() => setShowCalendar(false)}
    />,
    <PickTeam 
      onSelect={handleTeamSelect} 
      selectedTeam={team}
      team1={dailyChallenge?.teams.team1 || 'Team 1'}
      team2={dailyChallenge?.teams.team2 || 'Team 2'}
      onNavigateHome={handleNavigateHome} 
      onTerminalClick={goToBoxBreathing}
      isDebugMode={isDebugMode}
      onNavigateBack={navigateBack}
      onNavigateForward={navigateForward}
      selectedDate={selectedDate}
      onDatePrevious={handleDatePrevious}
      onDateNext={handleDateNext}
      onDateClick={handleDateClick}
    />,
    <HotTake 
      onSelect={handleHotTakeSelect} 
      selectedTake={hotTake}
      hotTakeText={dailyChallenge?.hotTake || 'No challenge available'}
      onNavigateHome={handleNavigateHome} 
      onTerminalClick={goToBoxBreathing}
      isDebugMode={isDebugMode}
      onNavigateBack={navigateBack}
      onNavigateForward={navigateForward}
      selectedDate={selectedDate}
      onDatePrevious={handleDatePrevious}
      onDateNext={handleDateNext}
      onDateClick={handleDateClick}
    />,
    <FillInBlank 
      onComplete={handleFillInBlankComplete}
      category={dailyChallenge?.puzzle.category || 'Puzzle'}
      answer={dailyChallenge?.puzzle.answer || ''}
      puzzle={dailyChallenge?.puzzle.puzzle || ''}
      onNavigateHome={handleNavigateHome} 
      onTerminalClick={goToBoxBreathing}
      isDebugMode={isDebugMode}
      onNavigateBack={navigateBack}
      onNavigateForward={navigateForward}
      selectedDate={selectedDate}
      onDatePrevious={handleDatePrevious}
      onDateNext={handleDateNext}
      onDateClick={handleDateClick}
    />,
    <ShareSummary 
      team={team!} 
      hotTake={hotTake!} 
      completionTime={completionTime} 
      onComplete={handleShareComplete} 
      onNavigateHome={handleNavigateHome} 
      onTerminalClick={goToBoxBreathing}
      isDebugMode={isDebugMode}
      onNavigateBack={navigateBack}
      onNavigateForward={navigateForward}
      selectedDate={selectedDate}
      onDatePrevious={handleDatePrevious}
      onDateNext={handleDateNext}
      onDateClick={handleDateClick}
    />,
    <Thanks 
      onComplete={handleThanksComplete} 
      onNavigateHome={handleNavigateHome} 
      onTerminalClick={goToBoxBreathing}
      isDebugMode={isDebugMode}
      onNavigateBack={navigateBack}
      onNavigateForward={navigateForward}
      selectedDate={selectedDate}
      onDatePrevious={handleDatePrevious}
      onDateNext={handleDateNext}
      onDateClick={handleDateClick}
    />,
    <BoxBreathing 
      onNavigateHome={handleNavigateHome} 
      onTerminalClick={goToBoxBreathing}
      isDebugMode={isDebugMode}
      onNavigateBack={navigateBack}
      onNavigateForward={navigateForward}
      selectedDate={selectedDate}
      onDatePrevious={handleDatePrevious}
      onDateNext={handleDateNext}
      onDateClick={handleDateClick}
    />
  ];

  return (
    <>
      <div className="h-screen bg-black overflow-hidden">
        <div className="w-full max-w-sm mx-auto h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {screens[currentScreen]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <Toaster />
      
      {/* Global Calendar Picker Modal */}
      <AnimatePresence>
        {showCalendar && (
          <>
            {/* Dark veil overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-[100]"
              onClick={() => setShowCalendar(false)}
            />
            
            {/* Calendar Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 flex items-center justify-center z-[101] px-4"
            >
              <div className="bg-black border-4 border-[#ff0000] p-6">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    if (date) {
                      setSelectedDate(date);
                      setShowCalendar(false);
                    }
                  }}
                  className="text-white"
                />
                <button
                  onClick={() => setShowCalendar(false)}
                  className="w-full mt-4 border-2 border-white bg-black p-3 text-white tracking-wider transition-all hover:bg-white hover:text-black active:scale-95"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
