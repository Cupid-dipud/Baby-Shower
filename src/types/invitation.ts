export interface Swapana {
  id: number;
  nameDevanagari: string;
  nameEnglish: string;
  symbol: string;
  shortMeaning: string;
  detailedMeaning: string;
  spiritualSignificance: string;
  iconSvg: string;
}

export interface InvitationData {
  babyShowerTitleDevanagari: string;
  babyShowerTitleEnglish: string;
  motherNameDevanagari: string;
  motherNameEnglish: string;
  fatherNameDevanagari: string;
  fatherNameEnglish: string;
  paternalGrandparentsDevanagari: string;
  paternalGrandparentsEnglish: string;
  maternalGrandparentsDevanagari: string;
  maternalGrandparentsEnglish: string;
  eventDate: string;
  eventTime: string;
  eventVenue: string;
  eventCity: string;
  eventMapLink: string;
  familyMembers: string[];
  businessName: string;
  businessTagline: string;
}
