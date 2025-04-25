export interface PlanetData {
  name: string;
  fullDegree: number;
  normDegree: number;
  isRetro: string;
  current_sign: number;
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
}

export interface BirthDetails {
  year: number | '';
  month: number | '';
  date: number | '';
  hours: number | '';
  minutes: number | '';
  seconds: number | '';
  latitude: number | '';
  longitude: number | '';
  timezone: number | '';
} 