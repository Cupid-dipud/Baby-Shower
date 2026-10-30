import React, { useState } from 'react';
import { royalAudio } from '../utils/audioPlayer';
import { InvitationData } from '../types/invitation';

interface RoyalGateProps {
  invitationData: InvitationData;
  onOpenGate: () => void;
}

export const RoyalGate: React.FC<RoyalGateProps> = ({ invitationData, onOpenGate }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    royalAudio.playGateSound();
    royalAudio.startMusic();

    setTimeout(() => {
      onOpenGate();
    }, 1800);
  };

  return (
    <div className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-[#120308] select-none">
      {/* Background Palace Courtyard (Revealed when gates swing open) */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `linear-gradient(rgba(18, 3, 8, 0.4), rgba(18, 3, 8, 0.6)), url('/assets/aistudio/Feast_8c7e88c7.jpg')`
        }}
      />

      {/* Golden Ambient Stardust Canvas Background */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#260512]/60 to-[#120308]/90 pointer-events-none" />

      {/* 3D Gate Framework */}
      <div className="relative z-10 w-full max-w-4xl h-[85vh] max-h-[820px] mx-4 rounded-2xl overflow-hidden royal-border shadow-2xl flex items-center justify-center gate-perspective bg-[#18040b]">
        
        {/* Full Image Base with Archway and Palace Guards */}
        <img
          src="/assets/aistudio/image_fb35863f_e01c835c.jpg"
          alt="Royal Palace Gate"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none filter brightness-90"
        />

        {/* 3D Splitting Wooden Doors */}
        <div className="absolute inset-0 flex pointer-events-none overflow-hidden">
          {/* Left Door */}
          <div
            className={`w-1/2 h-full bg-cover bg-left gate-door-left ${
              isOpening ? 'open' : ''
            }`}
            style={{
              backgroundImage: `url('/assets/aistudio/image_fb35863f_e01c835c.jpg')`,
              boxShadow: isOpening ? 'none' : 'inset -15px 0 30px rgba(0,0,0,0.85)',
              filter: 'contrast(1.05) brightness(0.92)'
            }}
          >
            {/* Studded Metal Accents & Left Ring Knocker Overlay */}
            <div className="w-full h-full flex items-center justify-end pr-6">
              <div className="w-14 h-14 rounded-full border-2 border-[#d4af37] bg-black/60 shadow-[0_0_15px_#d4af37] flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-4 border-[#b38728] shadow-inner" />
              </div>
            </div>
          </div>

          {/* Right Door */}
          <div
            className={`w-1/2 h-full bg-cover bg-right gate-door-right ${
              isOpening ? 'open' : ''
            }`}
            style={{
              backgroundImage: `url('/assets/aistudio/image_fb35863f_e01c835c.jpg')`,
              boxShadow: isOpening ? 'none' : 'inset 15px 0 30px rgba(0,0,0,0.85)',
              filter: 'contrast(1.05) brightness(0.92)'
            }}
          >
            {/* Right Ring Knocker Overlay */}
            <div className="w-full h-full flex items-center justify-start pl-6">
              <div className="w-14 h-14 rounded-full border-2 border-[#d4af37] bg-black/60 shadow-[0_0_15px_#d4af37] flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-4 border-[#b38728] shadow-inner" />
              </div>
            </div>
          </div>
        </div>

        {/* Center Royal Seal & Tap to Open Card (Fades on Open) */}
        <div
          className={`relative z-30 max-w-md w-11/12 p-8 rounded-2xl text-center royal-box backdrop-blur-md transition-all duration-700 ${
            isOpening ? 'opacity-0 scale-90 translate-y-8 pointer-events-none' : 'opacity-100 scale-100'
          }`}
        >
          {/* Sacred Jain Emblems */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-[#ffd700] text-xl">卐</span>
            <span className="font-rozha text-[#ffd700] text-xl md:text-2xl tracking-wide">
              ॥ श्री जिनेंद्राय नमः ॥
            </span>
            <span className="text-[#ffd700] text-xl">卐</span>
          </div>

          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-4" />

          {/* Royal Title */}
          <h1 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold tracking-wider mb-2 gold-gradient-text uppercase">
            Royal Jain Celebration
          </h1>

          <p className="font-devanagari text-base sm:text-lg text-[#fce4ec] font-semibold mb-1">
            {invitationData.babyShowerTitleDevanagari}
          </p>

          <p className="font-vibes text-2xl sm:text-3xl text-[#ffd700] mb-6">
            An Auspicious Royal Journey
          </p>

          {/* Parents Honour */}
          <div className="bg-[#440c20]/60 rounded-xl p-3 border border-[#d4af37]/40 mb-6">
            <p className="text-xs uppercase tracking-widest text-[#fde88a] font-cinzel mb-1">
              Honouring the Blessed Parents
            </p>
            <p className="font-devanagari text-lg text-white font-bold">
              {invitationData.motherNameDevanagari} &amp; {invitationData.fatherNameDevanagari}
            </p>
          </div>

          {/* Grand Call-to-Action Button */}
          <button
            onClick={handleOpen}
            className="group relative w-full py-3.5 px-6 rounded-full font-cinzel font-bold text-sm sm:text-base tracking-widest uppercase transition-all duration-300 bg-gradient-to-r from-[#b38728] via-[#ffd700] to-[#b38728] text-[#1a080e] shadow-[0_0_25px_rgba(212,175,55,0.7)] hover:shadow-[0_0_40px_rgba(255,215,0,1)] hover:scale-105 active:scale-95 cursor-pointer animate-pulse-gold"
          >
            <span className="flex items-center justify-center gap-2">
              <span>🏰</span>
              <span>Tap to Open Royal Gates</span>
              <span>✨</span>
            </span>
            <span className="block text-[11px] font-devanagari font-normal text-[#2a0510] mt-0.5 tracking-normal">
              (राजसी द्वार खोलें एवं उत्सव में पधारें)
            </span>
          </button>

          <p className="text-[11px] text-[#fce4ec]/70 mt-3 font-marcellus">
            🎵 Tap to enter with auspicious Shehnai &amp; Royal Raag
          </p>
        </div>
      </div>
    </div>
  );
};
