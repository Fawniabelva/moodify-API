import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { fetchMoods } from '../api/moodApi';
import MoodCard from '../components/MoodCard';

export default function History(){
  const [moods, setMoods] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedHour, setSelectedHour] = useState('');
  const [filteredMoods, setFilteredMoods] = useState([]);
  const [filterMode, setFilterMode] = useState('all'); // all, date, date-hour

  useEffect(()=>{
    fetchMoods().then(res => setMoods(res.data || []));
  }, []);

  useEffect(() => {
    let filtered = moods;

    if (filterMode === 'date' && selectedDate) {
      filtered = moods.filter(mood => {
        const moodDate = new Date(mood.created_at).toISOString().split('T')[0];
        return moodDate === selectedDate;
      });
    } else if (filterMode === 'date-hour' && selectedDate && selectedHour) {
      filtered = moods.filter(mood => {
        const date = new Date(mood.created_at);
        const moodDate = date.toISOString().split('T')[0];
        const moodHour = date.getHours().toString().padStart(2, '0');
        return moodDate === selectedDate && moodHour === selectedHour;
      });
    }

    setFilteredMoods(filtered);
  }, [moods, selectedDate, selectedHour, filterMode]);

  const getUniqueDates = () => {
    return [...new Set(moods.map(mood => 
      new Date(mood.created_at).toISOString().split('T')[0]
    ))].sort().reverse();
  };

  const getHoursForDate = () => {
    if (!selectedDate) return [];
    const hoursSet = new Set();
    moods.forEach(mood => {
      const moodDate = new Date(mood.created_at).toISOString().split('T')[0];
      if (moodDate === selectedDate) {
        const hour = new Date(mood.created_at).getHours().toString().padStart(2, '0');
        hoursSet.add(hour);
      }
    });
    return Array.from(hoursSet).sort().reverse();
  };

  const groupByDateAndTime = (data) => {
    const grouped = {};
    
    data.forEach(mood => {
      const date = new Date(mood.created_at);
      const dateKey = date.toLocaleDateString('id-ID', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      const hour = date.getHours().toString().padStart(2, '0');
      
      if (!grouped[dateKey]) {
        grouped[dateKey] = {};
      }
      
      if (!grouped[dateKey][hour]) {
        grouped[dateKey][hour] = [];
      }
      
      grouped[dateKey][hour].push(mood);
    });

    return grouped;
  };

  const groupedMoods = groupByDateAndTime(filteredMoods);

  const handleResetFilter = () => {
    setSelectedDate('');
    setSelectedHour('');
    setFilterMode('all');
  };

  return (
    <div className="pt-2 pb-36">
      <Header title="History" subtitle="All logs" />
      <div className="px-5">
        {/* Filter Cards */}
        <div className="glass-card mb-4">
          <h3 className="font-semibold text-sm mb-4 text-gray-700">Filter Options</h3>
          
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition ${
                filterMode === 'all' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterMode('date')}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition ${
                filterMode === 'date' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              By Date
            </button>
            <button
              onClick={() => setFilterMode('date-hour')}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition ${
                filterMode === 'date-hour' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              By Date & Hour
            </button>
          </div>

          {/* Date Filter */}
          {(filterMode === 'date' || filterMode === 'date-hour') && (
            <div className="mb-3">
              <label className="text-sm text-gray-600 block mb-2 font-medium">Select Date</label>
              <input 
                type="date"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedHour('');
                }}
                className="input w-full"
              />
            </div>
          )}

          {/* Hour Filter */}
          {filterMode === 'date-hour' && selectedDate && (
            <div>
              <label className="text-sm text-gray-600 block mb-2 font-medium">Select Hour</label>
              <select
                value={selectedHour}
                onChange={(e) => setSelectedHour(e.target.value)}
                className="input w-full"
              >
                <option value="">Choose hour...</option>
                {getHoursForDate().map(hour => (
                  <option key={hour} value={hour}>
                    {hour}:00 - {hour}:59
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Active Filters Display */}
          {filterMode !== 'all' && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-600 mb-2">
                <strong>Active Filter:</strong>
              </p>
              {selectedDate && (
                <p className="text-xs text-gray-700 flex items-center justify-between">
                  <span>📅 {new Date(selectedDate + 'T00:00').toLocaleDateString('id-ID', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </p>
              )}
              {selectedHour && (
                <p className="text-xs text-gray-700">🕐 {selectedHour}:00</p>
              )}
              <button
                onClick={handleResetFilter}
                className="text-xs text-purple-600 hover:text-purple-700 font-medium mt-2 underline"
              >
                Clear Filter
              </button>
            </div>
          )}
        </div>

        {/* Results */}
        {filteredMoods.length === 0 ? (
          <div className="glass-card text-center py-8">
            <p className="text-gray-500">No logs found</p>
          </div>
        ) : (
          <div>
            <p className="text-xs text-gray-500 mb-3">
              Found <strong>{filteredMoods.length}</strong> mood{filteredMoods.length !== 1 ? 's' : ''}
            </p>
            {Object.entries(groupedMoods).map(([date, hours]) => (
              <div key={date} className="mb-6">
                <div className="font-semibold text-lg text-gray-700 mb-3">{date}</div>
                {Object.entries(hours).sort((a, b) => parseInt(b[0]) - parseInt(a[0])).map(([hour, items]) => (
                  <div key={`${date}-${hour}`} className="mb-4">
                    <div className="text-xs text-gray-500 px-3 py-1 bg-gradient-to-r from-purple-100 to-purple-50 rounded-full inline-block mb-2 font-medium">
                      🕐 {hour}:00 ({items.length} mood{items.length !== 1 ? 's' : ''})
                    </div>
                    <div className="space-y-2">
                      {items.map(m => <MoodCard key={m.id} item={m} />)}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
