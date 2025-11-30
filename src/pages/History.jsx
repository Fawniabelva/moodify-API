import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { fetchMoods } from '../api/moodApi';
import MoodCard from '../components/MoodCard';

export default function History(){
  const [moods, setMoods] = useState([]);

  useEffect(()=>{
    fetchMoods().then(res => setMoods(res.data || []));
  }, []);

  return (
    <div className="pt-2 pb-36">
      <Header title="History" subtitle="All logs" />
      <div className="px-5">
        {moods.length === 0 ? <div className="glass-card">No logs yet</div> : moods.map(m => <MoodCard key={m.id} item={m} />)}
      </div>
    </div>
  );
}
