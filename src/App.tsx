import React, { useState, useEffect } from 'react';
import { RoyalGate } from './components/RoyalGate';
import { TraditionalGreetings } from './components/TraditionalGreetings';
import { BlessingsScene } from './components/BlessingsScene';
import { SwapanaScene } from './components/SwapanaScene';
import { FeastScene } from './components/FeastScene';
import { FamilyScene } from './components/FamilyScene';
import { CountdownScene } from './components/CountdownScene';
import { SoundTrackPlayer } from './components/SoundTrackPlayer';
import { StoryProgressNav } from './components/StoryProgressNav';
import { InvitationEditor } from './components/InvitationEditor';
import { DEFAULT_INVITATION } from './data/swapanaData';
import { InvitationData } from './types/invitation';

export default function App() {
  const [currentScene, setCurrentScene] = useState<number>(1);
  const [invitationData, setInvitationData] = useState<InvitationData>(() => {
    try {
      const saved = localStorage.getItem('royal_jain_invitation_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {}
    return DEFAULT_INVITATION;
  });

  // Save customized details to localStorage
  const handleSaveData = (newData: InvitationData) => {
    setInvitationData(newData);
    try {
      localStorage.setItem('royal_jain_invitation_v1', JSON.stringify(newData));
    } catch (e) {}
  };

  const handleResetData = () => {
    setInvitationData(DEFAULT_INVITATION);
    try {
      localStorage.removeItem('royal_jain_invitation_v1');
    } catch (e) {}
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        setCurrentScene(prev => Math.min(prev + 1, 7));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setCurrentScene(prev => Math.max(prev - 1, 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Smooth scroll to top when scene changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScene]);

  return (
    <div className="relative min-h-screen w-full bg-[#140409] text-[#fce4ec] overflow-x-hidden font-sans">
      
      {/* Floating Audio Controller */}
      <SoundTrackPlayer />

      {/* Floating Personalize Invitation Drawer */}
      <InvitationEditor
        data={invitationData}
        onSave={handleSaveData}
        onReset={handleResetData}
      />

      {/* Royal Chapter Story Navigator (Replaces clumsy prev/next buttons) */}
      <StoryProgressNav
        currentScene={currentScene}
        totalScenes={7}
        onSelectScene={scene => setCurrentScene(scene)}
      />

      {/* Render Current Scene with Majestic Transitions */}
      <main className="w-full min-h-screen">
        {currentScene === 1 && (
          <RoyalGate
            invitationData={invitationData}
            onOpenGate={() => setCurrentScene(2)}
          />
        )}

        {currentScene === 2 && (
          <TraditionalGreetings
            invitationData={invitationData}
            onNext={() => setCurrentScene(3)}
          />
        )}

        {currentScene === 3 && (
          <BlessingsScene
            invitationData={invitationData}
            onNext={() => setCurrentScene(4)}
          />
        )}

        {currentScene === 4 && (
          <SwapanaScene
            invitationData={invitationData}
            onNext={() => setCurrentScene(5)}
          />
        )}

        {currentScene === 5 && (
          <FeastScene
            invitationData={invitationData}
            onNext={() => setCurrentScene(6)}
          />
        )}

        {currentScene === 6 && (
          <FamilyScene
            invitationData={invitationData}
            onNext={() => setCurrentScene(7)}
          />
        )}

        {currentScene === 7 && (
          <CountdownScene
            invitationData={invitationData}
            onRestart={() => setCurrentScene(1)}
          />
        )}
      </main>
    </div>
  );
}
