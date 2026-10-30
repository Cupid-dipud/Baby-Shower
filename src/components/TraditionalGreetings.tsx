import React from 'react';
import { InvitationData } from '../types/invitation';

interface TraditionalGreetingsProps {
  invitationData: InvitationData;
  onNext: () => void;
}

export const TraditionalGreetings: React.FC<TraditionalGreetingsProps> = ({
  invitationData,
  onNext
}) => {
  return (
    <div className="relative w-full h-full min-h-screen flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-gradient-to-b from-[#260512] via-[#1a040b] to-[#120207]">
      {/* Background Palace Illumination */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
        style={{ backgroundImage: `url('/assets/aistudio/Feast_8c7e88c7.jpg')` }}
      />

      {/* Decorative Traditional Toran Frame at Top */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#d4af37]/30 to-transparent flex items-center justify-center gap-4 text-[#ffd700] text-sm pointer-events-none">
        <span>🪷</span>
        <span>•</span>
        <span>ॐ</span>
        <span>•</span>
        <span>卐</span>
        <span>•</span>
        <span>🌸</span>
        <span>•</span>
        <span>卐</span>
        <span>•</span>
        <span>ॐ</span>
        <span>•</span>
        <span>🪷</span>
      </div>

      {/* Main Regal Invitation Card */}
      <div className="relative z-10 max-w-2xl w-full my-auto p-6 sm:p-10 rounded-2xl royal-box text-center border-2 border-[#d4af37] shadow-[0_0_50px_rgba(216,74,114,0.35)] animate-float">
        
        {/* Sacred Jain Auspicious Invocation */}
        <div className="mb-4">
          <p className="font-rozha text-2xl sm:text-3xl text-[#ffd700] tracking-wider mb-1">
            ॥ ॐ अर्हं नमः ॥
          </p>
          <p className="font-devanagari text-xs sm:text-sm text-[#fde88a] font-medium max-w-lg mx-auto leading-relaxed">
            मंगलम् भगवान् वीरो, मंगलम् गौतमो गणी।
            <br />
            मंगलम् कुन्दकुन्दाद्यो, जैन धर्मोऽस्तु मंगलम्॥
          </p>
        </div>

        <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-6" />

        {/* Traditional Welcome Line */}
        <p className="font-cinzel text-xs sm:text-sm tracking-widest uppercase text-[#f7b2c5] mb-2">
          Cordially Inviting You To The Sacred
        </p>

        <h1 className="font-rozha text-2xl sm:text-3xl md:text-4xl text-[#ffd700] mb-2 leading-tight">
          {invitationData.babyShowerTitleDevanagari}
        </h1>

        <p className="font-vibes text-2xl sm:text-3xl text-[#fde88a] mb-6">
          {invitationData.babyShowerTitleEnglish}
        </p>

        {/* Sacred Invitation Message */}
        <div className="bg-[#4a0d23]/50 rounded-xl p-5 border border-[#d4af37]/30 mb-6 text-sm sm:text-base leading-relaxed text-[#fce4ec] font-devanagari text-justify sm:text-center">
          <p className="mb-3">
            परम पूज्य तीर्थंकर भगवानों एवं गुरुजनों के पावन अनुकंपा से, हमारे परिवार में नवीन शिशु के शुभागमन की पावन बेला में 
            <strong> ‘श्रीमंत संस्कार / गोद भराई’ </strong> के मांगलिक प्रसंग पर आप सभी स्नेही स्वजनों का सपरिवार हार्दिक स्वागत एवं अभिनंदन है।
          </p>
          <p className="text-xs sm:text-sm text-[#f9e295] italic">
            "With the divine grace of the Tirthankaras and the loving blessings of our respected elders, we invite you to grace this sacred celebration of maternity and auspicious beginnings."
          </p>
        </div>

        {/* Blessed Couple Highlight */}
        <div className="py-4 px-6 rounded-xl bg-gradient-to-r from-[#3b0818] via-[#590e28] to-[#3b0818] border border-[#d4af37] mb-8 shadow-md">
          <p className="text-xs uppercase tracking-widest text-[#fde88a] font-cinzel mb-1">
            The Expecting Mother &amp; Father
          </p>
          <h2 className="font-rozha text-xl sm:text-2xl text-[#ffd700] font-bold">
            {invitationData.motherNameDevanagari} &amp; {invitationData.fatherNameDevanagari}
          </h2>
          <p className="font-marcellus text-sm text-[#fce4ec] mt-1">
            ({invitationData.motherNameEnglish} &amp; {invitationData.fatherNameEnglish})
          </p>
        </div>

        {/* Next Scene Button */}
        <button
          onClick={onNext}
          className="group inline-flex items-center justify-center gap-3 py-3.5 px-8 rounded-full font-cinzel font-bold text-sm sm:text-base tracking-wider uppercase transition-all duration-300 bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#aa771c] text-[#1a080e] shadow-[0_0_20px_rgba(212,175,55,0.6)] hover:shadow-[0_0_35px_rgba(255,215,0,0.9)] hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span>देव-देवी आशीर्वाद एवं पूर्वज वंदन</span>
          <span className="text-lg transition-transform group-hover:translate-x-1">➔</span>
        </button>
      </div>
    </div>
  );
};
