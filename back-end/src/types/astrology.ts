/**
 * Birth details interface
 */
export interface BirthDetails {
  year: number;
  month: number;
  date: number;
  hours: number;
  minutes: number;
  seconds: number;
  latitude: number;
  longitude: number;
  timezone: string;
}

/**
 * Planetary position interface
 */
export interface PlanetaryPosition {
  planet: string;
  longitude: number;
  latitude: number;
  distance: number;
  speed: number;
  house: number;
  sign: string;
  degree: number;
  isRetrograde: boolean;
}

/**
 * Aspect data interface
 */
export interface AspectData {
  planet1: string;
  planet2: string;
  angle: number;
  orb: number;
  aspectName: string;
  isApplying: boolean;
  isSeparating: boolean;
}

/**
 * House cusp data interface
 */
export interface HouseCuspData {
  houseNumber: number;
  longitude: number;
  sign: string;
  degree: number;
}

/**
 * Chart data interface
 */
export interface ChartData {
  planets: PlanetaryPosition[];
  aspects: AspectData[];
  houses: HouseCuspData[];
  ascendant: number;
  midheaven: number;
  vertex: number;
  partOfFortune: number;
}

export interface AstrologyResponse {
  statusCode: number;
  input: {
    year: number;
    month: number;
    date: number;
    hours: number;
    minutes: number;
    seconds: number;
    latitude: number;
    longitude: number;
    timezone: number;
    config: {
      observation_point: string;
      ayanamsha: string;
    };
  };
  output: PlanetData[];
  aspects?: AspectData[];
  houseCusps?: HouseCuspData[];
}

export interface PlanetData {
  name: string;
  fullDegree: number;
  normDegree: number;
  isRetro: string;
  current_sign: number;
} 