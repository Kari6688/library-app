import React from 'react'

export default function ViewToggle({ view, setView }) {
  return (
    <div className="flex gap-2">
      <button onClick={() => setView('grid')} className={`px-2 py-1 rounded ${view==='grid'?'bg-gray-200':''}`}>Grid</button>
      <button onClick={() => setView('messy')} className={`px-2 py-1 rounded ${view==='messy'?'bg-gray-200':''}`}>Messy</button>
      <button onClick={() => setView('stack')} className={`px-2 py-1 rounded ${view==='stack'?'bg-gray-200':''}`}>Stack</button>
    </div>
  )
}
