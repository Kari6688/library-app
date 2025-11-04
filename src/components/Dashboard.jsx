import React from 'react'

export default function Dashboard({ items, yearGoal, setYearGoal }) {
  const currentYear = new Date().getFullYear()
  const readThisYear = items.filter(i => i.status === 'read' && (i.yearLogged === currentYear || new Date(i.createdAt?.seconds * 1000).getFullYear() === currentYear)).length
  const totalRead = items.filter(i => i.status === 'read').length

  return (
    <div className="bg-white p-4 rounded shadow mb-4 flex justify-between items-center">
      <div>
        <div className="text-sm text-gray-500">Total read</div>
        <div className="text-xl font-semibold">{totalRead}</div>
      </div>
      <div>
        <div className="text-sm text-gray-500">Yearly goal</div>
        <div className="flex items-center gap-3">
          <input type="number" value={yearGoal} onChange={(e) => setYearGoal(Number(e.target.value))} className="w-20 p-1 border rounded" />
          <div>{readThisYear} / {yearGoal}</div>
        </div>
      </div>
    </div>
  )
}
