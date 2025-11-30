import React, { useState } from 'react';
import Header from '../components/Header';
import MoodPicker from '../components/MoodPicker';
import { createMood } from '../api/moodApi';
import { useNavigate } from 'react-router-dom';

export default function AddMood(){
  const [note, setNote] = useState('');
  const [score, setScore] = useState(4);
  const [moodText, setMoodText] = useState('Happy');
  const nav = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    const payload = { user_id: 'user-001', mood: moodText, note, mood_score: score };
    const { data, error } = await createMood(payload);
    if (error) {
      alert('Error saving: ' + error.message);
      return;
    }
    nav('/');
  }

  return (
    <div className="pt-2 pb-36">
      <Header title="Add Mood" subtitle="Capture your feelings" />
      <div className="px-5">
        <form onSubmit={handleSubmit}>
          <label className="text-sm text-gray-600">Mood label</label>
          <input className="input mt-2" value={moodText} onChange={e=>setMoodText(e.target.value)} />

          <label className="text-sm text-gray-600 mt-4">Intensity</label>
          <MoodPicker score={score} setScore={setScore} />

          <label className="text-sm text-gray-600 mt-4">Note</label>
          <textarea className="textarea mt-2" placeholder="Write about your day..." value={note} onChange={e=>setNote(e.target.value)} />

          <button type="submit" className="btn-primary mt-6 w-full">Save Mood</button>
        </form>
      </div>
    </div>
  );
}
