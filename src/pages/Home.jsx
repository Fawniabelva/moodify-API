import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { fetchMoods } from '../api/moodApi';
import MoodCard from '../components/MoodCard';
import MoodPicker from '../components/MoodPicker';

export default function Home() {
  const [moods, setMoods] = useState([]);
  const [highlight, setHighlight] = useState(4);

  // Username (FIX ERROR)
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || "username";
  });

  // Highlight states
  const [highlightMood, setHighlightMood] = useState("Happy");
  const [highlightEmoji, setHighlightEmoji] = useState("😊");

  // Filter states
  const [filterDate, setFilterDate] = useState("");
  const [filterTime, setFilterTime] = useState("");

  useEffect(() => {
    fetchMoods().then(res => setMoods(res.data || []));
  }, []);

  function handleQuickPick(score) {
    setHighlight(score);

    if (score === 5) {
      setHighlightMood("Very Happy");
      setHighlightEmoji("🤩");
    } else if (score === 4) {
      setHighlightMood("Happy");
      setHighlightEmoji("😊");
    } else if (score === 3) {
      setHighlightMood("Neutral");
      setHighlightEmoji("😐");
    } else if (score === 2) {
      setHighlightMood("Sad");
      setHighlightEmoji("😢");
    } else {
      setHighlightMood("Very Sad");
      setHighlightEmoji("😞");
    }
  }

  // Filtering logs
  const filteredMoods = moods.filter(m => {
    const moodDate = new Date(m.created_at);

    // Filter by date
    if (filterDate) {
      const selected = new Date(filterDate);
      if (
        moodDate.getFullYear() !== selected.getFullYear() ||
        moodDate.getMonth() !== selected.getMonth() ||
        moodDate.getDate() !== selected.getDate()
      ) {
        return false;
      }
    }

    // Filter by time
    if (filterTime) {
      const [h, min] = filterTime.split(":");
      if (moodDate.getHours() !== Number(h) || moodDate.getMinutes() !== Number(min)) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="pt-2 pb-36">
      <Header 
        title={`Halloo, ${username}`} 
        subtitle="How are you feeling today?" 
      />
      
      <div className="px-5">
        
        {/* TODAY HIGHLIGHT */}
        <div className="glass-card mb-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Today's highlight</div>
              <div className="text-2xl font-bold mt-2">
                Mood: <span style={{ color: '#6A4FE0' }}>{highlightMood}</span>
              </div>
            </div>
            <div className="text-4xl">{highlightEmoji}</div>
          </div>
        </div>

        {/* QUICK PICK */}
        <div className="mb-4">
          <div className="text-sm text-gray-500 mb-2">Quick pick</div>
          <MoodPicker score={highlight} setScore={handleQuickPick} />
        </div>

        {/* FILTERS */}
        <div className="glass-card p-4 mb-4">
          <div className="text-sm font-semibold mb-2">Filter logs</div>

          <div className="flex flex-col gap-3">
            <div>
              <label className="text-xs text-gray-500">Date</label>
              <input
                type="date"
                className="w-full mt-1 p-2 rounded-lg border cursor-pointer"
                value={filterDate}
                onChange={e => setFilterDate(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs text-gray-500">Time</label>
              <input
                type="time"
                className="w-full mt-1 p-2 rounded-lg border cursor-pointer"
                value={filterTime}
                onChange={e => setFilterTime(e.target.value)}
              />
            </div>

            <button
              onClick={() => { setFilterDate(""); setFilterTime(""); }}
              className="mt-2 bg-purple-600 text-white py-2 rounded-lg"
            >
              Reset Filter
            </button>
          </div>
        </div>

        {/* RECENT LOGS */}
        <h3 className="text-lg font-semibold mb-3">Recent logs</h3>
        {filteredMoods.length === 0 ? (
          <div className="glass-card">No logs found with this filter.</div>
        ) : (
          filteredMoods.slice(0, 8).map(m => <MoodCard key={m.id} item={m} />)
        )}
      </div>
    </div>
  );
}