import { PlanetData } from '@/types/astrology';

interface PlanetaryPositionsProps {
  planets: PlanetData[];
}

export default function PlanetaryPositions({ planets }: PlanetaryPositionsProps) {
  const zodiacSigns = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-4 sm:mb-6 text-indigo-800 font-mono">Planetary Positions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {planets.map((planet, index) => (
          <div
            key={index}
            className="bg-white p-3 sm:p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-base sm:text-lg font-semibold text-indigo-600 font-mono">{planet.name}</h3>
            <div className="mt-2 space-y-1">
              <p className="text-gray-600 font-mono text-sm sm:text-base">
                <span className="font-medium">Sign:</span>{' '}
                {zodiacSigns[planet.current_sign - 1]}
              </p>
              <p className="text-gray-600 font-mono text-sm sm:text-base">
                <span className="font-medium">Degree:</span>{' '}
                {planet.normDegree.toFixed(2)}°
              </p>
              <p className="text-gray-600 font-mono text-sm sm:text-base">
                <span className="font-medium">Status:</span>{' '}
                <span className={planet.isRetro === 'true' ? 'text-red-500' : 'text-green-500'}>
                  {planet.isRetro === 'true' ? 'Retrograde' : 'Direct'}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 