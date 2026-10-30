import React, { useState } from 'react';
import { InvitationData } from '../types/invitation';
import { DEFAULT_INVITATION } from '../data/swapanaData';

interface InvitationEditorProps {
  data: InvitationData;
  onSave: (newData: InvitationData) => void;
  onReset: () => void;
}

export const InvitationEditor: React.FC<InvitationEditorProps> = ({
  data,
  onSave,
  onReset
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<InvitationData>(data);
  const [familyText, setFamilyText] = useState(data.familyMembers.join('\n'));
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync if data changes externally
  React.useEffect(() => {
    setFormData(data);
    setFamilyText(data.familyMembers.join('\n'));
  }, [data]);

  const handleChange = (field: keyof InvitationData, val: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: val
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const members = familyText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const updated: InvitationData = {
      ...formData,
      familyMembers: members.length > 0 ? members : DEFAULT_INVITATION.familyMembers
    };

    onSave(updated);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setIsOpen(false);
    }, 1000);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all details to royal Jain invitation defaults?')) {
      onReset();
      setFormData(DEFAULT_INVITATION);
      setFamilyText(DEFAULT_INVITATION.familyMembers.join('\n'));
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed top-4 left-4 z-40">
        <button
          onClick={() => setIsOpen(true)}
          title="Customize Invitation Names, Dates, & Venue"
          className="flex items-center gap-2 py-2 px-3.5 rounded-full bg-[#1e040d]/90 border border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.4)] text-[#ffd700] hover:bg-[#3d091a] transition-all text-xs font-cinzel font-semibold backdrop-blur-md cursor-pointer active:scale-95"
        >
          <span>✏️</span>
          <span className="hidden sm:inline">Personalize Invitation (विवरण बदलें)</span>
        </button>
      </div>

      {/* Slide-over Drawer / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-start bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg h-full overflow-y-auto bg-[#1b030b] border-r-2 border-[#d4af37] p-6 shadow-2xl flex flex-col justify-between">
            
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#d4af37]/40 mb-4">
                <div>
                  <h3 className="font-rozha text-xl text-[#ffd700]">
                    राजकीय निमंत्रण संपादक
                  </h3>
                  <p className="font-cinzel text-xs text-[#f7b2c5] uppercase tracking-wider">
                    Personalize Invitation Details
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-black/40 border border-[#d4af37] text-white flex items-center justify-center hover:bg-[#d84a72] transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-[#fce4ec]/70 font-devanagari mb-4">
                यहाँ नाम, दिनांक, समय, स्थान व परिवार जनों का विवरण दर्ज करें। सभी परिवर्तन तुरंत सहेज लिए जाएंगे।
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 font-devanagari text-xs sm:text-sm">
                
                {/* Mother Name */}
                <div className="space-y-1">
                  <label className="text-[#ffd700] font-bold block">
                    माता का नाम (Mother's Name - Devanagari)
                  </label>
                  <input
                    type="text"
                    value={formData.motherNameDevanagari}
                    onChange={e => handleChange('motherNameDevanagari', e.target.value)}
                    className="w-full p-2 rounded bg-black/50 border border-[#d4af37]/60 text-white focus:outline-none focus:border-[#ffd700]"
                    placeholder="सौ. प्रियंका जैन"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#fce4ec]/70 block font-cinzel text-xs">
                    Mother's Name (English)
                  </label>
                  <input
                    type="text"
                    value={formData.motherNameEnglish}
                    onChange={e => handleChange('motherNameEnglish', e.target.value)}
                    className="w-full p-2 rounded bg-black/50 border border-[#d4af37]/40 text-white focus:outline-none focus:border-[#ffd700] font-marcellus"
                    placeholder="Mrs. Priyanka Jain"
                  />
                </div>

                {/* Father Name */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[#ffd700] font-bold block">
                      पिता का नाम (Devanagari)
                    </label>
                    <input
                      type="text"
                      value={formData.fatherNameDevanagari}
                      onChange={e => handleChange('fatherNameDevanagari', e.target.value)}
                      className="w-full p-2 rounded bg-black/50 border border-[#d4af37]/60 text-white focus:outline-none focus:border-[#ffd700]"
                      placeholder="चि. राहुल जैन"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[#fce4ec]/70 block font-cinzel text-xs">
                      Father's Name (English)
                    </label>
                    <input
                      type="text"
                      value={formData.fatherNameEnglish}
                      onChange={e => handleChange('fatherNameEnglish', e.target.value)}
                      className="w-full p-2 rounded bg-black/50 border border-[#d4af37]/40 text-white focus:outline-none focus:border-[#ffd700] font-marcellus"
                      placeholder="Mr. Rahul Jain"
                    />
                  </div>
                </div>

                {/* Paternal Grandparents */}
                <div className="space-y-1">
                  <label className="text-[#ffd700] font-bold block">
                    दादाजी एवं दादीजी (Paternal Grandparents)
                  </label>
                  <input
                    type="text"
                    value={formData.paternalGrandparentsDevanagari}
                    onChange={e => handleChange('paternalGrandparentsDevanagari', e.target.value)}
                    className="w-full p-2 rounded bg-black/50 border border-[#d4af37]/60 text-white focus:outline-none focus:border-[#ffd700]"
                  />
                </div>

                {/* Maternal Grandparents */}
                <div className="space-y-1">
                  <label className="text-[#ffd700] font-bold block">
                    नानाजी एवं नानीजी (Maternal Grandparents)
                  </label>
                  <input
                    type="text"
                    value={formData.maternalGrandparentsDevanagari}
                    onChange={e => handleChange('maternalGrandparentsDevanagari', e.target.value)}
                    className="w-full p-2 rounded bg-black/50 border border-[#d4af37]/60 text-white focus:outline-none focus:border-[#ffd700]"
                  />
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[#ffd700] font-bold block">
                      उत्सव दिनांक (Date)
                    </label>
                    <input
                      type="text"
                      value={formData.eventDate}
                      onChange={e => handleChange('eventDate', e.target.value)}
                      className="w-full p-2 rounded bg-black/50 border border-[#d4af37]/60 text-white focus:outline-none focus:border-[#ffd700]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[#ffd700] font-bold block">
                      शुभ समय (Time)
                    </label>
                    <input
                      type="text"
                      value={formData.eventTime}
                      onChange={e => handleChange('eventTime', e.target.value)}
                      className="w-full p-2 rounded bg-black/50 border border-[#d4af37]/60 text-white focus:outline-none focus:border-[#ffd700]"
                    />
                  </div>
                </div>

                {/* Venue & City */}
                <div className="space-y-1">
                  <label className="text-[#ffd700] font-bold block">
                    उत्सव स्थल (Venue Name)
                  </label>
                  <input
                    type="text"
                    value={formData.eventVenue}
                    onChange={e => handleChange('eventVenue', e.target.value)}
                    className="w-full p-2 rounded bg-black/50 border border-[#d4af37]/60 text-white focus:outline-none focus:border-[#ffd700]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#ffd700] font-bold block">
                    शहर / पता (Address / City)
                  </label>
                  <input
                    type="text"
                    value={formData.eventCity}
                    onChange={e => handleChange('eventCity', e.target.value)}
                    className="w-full p-2 rounded bg-black/50 border border-[#d4af37]/60 text-white focus:outline-none focus:border-[#ffd700]"
                  />
                </div>

                {/* Family Members list */}
                <div className="space-y-1">
                  <label className="text-[#ffd700] font-bold block">
                    स्नेही स्वजन / दर्शनाभिलाषी (1 per line)
                  </label>
                  <textarea
                    rows={4}
                    value={familyText}
                    onChange={e => setFamilyText(e.target.value)}
                    className="w-full p-2 rounded bg-black/50 border border-[#d4af37]/60 text-white focus:outline-none focus:border-[#ffd700]"
                  />
                </div>

                {/* Business Branding */}
                <div className="space-y-1">
                  <label className="text-[#ffd700] font-bold block">
                    बिजनेस का नाम (Crafted By / Business Name)
                  </label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={e => handleChange('businessName', e.target.value)}
                    className="w-full p-2 rounded bg-black/50 border border-[#d4af37]/60 text-white focus:outline-none focus:border-[#ffd700]"
                  />
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3 pt-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 rounded-full font-cinzel font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#aa771c] text-[#1a080e] shadow-md hover:brightness-110 active:scale-95 cursor-pointer"
                  >
                    {saveSuccess ? '✓ सहेज लिया गया (Saved)' : 'परिवर्तन सहेजें (Save)'}
                  </button>

                  <button
                    type="button"
                    onClick={handleResetDefaults}
                    className="py-3 px-4 rounded-full font-cinzel text-xs uppercase text-[#f7b2c5] border border-[#d84a72]/50 hover:bg-[#d84a72]/20 cursor-pointer"
                  >
                    रीसेट
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
