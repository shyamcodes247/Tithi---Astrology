import { AstrologyResponse, BirthDetails } from '@/types/astrology';

// Backend API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/astrology/planets';

export async function getPlanetaryPositions(birthDetails: BirthDetails): Promise<AstrologyResponse> {
  try {
    console.log('Sending request to API with data:', birthDetails);

    // Call the backend API
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(birthDetails),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API error response:', errorData);
      throw new Error(errorData.error || `API request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log('API response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching planetary positions:', error);
    
    // Provide more specific error messages based on the error type
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error('Network error: Unable to connect to the server. Please check your internet connection and try again.');
    }
    
    throw error;
  }
} 