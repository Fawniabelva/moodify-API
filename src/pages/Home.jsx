import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { fetchMoods } from '../api/moodApi';
import MoodCard from '../components/MoodCard';
import MoodPicker from '../components/MoodPicker';

export default function Home() {
  const [moods, setMoods] = useState([]);
  const [highlight, setHighlight] = useState(4);

  // State tambahan untuk highlight
  const [highlightMood, setHighlightMood] = useState("Happy");
  const [highlightEmoji, setHighlightEmoji] = useState("😊");

  useEffect(() => {
    fetchMoods().then(res => setMoods(res.data || []));
  }, []);

  // Saat quick pick dipilih
  function handleQuickPick(score) {
    setHighlight(score);

    // Mood berdasarkan skor
    if (score === 5) {
      setHighlightMood("Amazing");
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
      setHighlightMood("Awful");
      setHighlightEmoji("😞");
    }
  }

  return (
    <div className="pt-2 pb-36">
      <Header title="Halloo, Belvaa" subtitle="How are you feeling today?" />

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

        {/* RECENT LOGS */}
        <h3 className="text-lg font-semibold mb-3">Recent logs</h3>
        {moods.length === 0 ? (
          <div className="glass-card">No logs yet. Add your first mood.</div>
        ) : (
          moods.slice(0, 8).map(m => <MoodCard key={m.id} item={m} />)
        )}
      </div>
    </div>
  );
}
