import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

interface TithiInfo {
  tithi: string;
  tithiNumber: number;
  paksha: 'Shukla' | 'Krishna';
  isEkadashi: boolean;
  ekadashiName?: string;
  nextEkadashi: {
    date: string;
    name: string;
    daysUntil: number;
  };
}

interface EkadashiInfo {
  date: string;
  name: string;
  daysUntil: number;
}

interface FestivalInfo {
  date: string;
  name: string;
  daysUntil: number;
}

const HinduCalendar: React.FC = () => {
  const [currentTithi, setCurrentTithi] = useState<TithiInfo | null>(null);
  const [nextEkadashis, setNextEkadashis] = useState<EkadashiInfo[]>([]);
  const [nextFestivals, setNextFestivals] = useState<FestivalInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHinduCalendarData = async () => {
      try {
        setLoading(true);
        
        // Get the API URL with a fallback
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
        const baseUrl = apiUrl.replace('/planets', '');
        
        // Fetch current Tithi
        const tithiResponse = await fetch(`${baseUrl}/hindu/current-tithi`);
        if (!tithiResponse.ok) throw new Error('Failed to fetch current Tithi');
        const tithiData = await tithiResponse.json();
        setCurrentTithi(tithiData);
        
        // Fetch next Ekadashis
        const ekadashiResponse = await fetch(`${baseUrl}/hindu/next-ekadashis`);
        if (!ekadashiResponse.ok) throw new Error('Failed to fetch next Ekadashis');
        const ekadashiData = await ekadashiResponse.json();
        setNextEkadashis(ekadashiData);
        
        // Fetch next festivals
        const festivalResponse = await fetch(`${baseUrl}/hindu/next-festivals`);
        if (!festivalResponse.ok) throw new Error('Failed to fetch next festivals');
        const festivalData = await festivalResponse.json();
        setNextFestivals(festivalData);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching Hindu calendar data:', err);
        setError('Failed to load Hindu calendar data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHinduCalendarData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 font-abiah">Hindu Calendar</h2>
      
      {/* Current Tithi */}
      {currentTithi && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Current Tithi</h3>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-lg">
              <span className="font-medium">{currentTithi.tithi}</span> ({currentTithi.paksha} Paksha)
            </p>
            {currentTithi.isEkadashi && (
              <p className="text-purple-700 font-medium mt-2">
                Today is {currentTithi.ekadashiName} - A special day for fasting
              </p>
            )}
          </div>
        </div>
      )}
      
      {/* Next Ekadashis */}
      {nextEkadashis.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Upcoming Ekadashis</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-purple-100 text-gray-700">
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Days Until</th>
                </tr>
              </thead>
              <tbody>
                {nextEkadashis.map((ekadashi, index) => (
                  <tr key={index} className="border-b hover:bg-purple-50">
                    <td className="py-2 px-4">{ekadashi.name}</td>
                    <td className="py-2 px-4">{format(new Date(ekadashi.date), 'MMMM d, yyyy')}</td>
                    <td className="py-2 px-4">{ekadashi.daysUntil} days</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Next Festivals */}
      {nextFestivals.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Upcoming Festivals</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-orange-100 text-gray-700">
                  <th className="py-2 px-4 text-left">Festival</th>
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Days Until</th>
                </tr>
              </thead>
              <tbody>
                {nextFestivals.map((festival, index) => (
                  <tr key={index} className="border-b hover:bg-orange-50">
                    <td className="py-2 px-4">{festival.name}</td>
                    <td className="py-2 px-4">{format(new Date(festival.date), 'MMMM d, yyyy')}</td>
                    <td className="py-2 px-4">{festival.daysUntil} days</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default HinduCalendar; 