import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { fetchMoods } from '../api/moodApi';

export default function Stats(){
  const [stats, setStats] = useState(null);

  useEffect(()=>{
    fetchMoods().then(res => {
      const data = res.data || [];
      const avg = data.length ? (data.reduce((s,i)=>s + (i.mood_score||0),0) / data.length).toFixed(2) : 0;
      const pos = data.filter(i => (i.mood_score||0) >= 4).length;
      setStats({ count: data.length, average: avg, positivePercent: data.length ? Math.round(pos/data.length*100) : 0 });
    });
  }, []);

  return (
    <div className="pt-2 pb-36">
      <Header title="Stats" subtitle="Overview" />
      <div className="px-5">
        <div className="glass-card mb-4">
          <div className="text-sm text-gray-500">Total Entries</div>
          <div className="text-2xl font-bold">{stats ? stats.count : '—'}</div>
        </div>
        <div className="glass-card mb-4">
          <div className="text-sm text-gray-500">Average Mood</div>
          <div className="text-2xl font-bold">{stats ? stats.average : '—'}</div>
        </div>
        <div className="glass-card">
          <div className="text-sm text-gray-500">Positive %</div>
          <div className="text-2xl font-bold">{stats ? stats.positivePercent + '%' : '—'}</div>
        </div>
      </div>
    </div>
  );
}
