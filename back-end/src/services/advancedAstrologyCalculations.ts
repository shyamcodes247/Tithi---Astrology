import { BirthDetails, PlanetData, AspectData, HouseCuspData } from '../types/astrology';
import { calculateJulianDate, calculateSiderealTime } from '../utils/astronomyUtils';

// Constants for zodiac signs
export const ZODIAC_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

// Constants for planets
export const PLANETS = [
  'Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 
  'Saturn', 'Uranus', 'Neptune', 'Pluto'
];

// Planetary rulerships
export const PLANETARY_RULERSHIPS: Record<string, string[]> = {
  'Sun': ['Leo'],
  'Moon': ['Cancer'],
  'Mercury': ['Gemini', 'Virgo'],
  'Venus': ['Taurus', 'Libra'],
  'Mars': ['Aries', 'Scorpio'],
  'Jupiter': ['Sagittarius', 'Pisces'],
  'Saturn': ['Capricorn', 'Aquarius'],
  'Uranus': ['Aquarius'],
  'Neptune': ['Pisces'],
  'Pluto': ['Scorpio']
};

// Planetary dignities
export const PLANETARY_DIGNITIES: Record<string, Record<string, number>> = {
  'Sun': {
    'Aries': 1, 'Taurus': -1, 'Gemini': -1, 'Cancer': -1, 'Leo': 2, 'Virgo': -2,
    'Libra': -1, 'Scorpio': -1, 'Sagittarius': 0, 'Capricorn': -1, 'Aquarius': -1, 'Pisces': -1
  },
  'Moon': {
    'Aries': -1, 'Taurus': 0, 'Gemini': -1, 'Cancer': 2, 'Leo': 0, 'Virgo': -1,
    'Libra': 0, 'Scorpio': 1, 'Sagittarius': -1, 'Capricorn': -1, 'Aquarius': -1, 'Pisces': 1
  },
  // Add more planetary dignities as needed
};

/**
 * Calculate the Julian Day Number for a given date
 * This is a simplified calculation for demonstration purposes
 */
export function calculateJulianDay(year: number, month: number, day: number, hour: number, minute: number, second: number): number {
  // This is a simplified calculation
  // For accurate astronomical calculations, you would use a more precise algorithm
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  
  let jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  
  // Add time component
  jdn += (hour - 12) / 24 + minute / 1440 + second / 86400;
  
  return jdn;
}

/**
 * Calculate advanced planetary positions using birth details
 */
export function calculateAdvancedPlanetaryPositions(birthDetails: BirthDetails): PlanetData[] {
  const julianDate = calculateJulianDate(birthDetails);
  const siderealTime = calculateSiderealTime(julianDate, birthDetails.longitude);

  // Calculate positions for all planets
  return PLANETS.map(planet => calculatePlanetPosition(planet, birthDetails));
}

/**
 * Calculate position for a specific planet
 * This is a simplified calculation for demonstration purposes
 */
function calculatePlanetPosition(planet: string, birthDetails: BirthDetails): PlanetData {
  // In a real application, you would use astronomical calculations
  // For this example, we'll use a deterministic but simplified approach
  
  // Use the birth details to generate a seed for random-like but deterministic values
  const timezoneNum = Number(birthDetails.timezone);
  const seed = birthDetails.year + birthDetails.month + birthDetails.date + 
               birthDetails.hours + birthDetails.minutes + birthDetails.seconds +
               birthDetails.latitude + birthDetails.longitude + timezoneNum;
  
  // Calculate a pseudo-random but deterministic value for this planet
  const planetIndex = PLANETS.indexOf(planet);
  const normalizedValue = Math.sin(Number(seed) * (planetIndex + 1)) * 0.5 + 0.5;
  
  // Calculate the zodiac sign (1-12)
  const zodiacSign = Math.floor(normalizedValue * 12) + 1;
  
  // Calculate the degree within the sign (0-29.99)
  const degreeInSign = (normalizedValue * 12 - Math.floor(normalizedValue * 12)) * 30;
  
  // Calculate the full degree (0-359.99)
  const fullDegree = (zodiacSign - 1) * 30 + degreeInSign;
  
  // Determine if the planet is retrograde (simplified)
  const isRetrograde = Math.sin(Number(seed) * (planetIndex + 1) * 2) > 0.7 ? 'true' : 'false';
  
  return {
    name: planet,
    fullDegree,
    normDegree: degreeInSign,
    isRetro: isRetrograde,
    current_sign: zodiacSign
  };
}

/**
 * Calculate aspects between planets
 */
export function calculatePlanetaryAspects(planets: PlanetData[]): AspectData[] {
  const aspects: AspectData[] = [];
  const majorAspects = [0, 60, 90, 120, 180]; // Conjunction, Sextile, Square, Trine, Opposition

  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const planet1 = planets[i];
      const planet2 = planets[j];
      
      // Calculate the angle between planets
      let angle = Math.abs(planet1.fullDegree - planet2.fullDegree);
      if (angle > 180) {
        angle = 360 - angle;
      }

      // Check if the angle is close to a major aspect
      for (const aspectAngle of majorAspects) {
        const orb = 8; // Allow 8 degrees orb for major aspects
        if (Math.abs(angle - aspectAngle) <= orb) {
          aspects.push({
            planet1: planet1.name,
            planet2: planet2.name,
            angle,
            orb: Math.abs(angle - aspectAngle),
            aspectName: getAspectName(aspectAngle),
            isApplying: false, // TODO: Calculate if aspect is applying
            isSeparating: false // TODO: Calculate if aspect is separating
          });
        }
      }
    }
  }

  return aspects;
}

/**
 * Calculate house cusps using Placidus system
 */
export function calculateHouseCusps(birthDetails: BirthDetails): HouseCuspData[] {
  const julianDate = calculateJulianDate(birthDetails);
  const siderealTime = calculateSiderealTime(julianDate, birthDetails.longitude);

  // TODO: Implement Placidus house system calculations
  // This is a placeholder that will be replaced with actual house calculations
  return [
    {
      houseNumber: 1,
      longitude: 0,
      sign: 'Aries',
      degree: 0
    },
    {
      houseNumber: 2,
      longitude: 30,
      sign: 'Taurus',
      degree: 0
    }
  ];
}

/**
 * Get the name of an aspect based on its angle
 */
function getAspectName(angle: number): string {
  switch (angle) {
    case 0:
      return 'Conjunction';
    case 60:
      return 'Sextile';
    case 90:
      return 'Square';
    case 120:
      return 'Trine';
    case 180:
      return 'Opposition';
    default:
      return 'Unknown';
  }
} 