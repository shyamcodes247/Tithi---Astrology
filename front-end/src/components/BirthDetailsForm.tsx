import { useState } from 'react';
import { BirthDetails } from '@/types/astrology';

interface BirthDetailsFormProps {
  onSubmit: (details: BirthDetails) => void;
}

export default function BirthDetailsForm({ onSubmit }: BirthDetailsFormProps) {
  const [formData, setFormData] = useState<BirthDetails>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
    hours: 0,
    minutes: 0,
    seconds: 0,
    latitude: 0,
    longitude: 0,
    timezone: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert empty strings to 0 before submitting
    const processedData: BirthDetails = {
      year: formData.year === '' ? 0 : formData.year,
      month: formData.month === '' ? 0 : formData.month,
      date: formData.date === '' ? 0 : formData.date,
      hours: formData.hours === '' ? 0 : formData.hours,
      minutes: formData.minutes === '' ? 0 : formData.minutes,
      seconds: formData.seconds === '' ? 0 : formData.seconds,
      latitude: formData.latitude === '' ? 0 : formData.latitude,
      longitude: formData.longitude === '' ? 0 : formData.longitude,
      timezone: formData.timezone === '' ? 0 : formData.timezone,
    };
    
    onSubmit(processedData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // If the input is empty, set it to an empty string in the state
    if (value === '') {
      setFormData(prev => ({
        ...prev,
        [name]: '',
      }));
    } else {
      // Otherwise, parse it as a float
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        setFormData(prev => ({
          ...prev,
          [name]: numValue,
        }));
      }
    }
  };

  const inputClassName = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900 font-mono";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-gray-900 font-mono">Enter Birth Details</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 font-mono">Year</label>
          <input
            type="number"
            name="year"
            value={formData.year === '' ? '' : formData.year}
            onChange={handleChange}
            className={inputClassName}
            placeholder="YYYY"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-900 font-mono">Month</label>
          <input
            type="number"
            name="month"
            min="1"
            max="12"
            value={formData.month === '' ? '' : formData.month}
            onChange={handleChange}
            className={inputClassName}
            placeholder="1-12"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-900 font-mono">Date</label>
          <input
            type="number"
            name="date"
            min="1"
            max="31"
            value={formData.date === '' ? '' : formData.date}
            onChange={handleChange}
            className={inputClassName}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-900 font-mono">Hours</label>
          <input
            type="number"
            name="hours"
            min="0"
            max="23"
            value={formData.hours === '' ? '' : formData.hours}
            onChange={handleChange}
            className={inputClassName}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-900 font-mono">Minutes</label>
          <input
            type="number"
            name="minutes"
            min="0"
            max="59"
            value={formData.minutes === '' ? '' : formData.minutes}
            onChange={handleChange}
            className={inputClassName}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-900 font-mono">Seconds</label>
          <input
            type="number"
            name="seconds"
            min="0"
            max="59"
            value={formData.seconds === '' ? '' : formData.seconds}
            onChange={handleChange}
            className={inputClassName}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-900 font-mono">Latitude</label>
          <input
            type="number"
            name="latitude"
            step="0.000001"
            value={formData.latitude === '' ? '' : formData.latitude}
            onChange={handleChange}
            className={inputClassName}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-900 font-mono">Longitude</label>
          <input
            type="number"
            name="longitude"
            step="0.000001"
            value={formData.longitude === '' ? '' : formData.longitude}
            onChange={handleChange}
            className={inputClassName}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-900 font-mono">Timezone</label>
          <input
            type="number"
            name="timezone"
            step="0.1"
            value={formData.timezone === '' ? '' : formData.timezone}
            onChange={handleChange}
            className={inputClassName}
          />
        </div>
      </div>
      
      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Calculate Positions
        </button>
      </div>
    </form>
  );
} 