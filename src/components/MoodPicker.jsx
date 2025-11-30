import React from 'react';

const EMOJIS = [
  { icon: '🤩', score: 5, label: 'Very Happy' },
  { icon: '😊', score: 4, label: 'Happy' },
  { icon: '😐', score: 3, label: 'Neutral' },
  { icon: '😕', score: 2, label: 'Sad' },
  { icon: '😢', score: 1, label: 'Very Sad' }
];

export default function MoodPicker({ score, setScore }) {
  return (
    <div className="flex gap-3 overflow-x-auto py-2">
      {EMOJIS.map(e => (
        <button
          key={e.score}
          type="button"
          onClick={() => setScore(e.score)}
          className={`flex-shrink-0 flex flex-col items-center justify-center p-2 rounded-xl ${score === e.score ? 'emoji-btn selected' : ''}`}
          title={e.label}
        >
          <div className="mood-bubble">{e.icon}</div>
          <div className="text-xs mt-2 text-gray-600">{e.label}</div>
        </button>
      ))}
    </div>
  );
}
