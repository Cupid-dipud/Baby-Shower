import React, { useEffect, useState } from 'react';
import { royalAudio } from '../utils/audioPlayer';

export const SoundTrackPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsub = royalAudio.subscribe(playing => {
      setIsPlaying(playing);
    });
    return unsub;
  }, []);

  const handleToggle = () => {
    royalAudio.toggleMusic();
  };

  return (
    <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
      <button
        onClick={handleToggle}
        title={isPlaying ? 'Pause Royal Music' : 'Play Royal Music'}
        className="group relative flex items-center gap-2.5 py-2 px-3.5 rounded-full bg-[#20040e]/90 border border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:border-[#ffd700] hover:shadow-[0_0_25px_rgba(255,215,0,0.7)] transition-all cursor-pointer backdrop-blur-md active:scale-95"
      >
        {/* Animated Equalizer Wave Bars */}
        <div className="flex items-end gap-1 h-4 w-4">
          <span
            className={`w-0.5 bg-[#ffd700] rounded-full transition-all duration-300 ${
              isPlaying ? 'h-full animate-bounce' : 'h-1.5'
            }`}
          />
          <span
            className={`w-0.5 bg-[#ffd700] rounded-full transition-all duration-300 ${
              isPlaying ? 'h-3/4 animate-pulse' : 'h-2.5'
            }`}
          />
          <span
            className={`w-0.5 bg-[#ffd700] rounded-full transition-all duration-300 ${
              isPlaying ? 'h-full animate-bounce delay-150' : 'h-1'
            }`}
          />
        </div>

        <span className="text-xs font-cinzel tracking-wider text-[#fde88a] font-semibold hidden sm:inline">
          {isPlaying ? 'Royal Raag (Playing)' : 'Play Music 🎵'}
        </span>
      </button>
    </div>
  );
};
