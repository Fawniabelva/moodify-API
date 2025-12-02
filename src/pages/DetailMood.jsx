import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { fetchMoodById, removeMood } from '../api/moodApi';
import { useParams, useNavigate } from 'react-router-dom';

export default function DetailMood(){
  const { id } = useParams();
  const [mood, setMood] = useState(null);
  const nav = useNavigate();

  useEffect(()=> {
    fetchMoodById(id).then(res => setMood(res.data || null));
  }, [id]);

  async function handleDelete(){
    if (!confirm('Delete this entry?')) return;
    await removeMood(id);
    nav('/history');
  }

  if (!mood) return <p className="p-4">Loading...</p>;

  return (
    <div className="pt-2 pb-36">
      <Header title="Mood Detail" subtitle={mood.mood} />
      <div className="px-5">
        <div className="glass-card">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xl font-semibold">{mood.mood} · <span className="text-sm text-gray-500">{mood.mood_score}/5</span></div>
              <div className="text-sm text-gray-600 mt-3">{mood.note}</div>
            </div>
            <div className="text-xs text-gray-400">{new Date(mood.created_at).toLocaleString()}</div>
          </div>
        </div>

        <button className="btn-primary mt-4" onClick={()=>nav('/add')}>Edit</button>
        <button className="btn-danger mt-3 w-full" onClick={handleDelete}>Delete Entry</button>
      </div>
    </div>
  );
}
