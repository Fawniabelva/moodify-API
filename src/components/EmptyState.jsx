import React from 'react';

export default function EmptyState({ title='No data yet', subtitle='Add your first mood' }) {
  return (
    <div style={{padding:20, textAlign:'center', color:'#666'}}>
      <div style={{fontSize:42}}>🌤️</div>
      <h3 style={{marginBottom:6}}>{title}</h3>
      <p style={{marginTop:0}}>{subtitle}</p>
    </div>
  );
}
