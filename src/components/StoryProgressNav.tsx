import React from 'react';

interface StoryProgressNavProps {
  currentScene: number;
  totalScenes: number;
  onSelectScene: (scene: number) => void;
}

const SCENE_NAMES = [
  { id: 1, nameDev: 'द्वार', nameEng: 'Gates' },
  { id: 2, nameDev: 'स्वागत', nameEng: 'Welcome' },
  { id: 3, nameDev: 'आशीर्वाद', nameEng: 'Blessings' },
  { id: 4, nameDev: '१४ स्वप्न', nameEng: '14 Dreams' },
  { id: 5, nameDev: 'प्रीतिभोज', nameEng: 'Feast' },
  { id: 6, nameDev: 'स्वजन', nameEng: 'Family' },
  { id: 7, nameDev: 'शुभ वेला', nameEng: 'Countdown' }
];

export const StoryProgressNav: React.FC<StoryProgressNavProps> = ({
  currentScene,
  onSelectScene
}) => {
  return (
    <aside 
      aria-label="Story Chapter Navigation"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 sm:gap-2.5 py-1.5 px-3 sm:px-4 rounded-full bg-[#1b040c]/90 border border-[#d4af37]/60 shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-md"
    >
      {SCENE_NAMES.map(scene => {
        const isActive = currentScene === scene.id;
        return (
          <button
            key={scene.id}
            onClick={() => onSelectScene(scene.id)}
            aria-label={`Jump to Chapter ${scene.id}: ${scene.nameDev} (${scene.nameEng})`}
            title={`Chapter ${scene.id}: ${scene.nameDev} (${scene.nameEng})`}
            className={`group relative flex items-center justify-center transition-all duration-300 cursor-pointer ${
              isActive
                ? 'py-1 px-2.5 sm:px-3 bg-gradient-to-r from-[#d4af37] to-[#ffd700] text-[#1a080e] rounded-full shadow-[0_0_12px_#ffd700]'
                : 'w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#3b0818] border border-[#d4af37]/40 text-[#fce4ec] hover:border-[#ffd700]'
            }`}
          >
            {isActive ? (
              <span className="flex items-center gap-1 text-[11px] sm:text-xs font-devanagari font-bold whitespace-nowrap">
                <span>✦</span>
                <span>{scene.nameDev}</span>
              </span>
            ) : (
              <span className="text-[10px] sm:text-xs font-mono font-bold text-[#fde88a]/80 group-hover:text-white">
                {scene.id}
              </span>
            )}
          </button>
        );
      })}
    </aside>
  );
};
