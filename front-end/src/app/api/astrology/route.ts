import { NextRequest, NextResponse } from 'next/server';
import { BirthDetails } from '@/types/astrology';

const API_KEY = process.env.NEXT_PUBLIC_ASTROLOGY_API_KEY;
const API_URL = 'https://json.freeastrologyapi.com/planets';

export async function POST(request: NextRequest) {
  try {
    // Check if API key is set
    if (!API_KEY || API_KEY === 'IVpHAUvC096hCkLf1jEha8leeLs8RW80am18XZSa') {
      return NextResponse.json(
        { error: 'API key is not set. Please add your API key to the .env.local file.' },
        { status: 500 }
      );
    }

    // Parse the request body
    const birthDetails: BirthDetails = await request.json();

    // Make the request to the astrology API
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify({
        ...birthDetails,
        settings: {
          observation_point: 'topocentric',
          ayanamsha: 'lahiri'
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      return NextResponse.json(
        { error: `API request failed with status ${response.status}: ${errorText}` },
        { status: response.status }
      );
    }

    // Return the API response
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in astrology API route:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
} 