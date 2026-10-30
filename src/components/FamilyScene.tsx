import React from 'react';
import { InvitationData } from '../types/invitation';

interface FamilySceneProps {
  invitationData: InvitationData;
  onNext: () => void;
}

export const FamilyScene: React.FC<FamilySceneProps> = ({ invitationData, onNext }) => {
  return (
    <div className="relative w-full h-full min-h-screen flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-gradient-to-b from-[#250512] via-[#1a040b] to-[#120207]">
      
      {/* Background Subtle Palace Pattern */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 filter brightness-75 pointer-events-none"
        style={{ backgroundImage: `url('/assets/aistudio/Feast_8c7e88c7.jpg')` }}
      />

      {/* Main Container */}
      <div className="relative z-10 max-w-4xl w-full my-auto p-5 sm:p-8 rounded-2xl royal-box text-center border-2 border-[#d4af37] shadow-2xl">
        
        {/* Header */}
        <div className="mb-4">
          <p className="font-cinzel text-xs sm:text-sm tracking-widest text-[#fde88a] uppercase">
            With Joyous Hearts &amp; Warm Regards
          </p>
          <h2 className="font-rozha text-2xl sm:text-3xl md:text-4xl text-[#ffd700] mb-1">
            स्नेही स्वजन एवं स्वागतातुर
          </h2>
          <p className="font-vibes text-2xl sm:text-3xl text-[#f7b2c5]">
            Awaiting Your Gracious Presence
          </p>
        </div>

        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-6" />

        <p className="font-devanagari text-xs sm:text-sm text-[#fce4ec]/85 max-w-xl mx-auto mb-6">
          "अतिथि देवो भव" — आपके पावन शुभागमन की प्रतीक्षा में समस्त परिवार जन नयनों में स्नेह दीप प्रज्वलित किए हुए हैं।
        </p>

        {/* Family Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 mb-8 text-left">
          {invitationData.familyMembers.map((member, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-gradient-to-br from-[#3b0819]/90 to-[#22040e]/95 border border-[#d4af37]/60 hover:border-[#ffd700] hover:scale-[1.02] transition-all shadow-md flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-sm shrink-0 text-[#ffd700]">
                {idx + 1}
              </div>
              <div>
                <p className="font-devanagari text-sm sm:text-base text-white font-medium leading-snug">
                  {member}
                </p>
                <span className="text-[10px] text-[#fde88a] font-cinzel uppercase tracking-wider block mt-1">
                  दर्शनाभिलाषी
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Shubh Shloka Banner */}
        <div className="py-3 px-6 rounded-xl bg-black/50 border border-[#d4af37]/40 max-w-xl mx-auto mb-8">
          <p className="font-devanagari text-xs sm:text-sm text-[#ffd700]">
            ॥ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ॥
          </p>
          <p className="font-marcellus text-[11px] text-[#fce4ec]/70 mt-0.5">
            May peace, divine virtues and supreme wellness bless all living beings.
          </p>
        </div>

        {/* Next Scene Button */}
        <div>
          <button
            onClick={onNext}
            className="group inline-flex items-center justify-center gap-3 py-3.5 px-8 rounded-full font-cinzel font-bold text-sm sm:text-base tracking-wider uppercase transition-all duration-300 bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#aa771c] text-[#1a080e] shadow-[0_0_20px_rgba(212,175,55,0.6)] hover:shadow-[0_0_35px_rgba(255,215,0,0.9)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>शुभ वेला उलटी गिनती एवं समापन</span>
            <span className="text-lg transition-transform group-hover:translate-x-1">➔</span>
          </button>
        </div>
      </div>
    </div>
  );
};
