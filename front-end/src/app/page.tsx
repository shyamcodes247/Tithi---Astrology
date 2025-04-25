'use client';

import { useState } from 'react';
import BirthDetailsForm from '@/components/BirthDetailsForm';
import PlanetaryPositions from '@/components/PlanetaryPositions';
import HinduCalendar from '@/components/HinduCalendar';
import Logo from '@/components/Logo';
import { BirthDetails, PlanetData } from '@/types/astrology';
import { getPlanetaryPositions } from '@/services/astrologyService';

export default function Home() {
  const [planets, setPlanets] = useState<PlanetData[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (details: BirthDetails) => {
    try {
      setLoading(true);
      setError('');
      const response = await getPlanetaryPositions(details);
      setPlanets(response.output);
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      if (err instanceof Error) {
        setError(`Error: ${err.message}`);
      } else {
        setError('An unknown error occurred. Please check your API key and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-6 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center mb-6 sm:mb-8 gap-4">
          <Logo />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 font-mono text-center">
            Astrological Planetary Positions
          </h1>
        </div>
        
        <div className="mb-8">
          <HinduCalendar />
        </div>
        
        <BirthDetailsForm onSubmit={handleSubmit} />
        
        {loading && (
          <div className="text-center mt-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Calculating planetary positions...</p>
          </div>
        )}
        
        {error && (
          <div className="mt-8 p-4 bg-red-50 text-red-700 rounded-md">
            <h3 className="font-bold mb-2">Error</h3>
            <p>{error}</p>
            {error.includes('API key') && (
              <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 rounded-md">
                <p className="font-medium">How to fix:</p>
                <ol className="list-decimal list-inside mt-2 space-y-1">
                  <li>Create a file named <code className="bg-yellow-100 px-1 py-0.5 rounded">.env.local</code> in the root of your project</li>
                  <li>Add your API key: <code className="bg-yellow-100 px-1 py-0.5 rounded">NEXT_PUBLIC_ASTROLOGY_API_KEY=your_actual_api_key</code></li>
                  <li>Restart your Next.js development server</li>
                </ol>
              </div>
            )}
          </div>
        )}
        
        {planets.length > 0 && !loading && (
          <PlanetaryPositions planets={planets} />
        )}
      </div>
    </main>
  );
}
