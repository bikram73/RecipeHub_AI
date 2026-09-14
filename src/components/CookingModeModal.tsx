import React, { useState, useEffect, useRef } from 'react';
import { Recipe } from '../types';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  ListOrdered,
  ChefHat
} from 'lucide-react';

interface CookingModeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
}

export const CookingModeModal: React.FC<CookingModeModalProps> = ({
  recipe,
  onClose,
}) => {
  if (!recipe) return null;

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [showIngredientsDrawer, setShowIngredientsDrawer] = useState<boolean>(false);
  const [speechEnabled, setSpeechEnabled] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Timer state for current step
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const timerIntervalRef = useRef<any>(null);

  const currentStep = recipe.steps[currentStepIndex];
  const progressPercent = ((currentStepIndex + 1) / recipe.steps.length) * 100;

  // Initialize timer when step changes
  useEffect(() => {
    if (currentStep?.timerMinutes) {
      setTimerSecondsLeft(currentStep.timerMinutes * 60);
      setIsTimerRunning(false);
    } else {
      setTimerSecondsLeft(0);
      setIsTimerRunning(false);
    }
  }, [currentStepIndex, currentStep]);

  // Handle countdown timer tick
  useEffect(() => {
    if (isTimerRunning && timerSecondsLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimerSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current);
            setIsTimerRunning(false);
            // Play gentle chime simulation via browser Web Audio API
            try {
              const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.type = 'sine';
              osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
              osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15); // A5
              gain.gain.setValueAtTime(0.3, ctx.currentTime);
              gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.start();
              osc.stop(ctx.currentTime + 1.2);
            } catch (e) {
              // Ignore audio errors
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isTimerRunning, timerSecondsLeft]);

  // Speech synthesis toggle
  const speakCurrentStep = () => {
    if ('speechSynthesis' in window && currentStep) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`Step ${currentStep.stepNumber}. ${currentStep.instruction}`);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
      setSpeechEnabled(true);
    }
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeechEnabled(false);
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < recipe.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNextStep();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevStep();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStepIndex, recipe.steps.length]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950 text-white flex flex-col justify-between select-none">
      
      {/* Top Header Bar with Progress */}
      <div className="w-full">
        {/* Step Progress Line */}
        <div className="w-full h-1.5 bg-stone-800">
          <div 
            className="h-full bg-amber-500 transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-sm">
              <ChefHat className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white line-clamp-1">{recipe.title}</h3>
              <span className="text-xs text-stone-400">
                Step {currentStepIndex + 1} of {recipe.steps.length}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="speech-toggle-btn"
              onClick={speechEnabled ? stopSpeech : speakCurrentStep}
              className={`p-2.5 rounded-xl border transition-all ${
                speechEnabled 
                  ? 'bg-amber-500 text-stone-950 border-amber-400' 
                  : 'bg-stone-900 border-stone-800 text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
              title={speechEnabled ? 'Mute voice' : 'Read step aloud'}
            >
              {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              id="toggle-ingredients-drawer-btn"
              onClick={() => setShowIngredientsDrawer(!showIngredientsDrawer)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 hover:bg-stone-800 text-stone-300 hover:text-white text-xs font-semibold transition-all"
            >
              <ListOrdered className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Ingredients</span>
            </button>

            <button
              id="exit-cooking-mode-btn"
              onClick={onClose}
              className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 hover:bg-stone-800 text-stone-400 hover:text-white transition-all"
              title="Exit cooking mode (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Focus Canvas */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-6 max-w-4xl mx-auto w-full">
        {isCompleted ? (
          /* Completion Screen */
          <div className="text-center space-y-6 max-w-md animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-2xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-white mb-2">Bon Appétit!</h2>
              <p className="text-stone-400 text-sm">
                You've successfully prepared <strong className="text-amber-400">{recipe.title}</strong>. Time to plate, garnish, and enjoy!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 text-left space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Chef's Plating Suggestion</span>
              <p className="text-xs text-stone-300 leading-relaxed">
                Garnish with fresh microgreens and cracked pepper. Pair with {recipe.winePairing || 'your favorite chilled beverage'}.
              </p>
            </div>

            <button
              id="finish-cooking-btn"
              onClick={onClose}
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-lg shadow-amber-500/30 transition-all"
            >
              Done & Return to Recipe
            </button>
          </div>
        ) : (
          /* Step Instruction Card */
          <div className="w-full space-y-8 animate-fade-in">
            {/* Step Counter Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900 border border-stone-800 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <span>Step {currentStep.stepNumber}</span>
              <span className="text-stone-600">•</span>
              <span className="text-stone-400">Total {recipe.steps.length} Steps</span>
            </div>

            {/* Instruction Text with Large Contrast Typography */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white leading-relaxed tracking-tight">
              {currentStep.instruction}
            </h2>

            {/* Chef Tip Callout */}
            {currentStep.tip && (
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm sm:text-base flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-300 font-bold">Chef Tip: </strong>
                  <span>{currentStep.tip}</span>
                </div>
              </div>
            )}

            {/* Active Countdown Timer */}
            {currentStep.timerMinutes && (
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-3xl sm:text-4xl font-mono font-bold text-amber-400 tracking-wider">
                    {formatTime(timerSecondsLeft)}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-wide block">Step Timer</span>
                    <span className="text-xs text-stone-500">{currentStep.timerMinutes} min recommended</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    id="timer-play-pause-btn"
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                      isTimerRunning
                        ? 'bg-rose-500 hover:bg-rose-600 text-white'
                        : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
                    }`}
                  >
                    {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-stone-950" />}
                    <span>{isTimerRunning ? 'Pause' : 'Start Timer'}</span>
                  </button>

                  <button
                    id="timer-reset-btn"
                    onClick={() => {
                      setIsTimerRunning(false);
                      setTimerSecondsLeft(currentStep.timerMinutes! * 60);
                    }}
                    className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-all"
                    title="Reset timer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Side Slide-out Drawer for Ingredients Peek */}
      {showIngredientsDrawer && (
        <div className="fixed inset-y-0 right-0 w-80 max-w-full bg-stone-900 border-l border-stone-800 p-6 z-50 overflow-y-auto shadow-2xl animate-slide-in">
          <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-4">
            <h4 className="font-bold text-white text-base">Recipe Ingredients</h4>
            <button
              onClick={() => setShowIngredientsDrawer(false)}
              className="p-1 rounded-lg text-stone-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2.5">
            {recipe.ingredients.map((ing) => (
              <div key={ing.id} className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-stone-850 border border-stone-800">
                <span className="text-stone-300 font-medium">{ing.name}</span>
                <span className="text-amber-400 font-bold">{ing.amount} {ing.unit}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Control Bar */}
      {!isCompleted && (
        <div className="bg-stone-900/90 border-t border-stone-800 py-4 px-4 sm:px-8">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            <button
              id="prev-step-btn"
              onClick={handlePrevStep}
              disabled={currentStepIndex === 0}
              className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                currentStepIndex === 0
                  ? 'opacity-40 cursor-not-allowed bg-stone-800 text-stone-500'
                  : 'bg-stone-800 hover:bg-stone-700 text-white active:scale-95'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Step</span>
            </button>

            <div className="hidden sm:block text-xs text-stone-500 font-medium">
              Use <kbd className="px-1.5 py-0.5 rounded bg-stone-800 text-stone-300 font-mono">Space</kbd> or arrow keys to navigate
            </div>

            <button
              id="next-step-btn"
              onClick={handleNextStep}
              className="flex items-center gap-2 px-6 sm:px-8 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 transition-all active:scale-95"
            >
              <span>{currentStepIndex === recipe.steps.length - 1 ? 'Complete Cooking' : 'Next Step'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
