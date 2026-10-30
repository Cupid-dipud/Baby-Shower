import React, { useState } from 'react';
import { InvitationData } from '../types/invitation';

interface FeastSceneProps {
  invitationData: InvitationData;
  onNext: () => void;
}

export const FeastScene: React.FC<FeastSceneProps> = ({ invitationData, onNext }) => {
  const [copied, setCopied] = useState(false);

  // Generate Google Calendar Link
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(
      `${invitationData.babyShowerTitleEnglish} - ${invitationData.motherNameEnglish}`
    );
    const details = encodeURIComponent(
      `Auspicious Jain Seemantonnayan (Baby Shower) Celebration of ${invitationData.motherNameEnglish} & ${invitationData.fatherNameEnglish}.`
    );
    const location = encodeURIComponent(`${invitationData.eventVenue}, ${invitationData.eventCity}`);
    // Default 15 Dec 2026, 18:00 to 22:00 IST (UTC: 12:30 to 16:30)
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=20261215T123000Z/20261215T163000Z`;
  };

  const handleCopyVenue = () => {
    const full = `${invitationData.eventVenue}, ${invitationData.eventCity}`;
    navigator.clipboard.writeText(full).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative w-full h-full min-h-screen flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Background Royal Feast & People Gathering */}
      <div 
        className="absolute inset-0 bg-cover bg-center filter brightness-65 contrast-105"
        style={{ backgroundImage: `url('/assets/aistudio/Feast_8c7e88c7.jpg')` }}
      />

      {/* Regal Warm Ambient Tint */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1b030b] via-[#240511]/50 to-[#120207]/80 pointer-events-none" />

      {/* Foreground Event Details Card */}
      <div className="relative z-10 max-w-2xl w-full my-auto p-6 sm:p-10 rounded-2xl royal-box text-center border-2 border-[#d4af37] shadow-[0_0_50px_rgba(0,0,0,0.85)]">
        
        {/* Top Auspicious Seal */}
        <div className="inline-flex items-center justify-center gap-2 px-4 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/60 mb-3 text-xs uppercase font-cinzel text-[#ffd700] tracking-widest">
          <span>🏰</span>
          <span>Royal Feast &amp; Celebrations</span>
          <span>✨</span>
        </div>

        <h2 className="font-rozha text-2xl sm:text-3xl md:text-4xl text-[#ffd700] mb-1">
          शाही प्रीतिभोज एवं कार्यक्रम विवरण
        </h2>

        <p className="font-vibes text-2xl sm:text-3xl text-[#fde88a] mb-4">
          Feast, Sangeet &amp; Blessings Ceremony
        </p>

        <p className="font-devanagari text-xs sm:text-sm text-[#fce4ec]/80 max-w-lg mx-auto mb-6">
          आपकी गरिमामयी उपस्थिति इस मांगलिक उत्सव की शोभा में चार चाँद लगाएगी।
        </p>

        {/* Event Meta Box */}
        <div className="bg-black/60 backdrop-blur-md rounded-xl p-5 border border-[#d4af37]/50 mb-6 space-y-4 text-left">
          
          {/* Date & Day */}
          <div className="flex items-start gap-3.5 pb-3 border-b border-[#d4af37]/25">
            <span className="text-2xl mt-0.5 text-[#ffd700]">🗓️</span>
            <div>
              <span className="text-xs font-cinzel uppercase text-[#f7b2c5] tracking-wider block">
                शुभ दिनांक / Date
              </span>
              <p className="font-devanagari text-lg sm:text-xl text-white font-bold">
                {invitationData.eventDate}
              </p>
            </div>
          </div>

          {/* Time / Shubh Muhurat */}
          <div className="flex items-start gap-3.5 pb-3 border-b border-[#d4af37]/25">
            <span className="text-2xl mt-0.5 text-[#ffd700]">⏰</span>
            <div>
              <span className="text-xs font-cinzel uppercase text-[#f7b2c5] tracking-wider block">
                शुभ समय / Auspicious Time
              </span>
              <p className="font-devanagari text-base sm:text-lg text-white font-semibold">
                {invitationData.eventTime}
              </p>
            </div>
          </div>

          {/* Venue & Location */}
          <div className="flex items-start gap-3.5">
            <span className="text-2xl mt-0.5 text-[#ffd700]">🏛️</span>
            <div>
              <span className="text-xs font-cinzel uppercase text-[#f7b2c5] tracking-wider block">
                उत्सव स्थल / Royal Venue
              </span>
              <p className="font-devanagari text-base sm:text-lg text-[#ffd700] font-bold">
                {invitationData.eventVenue}
              </p>
              <p className="font-devanagari text-xs sm:text-sm text-[#fce4ec]/80 mt-0.5">
                {invitationData.eventCity}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons: Map & Calendar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <a
            href={invitationData.eventMapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-5 rounded-full text-xs sm:text-sm font-cinzel font-semibold tracking-wider bg-[#3d091a] text-[#ffd700] border border-[#d4af37] hover:bg-[#590e28] transition-colors flex items-center gap-2 shadow"
          >
            <span>📍</span>
            <span>View on Google Maps</span>
          </a>

          <a
            href={getGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-5 rounded-full text-xs sm:text-sm font-cinzel font-semibold tracking-wider bg-[#3d091a] text-[#ffd700] border border-[#d4af37] hover:bg-[#590e28] transition-colors flex items-center gap-2 shadow"
          >
            <span>📅</span>
            <span>Add to Google Calendar</span>
          </a>

          <button
            onClick={handleCopyVenue}
            className="py-2.5 px-5 rounded-full text-xs sm:text-sm font-cinzel font-semibold tracking-wider bg-black/50 text-[#fde88a] border border-[#d4af37]/40 hover:bg-black/70 transition-colors flex items-center gap-2"
          >
            <span>📋</span>
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Address'}</span>
          </button>
        </div>

        {/* Next Scene Button */}
        <div>
          <button
            onClick={onNext}
            className="group inline-flex items-center justify-center gap-3 py-3.5 px-8 rounded-full font-cinzel font-bold text-sm sm:text-base tracking-wider uppercase transition-all duration-300 bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#aa771c] text-[#1a080e] shadow-[0_0_20px_rgba(212,175,55,0.6)] hover:shadow-[0_0_35px_rgba(255,215,0,0.9)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>स्नेही स्वजन एवं स्वागतातुर</span>
            <span className="text-lg transition-transform group-hover:translate-x-1">➔</span>
          </button>
        </div>
      </div>
    </div>
  );
};
