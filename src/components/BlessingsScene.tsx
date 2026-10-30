import React from 'react';
import { InvitationData } from '../types/invitation';

interface BlessingsSceneProps {
  invitationData: InvitationData;
  onNext: () => void;
}

export const BlessingsScene: React.FC<BlessingsSceneProps> = ({ invitationData, onNext }) => {
  return (
    <div className="relative w-full h-full min-h-screen flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-gradient-to-b from-[#22040f] via-[#1a040b] to-[#120207]">
      
      {/* Main Container */}
      <div className="relative z-10 max-w-4xl w-full my-auto p-5 sm:p-8 rounded-2xl royal-box text-center border-2 border-[#d4af37] shadow-2xl">
        
        {/* Top Section: Dev & Devi Celestial Artwork */}
        <div className="relative rounded-xl overflow-hidden mb-6 border-2 border-[#d4af37]/80 shadow-[0_0_35px_rgba(212,175,55,0.3)]">
          <img
            src="/assets/aistudio/Dev_fd0553c8.jpg"
            alt="Dev and Devi showering divine blessings"
            className="w-full h-56 sm:h-72 md:h-80 object-cover object-top filter brightness-105"
          />
          {/* Golden Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b040c] via-transparent to-black/30 pointer-events-none" />

          {/* Golden Blessing Banner across bottom of picture */}
          <div className="absolute bottom-3 left-4 right-4 py-2 px-4 rounded-lg bg-black/70 backdrop-blur-md border border-[#d4af37]/60">
            <h2 className="font-rozha text-lg sm:text-2xl text-[#ffd700] tracking-wide">
              ✨ देव एवं देवियों का पावन शुभाशीर्वाद ✨
            </h2>
            <p className="font-cinzel text-[11px] sm:text-xs text-[#fde88a] tracking-widest uppercase">
              Divine Celestial Shower of Eternal Blessings, Health &amp; Prosperity
            </p>
          </div>
        </div>

        {/* Shloka of Elder Reverence */}
        <div className="mb-6">
          <p className="font-devanagari text-xs sm:text-sm text-[#f9e295] italic max-w-xl mx-auto">
            "मातृ देवो भव, पितृ देवो भव, आचार्य देवो भव।"
            <br />
            पूर्वजों एवं वरिष्ठों के चरणों में कोटि-कोटि वंदन, जिनके शुभाशीष से हमारे कुल की बगिया महक रही है।
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-2" />
        </div>

        {/* Middle Section: Grandparents of Both Sides */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 text-left">
          
          {/* Paternal Grandparents (दादा-दादी) */}
          <div className="relative p-5 rounded-xl bg-gradient-to-br from-[#3d091a]/80 to-[#22040e]/90 border border-[#d4af37] shadow-lg hover:border-[#ffd700] transition-colors">
            <div className="flex items-center gap-2 mb-2 text-[#ffd700]">
              <span className="text-xl">🪷</span>
              <h3 className="font-rozha text-lg sm:text-xl text-[#ffd700]">
                दादाजी एवं दादीजी (Paternal)
              </h3>
            </div>
            <p className="text-xs uppercase tracking-wider text-[#f7b2c5] font-cinzel mb-2">
              Paternal Grandparents
            </p>
            <div className="p-3 rounded-lg bg-black/40 border border-[#d4af37]/30">
              <p className="font-devanagari text-base sm:text-lg text-white font-bold mb-1">
                {invitationData.paternalGrandparentsDevanagari}
              </p>
              <p className="text-xs sm:text-sm text-[#fde88a] font-marcellus">
                {invitationData.paternalGrandparentsEnglish}
              </p>
            </div>
            <p className="text-[11px] text-[#fce4ec]/70 font-devanagari mt-2">
              कुल की छत्रछाया एवं संस्कारों के पावन मार्गदर्शक
            </p>
          </div>

          {/* Maternal Grandparents (नाना-नानी) */}
          <div className="relative p-5 rounded-xl bg-gradient-to-br from-[#3d091a]/80 to-[#22040e]/90 border border-[#d4af37] shadow-lg hover:border-[#ffd700] transition-colors">
            <div className="flex items-center gap-2 mb-2 text-[#ffd700]">
              <span className="text-xl">🪷</span>
              <h3 className="font-rozha text-lg sm:text-xl text-[#ffd700]">
                नानाजी एवं नानीजी (Maternal)
              </h3>
            </div>
            <p className="text-xs uppercase tracking-wider text-[#f7b2c5] font-cinzel mb-2">
              Maternal Grandparents
            </p>
            <div className="p-3 rounded-lg bg-black/40 border border-[#d4af37]/30">
              <p className="font-devanagari text-base sm:text-lg text-white font-bold mb-1">
                {invitationData.maternalGrandparentsDevanagari}
              </p>
              <p className="text-xs sm:text-sm text-[#fde88a] font-marcellus">
                {invitationData.maternalGrandparentsEnglish}
              </p>
            </div>
            <p className="text-[11px] text-[#fce4ec]/70 font-devanagari mt-2">
              वात्सल्य और ममता के अगाध सिंधु, ननिहाल पक्ष
            </p>
          </div>
        </div>

        {/* Navigation Action Button */}
        <button
          onClick={onNext}
          className="group inline-flex items-center justify-center gap-3 py-3.5 px-8 rounded-full font-cinzel font-bold text-sm sm:text-base tracking-wider uppercase transition-all duration-300 bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#aa771c] text-[#1a080e] shadow-[0_0_20px_rgba(212,175,55,0.6)] hover:shadow-[0_0_35px_rgba(255,215,0,0.9)] hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span>१४ महास्वप्न दर्शन करें</span>
          <span className="text-lg transition-transform group-hover:translate-x-1">➔</span>
        </button>
      </div>
    </div>
  );
};
