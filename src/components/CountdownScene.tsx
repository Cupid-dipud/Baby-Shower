import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { InvitationData } from '../types/invitation';
import { royalAudio } from '../utils/audioPlayer';

interface CountdownSceneProps {
  invitationData: InvitationData;
  onRestart: () => void;
}

export const CountdownScene: React.FC<CountdownSceneProps> = ({ invitationData, onRestart }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 410,
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  const [rsvpStatus, setRsvpStatus] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  useEffect(() => {
    // Default target: 15 Dec 2026 18:00
    const target = new Date('2026-12-15T18:00:00').getTime();

    const timer = setInterval(() => {
      const now = Date.now();
      const diff = target - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRsvp = (status: 'attending' | 'blessings') => {
    setRsvpStatus(status);
    royalAudio.playBlessingChime();

    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ffd700', '#d84a72', '#ffffff', '#f48fb1']
    });
  };

  const handleShare = () => {
    const text = `🌸 *${invitationData.babyShowerTitleDevanagari}* 🌸\n\nआप सादर आमंत्रित हैं सौ. ${invitationData.motherNameDevanagari} एवं चि. ${invitationData.fatherNameDevanagari} के पावन श्रीमंत संस्कार एवं शाही प्रीतिभोज में।\n\n🗓️ दिनांक: ${invitationData.eventDate}\n⏰ समय: ${invitationData.eventTime}\n🏛️ स्थान: ${invitationData.eventVenue}, ${invitationData.eventCity}\n\nराजकीय निमंत्रण देखें: ${window.location.href}`;

    if (navigator.share) {
      navigator.share({
        title: invitationData.babyShowerTitleDevanagari,
        text,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      });
    }
  };

  return (
    <div className="relative w-full h-full min-h-screen flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-gradient-to-b from-[#2d0718] via-[#1a040b] to-[#120207]">
      
      {/* Background Floating Shimmer */}
      <div className="absolute inset-0 bg-radial from-[#d84a72]/20 via-transparent to-transparent pointer-events-none" />

      {/* Main Card */}
      <div className="relative z-10 max-w-2xl w-full my-auto p-6 sm:p-10 rounded-2xl royal-box text-center border-2 border-[#d4af37] shadow-[0_0_50px_rgba(216,74,114,0.35)]">
        
        {/* Sacred Jain Symbol */}
        <div className="text-3xl sm:text-4xl text-[#ffd700] mb-2 animate-pulse">
          卐 ॐ 卐
        </div>

        <p className="font-cinzel text-xs sm:text-sm tracking-widest text-[#fde88a] uppercase mb-1">
          Awaiting The Auspicious Moment
        </p>

        <h2 className="font-rozha text-2xl sm:text-3xl md:text-4xl text-[#ffd700] mb-3">
          शुभ वेला की उलटी गिनती
        </h2>

        <p className="font-vibes text-2xl sm:text-3xl text-[#f7b2c5] mb-6">
          Countdown to Blessed Celebrations
        </p>

        {/* 4 Gold Countdown Boxes */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto mb-6">
          {/* Days */}
          <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-b from-[#3d091a] to-[#20040e] border border-[#d4af37] shadow-lg">
            <span className="font-mono text-2xl sm:text-4xl font-extrabold text-[#ffd700] block tabular-nums">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase font-cinzel text-[#fce4ec] tracking-wider block mt-1">
              Days (दिन)
            </span>
          </div>

          {/* Hours */}
          <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-b from-[#3d091a] to-[#20040e] border border-[#d4af37] shadow-lg">
            <span className="font-mono text-2xl sm:text-4xl font-extrabold text-[#ffd700] block tabular-nums">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase font-cinzel text-[#fce4ec] tracking-wider block mt-1">
              Hours (घंटे)
            </span>
          </div>

          {/* Minutes */}
          <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-b from-[#3d091a] to-[#20040e] border border-[#d4af37] shadow-lg">
            <span className="font-mono text-2xl sm:text-4xl font-extrabold text-[#ffd700] block tabular-nums">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase font-cinzel text-[#fce4ec] tracking-wider block mt-1">
              Mins (मिनट)
            </span>
          </div>

          {/* Seconds */}
          <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-b from-[#3d091a] to-[#20040e] border border-[#d4af37] shadow-lg">
            <span className="font-mono text-2xl sm:text-4xl font-extrabold text-[#ffd700] block tabular-nums">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase font-cinzel text-[#fce4ec] tracking-wider block mt-1">
              Secs (सेकंड)
            </span>
          </div>
        </div>

        {/* Sacred Jain Mangal Shloka */}
        <div className="p-4 rounded-xl bg-black/60 border border-[#d4af37]/40 mb-6">
          <p className="font-devanagari text-base sm:text-lg text-[#ffd700] font-semibold leading-relaxed">
            मंगलम् भगवान् वीरो, मंगलम् गौतमो गणी।
            <br />
            मंगलम् कुन्दकुन्दाद्यो, जैन धर्मोऽस्तु मंगलम्॥
          </p>
          <p className="font-marcellus text-xs text-[#f9e295] mt-1 italic">
            May Lord Mahavira, Gautam Gandhar, and Acharya Kundakunda bestow eternal auspiciousness upon all.
          </p>
        </div>

        {/* RSVP Confirmation Buttons */}
        <div className="mb-6">
          <p className="text-xs font-cinzel uppercase tracking-wider text-[#fce4ec]/70 mb-3">
            Kindly Bless Us With Your Confirmation (RSVP)
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => handleRsvp('attending')}
              className={`py-2.5 px-5 rounded-full text-xs sm:text-sm font-devanagari font-bold border transition-all cursor-pointer ${
                rsvpStatus === 'attending'
                  ? 'bg-[#4caf50] border-[#81c784] text-white shadow-[0_0_15px_#4caf50]'
                  : 'bg-[#3b0818] border-[#d4af37] text-[#ffd700] hover:bg-[#590e28]'
              }`}
            >
              <span>{rsvpStatus === 'attending' ? '✓ हम अवश्य पधारेंगे (Confirmed)' : '🌺 हम सपरिवार अवश्य पधारेंगे (RSVP Yes)'}</span>
            </button>

            <button
              onClick={handleShare}
              className="py-2.5 px-5 rounded-full text-xs sm:text-sm font-devanagari font-bold bg-[#25d366]/20 border border-[#25d366] text-[#25d366] hover:bg-[#25d366]/30 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>📲</span>
              <span>{copiedLink ? 'आमंत्रण लिंक कॉपी हो गया!' : 'WhatsApp पर आमंत्रण साझा करें'}</span>
            </button>
          </div>
        </div>

        {/* Replay Gate Experience Button */}
        <div className="mb-8">
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 text-xs font-cinzel text-[#ffd700] hover:underline cursor-pointer opacity-90 hover:opacity-100"
          >
            <span>🔄</span>
            <span>राजकीय द्वार से पुनः अनुभव करें (Replay from Royal Gates)</span>
          </button>
        </div>

        {/* Business Footer (Required by user prompt: Names of the business appears) */}
        <div className="pt-4 border-t border-[#d4af37]/40 text-center">
          <p className="text-[11px] font-cinzel uppercase text-[#f7b2c5]/70 tracking-widest mb-1">
            Royal Invitation Design &amp; Digital Crafting By
          </p>
          <p className="font-rozha text-base sm:text-lg text-[#ffd700] font-bold">
            {invitationData.businessName}
          </p>
          <p className="text-xs text-[#fce4ec]/70 font-marcellus italic">
            "{invitationData.businessTagline}"
          </p>
        </div>
      </div>
    </div>
  );
};
