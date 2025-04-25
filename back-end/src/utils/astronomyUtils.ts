import { BirthDetails } from '../types/astrology';

/**
 * Calculate Julian Date from birth details
 */
export function calculateJulianDate(birthDetails: BirthDetails): number {
  const { year, month, date, hours, minutes, seconds } = birthDetails;
  
  // Convert to Julian calendar
  let jd = 367 * year - Math.floor(7 * (year + Math.floor((month + 9) / 12)) / 4);
  jd += Math.floor(275 * month / 9) + date + 1721013.5;
  
  // Add time component
  jd += (hours + minutes / 60 + seconds / 3600) / 24;
  
  return jd;
}

/**
 * Calculate Sidereal Time for a given Julian Date and longitude
 */
export function calculateSiderealTime(jd: number, longitude: number): number {
  // Calculate T (Julian centuries since J2000.0)
  const t = (jd - 2451545.0) / 36525;
  
  // Calculate mean sidereal time at Greenwich
  let st = 280.46061837 + 360.98564736629 * (jd - 2451545.0);
  st += 0.000387933 * t * t - t * t * t / 38710000;
  
  // Add longitude correction
  st += longitude;
  
  // Normalize to 0-360 range
  st = st % 360;
  if (st < 0) st += 360;
  
  return st;
}

/**
 * Convert degrees to radians
 */
export function degreesToRadians(degrees: number): number {
  return degrees * Math.PI / 180;
}

/**
 * Convert radians to degrees
 */
export function radiansToDegrees(radians: number): number {
  return radians * 180 / Math.PI;
}

/**
 * Normalize an angle to 0-360 range
 */
export function normalizeAngle(angle: number): number {
  angle = angle % 360;
  if (angle < 0) angle += 360;
  return angle;
}

/**
 * Calculate the difference between two angles
 */
export function angleDifference(angle1: number, angle2: number): number {
  let diff = Math.abs(angle1 - angle2);
  if (diff > 180) {
    diff = 360 - diff;
  }
  return diff;
} 