import { calculateJulianDate } from '../utils/astronomyUtils';
import { BirthDetails } from '../types/astrology';

// Tithi names in Sanskrit
const TITHI_NAMES = [
  'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
  'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
  'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima',
  'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
  'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
  'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Amavasya'
];

// Special Ekadashi names
const EKADASHI_NAMES = [
  'Kamada Ekadashi',
  'Varuthini Ekadashi',
  'Mohini Ekadashi',
  'Apara Ekadashi',
  'Nirjala Ekadashi',
  'Yogini Ekadashi',
  'Devshayani Ekadashi',
  'Kamika Ekadashi',
  'Padmini Ekadashi',
  'Parama Ekadashi',
  'Indira Ekadashi',
  'Papankusha Ekadashi',
  'Rama Ekadashi',
  'Devutthana Ekadashi',
  'Utpanna Ekadashi',
  'Mokshada Ekadashi',
  'Saphala Ekadashi',
  'Putrada Ekadashi',
  'Satila Ekadashi',
  'Jaya Ekadashi',
  'Vijaya Ekadashi',
  'Amalaki Ekadashi',
  'Papamochani Ekadashi',
  'Kamada Ekadashi'
];

interface TithiInfo {
  tithi: string;
  tithiNumber: number;
  paksha: 'Shukla' | 'Krishna';
  isEkadashi: boolean;
  ekadashiName?: string;
  nextEkadashi: {
    date: Date;
    name: string;
    daysUntil: number;
  };
}

/**
 * Convert a JavaScript Date to BirthDetails
 */
function dateToBirthDetails(date: Date): BirthDetails {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    latitude: 0,
    longitude: 0,
    timezone: 'UTC'
  };
}

/**
 * Calculate the current Tithi (lunar day)
 * @param date Optional date to calculate Tithi for (defaults to current date)
 * @returns Information about the current Tithi
 */
export function calculateCurrentTithi(date: Date = new Date()): TithiInfo {
  // Calculate Julian Day Number
  const birthDetails = dateToBirthDetails(date);
  const jd = calculateJulianDate(birthDetails);
  
  // Calculate lunar phase (0 to 1)
  const lunarPhase = calculateLunarPhase(jd);
  
  // Calculate Tithi number (1-30)
  const tithiNumber = Math.floor(lunarPhase * 30) + 1;
  
  // Determine if it's Shukla (bright) or Krishna (dark) Paksha
  const paksha = lunarPhase < 0.5 ? 'Shukla' : 'Krishna';
  
  // Get Tithi name
  const tithi = TITHI_NAMES[tithiNumber - 1];
  
  // Check if it's Ekadashi (11th Tithi)
  const isEkadashi = tithiNumber === 11 || tithiNumber === 26;
  
  // Get Ekadashi name if applicable
  const ekadashiName = isEkadashi ? getEkadashiName(date) : undefined;
  
  // Calculate next Ekadashi
  const nextEkadashi = calculateNextEkadashi(date);
  
  return {
    tithi,
    tithiNumber,
    paksha,
    isEkadashi,
    ekadashiName,
    nextEkadashi
  };
}

/**
 * Calculate the lunar phase (0 to 1)
 * @param jd Julian Day Number
 * @returns Lunar phase as a decimal between 0 and 1
 */
function calculateLunarPhase(jd: number): number {
  // Simplified lunar phase calculation
  // In a real implementation, this would use more precise astronomical calculations
  const LUNAR_MONTH = 29.530588853; // Length of synodic month in days
  
  // Calculate days since new moon
  const daysSinceNewMoon = (jd % LUNAR_MONTH) / LUNAR_MONTH;
  
  return daysSinceNewMoon;
}

/**
 * Get the name of the Ekadashi based on the date
 * @param date Date to calculate Ekadashi name for
 * @returns Name of the Ekadashi
 */
function getEkadashiName(date: Date): string {
  // This is a simplified calculation
  // In a real implementation, this would use more precise astronomical calculations
  const month = date.getMonth();
  const day = date.getDate();
  
  // Simple algorithm to determine Ekadashi name based on month and day
  const index = (month * 2 + Math.floor(day / 15)) % EKADASHI_NAMES.length;
  
  return EKADASHI_NAMES[index];
}

/**
 * Calculate the next Ekadashi date and name
 * @param fromDate Date to calculate from (defaults to current date)
 * @returns Information about the next Ekadashi
 */
function calculateNextEkadashi(fromDate: Date = new Date()): { date: Date; name: string; daysUntil: number } {
  // Calculate Julian Day Number
  const birthDetails = dateToBirthDetails(fromDate);
  const jd = calculateJulianDate(birthDetails);
  
  // Calculate lunar phase
  const lunarPhase = calculateLunarPhase(jd);
  
  // Calculate days until next Ekadashi
  let daysUntilEkadashi: number;
  
  if (lunarPhase < 11/30) {
    // Next Ekadashi is in current lunar month
    daysUntilEkadashi = Math.ceil((11/30 - lunarPhase) * 29.530588853);
  } else if (lunarPhase < 26/30) {
    // Next Ekadashi is in current lunar month
    daysUntilEkadashi = Math.ceil((26/30 - lunarPhase) * 29.530588853);
  } else {
    // Next Ekadashi is in next lunar month
    daysUntilEkadashi = Math.ceil((11/30 + 1 - lunarPhase) * 29.530588853);
  }
  
  // Calculate date of next Ekadashi
  const nextEkadashiDate = new Date(fromDate);
  nextEkadashiDate.setDate(fromDate.getDate() + daysUntilEkadashi);
  
  // Get name of next Ekadashi
  const nextEkadashiName = getEkadashiName(nextEkadashiDate);
  
  return {
    date: nextEkadashiDate,
    name: nextEkadashiName,
    daysUntil: daysUntilEkadashi
  };
}

/**
 * Calculate the next five Ekadashis
 * @param fromDate Date to calculate from (defaults to current date)
 * @returns Array of next five Ekadashis with dates and names
 */
export function calculateNextFiveEkadashis(fromDate: Date = new Date()): Array<{ date: Date; name: string; daysUntil: number }> {
  const result = [];
  let currentDate = new Date(fromDate);
  
  for (let i = 0; i < 5; i++) {
    const nextEkadashi = calculateNextEkadashi(currentDate);
    result.push(nextEkadashi);
    
    // Move to the day after this Ekadashi to find the next one
    currentDate = new Date(nextEkadashi.date);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return result;
}

/**
 * Calculate the next five important Hindu festivals
 * @param fromDate Date to calculate from (defaults to current date)
 * @returns Array of next five festivals with dates and names
 */
export function calculateNextFiveFestivals(fromDate: Date = new Date()): Array<{ date: Date; name: string; daysUntil: number }> {
  // This is a placeholder implementation
  // In a real implementation, this would calculate actual festival dates
  const festivals = [
    { name: 'Makar Sankranti', month: 0, day: 14 },
    { name: 'Vasant Panchami', month: 1, day: 5 },
    { name: 'Maha Shivaratri', month: 1, day: 14 },
    { name: 'Holi', month: 2, day: 8 },
    { name: 'Rama Navami', month: 3, day: 9 },
    { name: 'Akshaya Tritiya', month: 4, day: 3 },
    { name: 'Rath Yatra', month: 5, day: 2 },
    { name: 'Raksha Bandhan', month: 6, day: 15 },
    { name: 'Krishna Janmashtami', month: 7, day: 19 },
    { name: 'Ganesh Chaturthi', month: 7, day: 22 },
    { name: 'Navaratri', month: 8, day: 1 },
    { name: 'Dussehra', month: 8, day: 10 },
    { name: 'Karva Chauth', month: 9, day: 4 },
    { name: 'Diwali', month: 9, day: 12 },
    { name: 'Guru Nanak Jayanti', month: 10, day: 8 }
  ];
  
  const result = [];
  let currentDate = new Date(fromDate);
  
  // Find the next five festivals
  for (let i = 0; i < 5; i++) {
    let nextFestival = null;
    let minDays = Infinity;
    
    for (const festival of festivals) {
      const festivalDate = new Date(fromDate.getFullYear(), festival.month, festival.day);
      
      // If the festival has already passed this year, look for next year
      if (festivalDate < fromDate) {
        festivalDate.setFullYear(fromDate.getFullYear() + 1);
      }
      
      const daysUntil = Math.ceil((festivalDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysUntil < minDays) {
        minDays = daysUntil;
        nextFestival = {
          date: festivalDate,
          name: festival.name,
          daysUntil
        };
      }
    }
    
    if (nextFestival) {
      result.push(nextFestival);
      
      // Move to the day after this festival to find the next one
      currentDate = new Date(nextFestival.date);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }
  
  return result;
} 