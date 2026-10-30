import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { FOURTEEN_SWAPANA } from '../data/swapanaData';
import { Swapana, InvitationData } from '../types/invitation';
import { royalAudio } from '../utils/audioPlayer';

interface SwapanaSceneProps {
  invitationData: InvitationData;
  onNext: () => void;
}

export const SwapanaScene: React.FC<SwapanaSceneProps> = ({ invitationData, onNext }) => {
  const [selectedSwapana, setSelectedSwapana] = useState<Swapana | null>(null);
  const [blessingCount, setBlessingCount] = useState<number>(1248);
  const [hasBlessed, setHasBlessed] = useState<boolean>(false);

  // Trigger grand rose petals & golden flower shower
  const handleShowerBlessings = () => {
    setBlessingCount(prev => prev + 1);
    setHasBlessed(true);
    royalAudio.playBlessingChime();

    // Fire custom petal and gold confetti burst
    const count = 45;
    const defaults = {
      origin: { y: 0.2 },
      disableForReducedMotion: true
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    // Rose petals & gold flakes colors
    const colors = ['#d84a72', '#f48fb1', '#fce4ec', '#ffd700', '#d4af37', '#ffffff'];

    fire(0.35, {
      spread: 70,
      startVelocity: 35,
      colors,
      shapes: ['circle', 'square']
    });
    fire(0.25, {
      spread: 90,
      colors
    });
    fire(0.4, {
      spread: 120,
      decay: 0.91,
      scalar: 1.2,
      colors
    });
  };

  const openSwapanaModal = (swapana: Swapana) => {
    setSelectedSwapana(swapana);
    royalAudio.playBlessingChime();
  };

  return (
    <div className="relative w-full h-full min-h-screen flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-gradient-to-b from-[#2b0716] via-[#1a040d] to-[#120208]">
      
      {/* Background Subtle Sparkle Field */}
      <div className="absolute inset-0 bg-radial from-[#d84a72]/15 via-transparent to-transparent pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-4xl w-full my-auto py-6 px-3 sm:px-8 rounded-2xl royal-box text-center border-2 border-[#d4af37]">
        
        {/* Header Title */}
        <div className="mb-2">
          <p className="font-cinzel text-xs sm:text-sm tracking-widest text-[#fde88a] uppercase">
            Auspicious Vision of Mother Trishala
          </p>
          <h2 className="font-rozha text-2xl sm:text-3xl md:text-4xl text-[#ffd700] mb-1">
            १४ दिव्य महास्वप्न दर्शन
          </h2>
          <p className="font-devanagari text-xs sm:text-sm text-[#fce4ec]/80">
            प्रत्येक पावन स्वप्न पर स्पर्श कर उसका आध्यात्मिक रहस्य जानें
          </p>
        </div>

        {/* 14 Swapana Universe & Mother Portrait Center */}
        <div className="relative w-full max-w-[460px] h-[460px] sm:max-w-[500px] sm:h-[500px] mx-auto my-4 flex items-center justify-center">
          
          {/* Subtle Rotating Celestial Zodiac/Swapana Orbit Rings */}
          <div className="absolute inset-4 sm:inset-6 rounded-full border border-dashed border-[#d4af37]/30 animate-spin-slow pointer-events-none" />
          <div className="absolute inset-14 sm:inset-16 rounded-full border border-[#d84a72]/20 pointer-events-none" />

          {/* Central Mother's Shadow Portrait with swing & baby */}
          <div className="relative z-20 w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden royal-border shadow-[0_0_35px_rgba(216,74,114,0.6)] group">
            <img
              src="/assets/aistudio/mother_8986b092.jpg"
              alt="Shadow Portrait of Mother on Swing with Baby"
              className="w-full h-full object-cover filter brightness-105"
            />
            {/* Scrim with Mother's Name in Devanagari */}
            <div className="absolute inset-x-0 bottom-0 pt-6 pb-2.5 px-2 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-center">
              <span className="text-[10px] uppercase font-cinzel text-[#ffd700] tracking-wider block">
                माता
              </span>
              <span className="font-rozha text-sm sm:text-base text-white font-bold block truncate">
                {invitationData.motherNameDevanagari}
              </span>
            </div>
          </div>

          {/* 14 Encircling Swapana Icons placed in 360-degree circle */}
          {FOURTEEN_SWAPANA.map((item, index) => {
            const angle = (index * (360 / 14) - 90) * (Math.PI / 180);
            // Responsive radius for mobile vs tablet/desktop
            const r = typeof window !== 'undefined' && window.innerWidth < 450 ? 165 : 200;
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;

            return (
              <button
                key={item.id}
                onClick={() => openSwapanaModal(item)}
                title={`${item.nameDevanagari} - Click to see meaning`}
                className="absolute z-30 w-11 h-11 sm:w-12 sm:h-12 -ml-5 sm:-ml-6 -mt-5 sm:-mt-6 rounded-full bg-gradient-to-b from-[#fde88a] via-[#d4af37] to-[#aa771c] text-[#1a080e] font-bold text-xs sm:text-sm flex flex-col items-center justify-center shadow-[0_0_12px_rgba(212,175,55,0.7)] hover:shadow-[0_0_25px_rgba(255,215,0,1)] hover:scale-125 transition-all duration-300 cursor-pointer active:scale-95 group"
                style={{
                  transform: `translate(${x}px, ${y}px)`
                }}
              >
                <span className="text-base sm:text-lg leading-none">{item.symbol}</span>
                <span className="text-[9px] font-mono font-bold leading-none -mt-0.5 text-[#1b040c]">
                  {item.id}
                </span>

                {/* Quick Tooltip on Hover */}
                <span className="hidden sm:group-hover:block absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/90 text-[#fde88a] text-[10px] font-devanagari py-0.5 px-2 rounded border border-[#d4af37]/60 z-50 pointer-events-none">
                  {item.nameDevanagari.split(' ')[1] || item.nameDevanagari}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Shower Blessings Button & Counter */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4 mb-6">
          <button
            onClick={handleShowerBlessings}
            className="group py-3 px-8 rounded-full font-devanagari font-bold text-sm sm:text-base text-white bg-gradient-to-r from-[#d84a72] via-[#e91e63] to-[#880e4f] shadow-[0_0_20px_rgba(233,30,99,0.7)] hover:shadow-[0_0_35px_rgba(244,143,177,1)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center gap-2 border border-[#f8bbd0]/50"
          >
            <span className="text-xl animate-bounce">🌸</span>
            <span>माता पर पुष्प वर्षा करें (Shower Blessings)</span>
            <span className="text-xl">✨</span>
          </button>

          <div className="py-2 px-4 rounded-full bg-[#1b040c] border border-[#d4af37]/40 text-xs text-[#fde88a] font-devanagari">
            {hasBlessed ? '🎉 आशीर्वाद अर्पित! ' : '🙏 '}
            <strong>{blessingCount.toLocaleString('hi-IN')}</strong> मंगल आशीर्वाद अर्पित
          </div>
        </div>

        {/* Next Scene Button */}
        <div>
          <button
            onClick={onNext}
            className="group inline-flex items-center justify-center gap-3 py-3 px-8 rounded-full font-cinzel font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#aa771c] text-[#1a080e] shadow-[0_0_15px_rgba(212,175,55,0.5)] hover:shadow-[0_0_25px_rgba(255,215,0,0.8)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>शाही प्रीतिभोज एवं कार्यक्रम विवरण</span>
            <span className="text-base transition-transform group-hover:translate-x-1">➔</span>
          </button>
        </div>
      </div>

      {/* Swapana Meaning Modal */}
      {selectedSwapana && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedSwapana(null)}
        >
          <div
            className="relative max-w-md w-full p-6 rounded-2xl royal-box text-center border-2 border-[#ffd700] shadow-[0_0_40px_rgba(212,175,55,0.6)]"
            onClick={e => e.stopPropagation()}
          >
            {/* Symbol & Number */}
            <div className="w-16 h-16 rounded-full mx-auto mb-3 bg-gradient-to-b from-[#fde88a] to-[#b38728] flex items-center justify-center text-3xl shadow-lg">
              {selectedSwapana.symbol}
            </div>

            <h3 className="font-rozha text-xl sm:text-2xl text-[#ffd700] mb-0.5">
              {selectedSwapana.nameDevanagari}
            </h3>
            <p className="font-cinzel text-xs text-[#f7b2c5] tracking-wider uppercase mb-3">
              {selectedSwapana.nameEnglish}
            </p>

            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-4" />

            <div className="text-left bg-black/40 rounded-xl p-4 border border-[#d4af37]/30 mb-4 space-y-3 font-devanagari text-xs sm:text-sm leading-relaxed text-[#fce4ec]">
              <div>
                <span className="text-[#ffd700] font-bold block mb-0.5">
                  ✦ पावन स्वरूप एवं अर्थ:
                </span>
                <p>{selectedSwapana.detailedMeaning}</p>
              </div>

              <div>
                <span className="text-[#ffd700] font-bold block mb-0.5">
                  ✦ आध्यात्मिक प्रभाव:
                </span>
                <p className="text-[#f9e295]">{selectedSwapana.spiritualSignificance}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedSwapana(null)}
              className="py-2 px-6 rounded-full font-cinzel text-xs uppercase tracking-wider font-bold bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-[#1a080e] hover:brightness-110 active:scale-95 cursor-pointer shadow-md"
            >
              पूर्ण दर्शन (Close)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
