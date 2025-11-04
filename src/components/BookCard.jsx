import React, { useState } from 'react'
import StarRatings from 'react-star-ratings'

export default function BookCard({ item, view, updateProgress }) {
  const [pagesRead, setPagesRead] = useState(item.pagesRead || 0)

  const percent = item.pages ? Math.round((pagesRead / item.pages) * 100) : Math.round((item.progress || 0) * 100)

  const saveProgress = () => {
    updateProgress(item.id, { pagesRead })
  }

  const cardStyle = view === 'messy' ? { transform: `rotate(${(Math.random()-0.5)*6}deg)` } : {}

  if (view === 'stack') {
    return (
      <div style={{ position: 'absolute', left: `${Math.random()*40}%`, top: `${Math.random()*40}px` }} className="w-56 p-3 bg-white rounded shadow">
        <h3 className="font-semibold">{item.title}</h3>
        <div className="text-sm text-gray-500">{item.author}</div>
      </div>
    )
  }

  return (
    <div style={cardStyle} className="bg-white rounded shadow p-3">
      <div className="h-48 flex items-center justify-center overflow-hidden mb-2 bg-gray-100">
        {item.image ? <img src={item.image} alt={item.title} className="object-contain h-full"/> : <div className="text-gray-400">No image</div>}
      </div>
      <h3 className="font-semibold truncate">{item.title}</h3>
      <div className="text-sm text-gray-500">{item.author}</div>

      <div className="my-2">
        <StarRatings
          rating={item.rating || 0}
          starRatedColor="gold"
          changeRating={(r) => updateProgress(item.id, { rating: r })}
          numberOfStars={5}
          name={`rating-${item.id}`}
          isSelectable={true}
          starDimension="18px"
          starSpacing="2px"
        />
      </div>

      <div className="text-sm">{percent}% — {pagesRead} / {item.pages || '—'}</div>
      <div className="flex gap-2 mt-2">
        <input type="number" value={pagesRead} min={0} max={item.pages || 99999} onChange={(e) => setPagesRead(Number(e.target.value))} className="w-24 p-1 border rounded" />
        <button onClick={saveProgress} className="px-3 py-1 bg-green-600 text-white rounded">Save</button>
      </div>
    </div>
  )
}
