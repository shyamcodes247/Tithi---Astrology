import { BirthDetails, PlanetData, AstrologyResponse, AspectData, HouseCuspData } from '../types/astrology';
import { 
  calculateAdvancedPlanetaryPositions, 
  calculatePlanetaryAspects,
  calculateHouseCusps
} from './advancedAstrologyCalculations';

// Constants for zodiac signs
const ZODIAC_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

// Constants for planets
const PLANETS = [
  'Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 
  'Saturn', 'Uranus', 'Neptune', 'Pluto'
];

/**
 * Calculate planetary positions based on birth details
 * Uses our custom calculation service with advanced astrology calculations
 */
export function calculatePlanetaryPositions(birthDetails: BirthDetails): AstrologyResponse {
  if (!validateBirthDetails(birthDetails)) {
    throw new Error('Invalid birth details provided');
  }

  const planetaryPositions = calculateAdvancedPlanetaryPositions(birthDetails);
  const aspects = calculatePlanetaryAspects(planetaryPositions);
  const houseCusps = calculateHouseCusps(birthDetails);

  return {
    statusCode: 200,
    input: {
      year: birthDetails.year,
      month: birthDetails.month,
      date: birthDetails.date,
      hours: birthDetails.hours,
      minutes: birthDetails.minutes,
      seconds: birthDetails.seconds,
      latitude: birthDetails.latitude,
      longitude: birthDetails.longitude,
      timezone: Number(birthDetails.timezone),
      config: {
        observation_point: 'geocentric',
        ayanamsha: 'lahiri'
      }
    },
    output: planetaryPositions,
    aspects,
    houseCusps
  };
}

/**
 * Validate birth details
 */
function validateBirthDetails(details: BirthDetails): boolean {
  const timezoneNum = Number(details.timezone);
  
  return (
    details.year >= 1900 &&
    details.year <= 2100 &&
    details.month >= 1 &&
    details.month <= 12 &&
    details.date >= 1 &&
    details.date <= 31 &&
    details.hours >= 0 &&
    details.hours <= 23 &&
    details.minutes >= 0 &&
    details.minutes <= 59 &&
    details.seconds >= 0 &&
    details.seconds <= 59 &&
    details.latitude >= -90 &&
    details.latitude <= 90 &&
    details.longitude >= -180 &&
    details.longitude <= 180 &&
    timezoneNum >= -12 &&
    timezoneNum <= 14
  );
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