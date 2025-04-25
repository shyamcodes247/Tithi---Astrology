import { BirthDetails, AstrologyResponse } from '../types/astrology';
import { calculatePlanetaryPositions } from './astrologyCalculationService';

/**
 * Get planetary positions based on birth details
 * Uses our custom calculation service instead of an external API
 */
export async function getPlanetaryPositions(birthDetails: BirthDetails): Promise<AstrologyResponse> {
  try {
    // Use our custom calculation service
    return calculatePlanetaryPositions(birthDetails);
  } catch (error) {
    console.error('Error calculating planetary positions:', error);
    throw error;
  }
} 