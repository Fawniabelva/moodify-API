import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';

function moodColor(score) {
  if (score >= 5) return 'bg-green-100';
  if (score >= 4) return 'bg-emerald-100';
  if (score >= 3) return 'bg-yellow-100';
  if (score >= 2) return 'bg-orange-100';
  return 'bg-red-100';
}

export default function MoodCard({ item }) {
  return (
    <Link to={`/detail/${item.id}`} className="block">
      <div className="glass-card mb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-lg">{item.mood} <span className="text-sm text-gray-500">· {item.mood_score}/5</span></div>
            <div className="text-sm text-gray-600 mt-2">{item.note}</div>
          </div>
          <div className="text-right text-xs text-gray-400">{formatDate(item.created_at)}</div>
        </div>
      </div>
    </Link>
  );
}
