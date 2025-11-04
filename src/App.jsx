import React, { useEffect, useState } from 'react'
import { collection, addDoc, onSnapshot, query, orderBy, updateDoc, doc, where } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage, now } from './firebase'
import BookCard from './components/BookCard'
import AddItemModal from './components/AddItemModal'
import ViewToggle from './components/ViewToggle'
import Dashboard from './components/Dashboard'

export default function App() {
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState('all')
  const [view, setView] = useState('grid')
  const [showAdd, setShowAdd] = useState(false)
  const [yearGoal, setYearGoal] = useState(12)

  useEffect(() => {
    const q = query(collection(db, 'items'), orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(q, (snap) => {
      const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      setItems(arr)
    })
    return () => unsub()
  }, [])

  const addItem = async (data, imageFile) => {
    try {
      let imageUrl = data.image || ''
      if (imageFile) {
        const storageRef = ref(storage, `images/${Date.now()}_${imageFile.name}`)
        await uploadBytes(storageRef, imageFile)
        imageUrl = await getDownloadURL(storageRef)
      }
      await addDoc(collection(db, 'items'), { ...data, image: imageUrl, createdAt: now() })
      setShowAdd(false)
    } catch (e) {
      console.error(e)
    }
  }

  const updateProgress = async (id, updates) => {
    const d = doc(db, 'items', id)
    await updateDoc(d, updates)
  }

  const filtered = items.filter(it => {
    if (filter === 'all') return true
    if (filter === 'read') return it.status === 'read'
    if (filter === 'want') return it.status === 'want_to_read'
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Library</h1>
        <div className="flex gap-3 items-center">
          <button onClick={() => setShowAdd(true)} className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
          <ViewToggle view={view} setView={setView} />
        </div>
      </header>

      <Dashboard items={items} yearGoal={yearGoal} setYearGoal={setYearGoal} />

      <nav className="my-4 flex gap-3">
        <button onClick={() => setFilter('all')} className={`px-3 py-1 rounded ${filter==='all'? 'bg-gray-300':''}`}>All</button>
        <button onClick={() => setFilter('read')} className={`px-3 py-1 rounded ${filter==='read'? 'bg-gray-300':''}`}>Read</button>
        <button onClick={() => setFilter('want')} className={`px-3 py-1 rounded ${filter==='want'? 'bg-gray-300':''}`}>Want to Read</button>
      </nav>

      <main>
        <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4' : view === 'messy' ? 'grid grid-cols-2 gap-4' : 'relative h-[520px]'}>
          {filtered.map(item => (
            <BookCard key={item.id} item={item} view={view} updateProgress={updateProgress} />
          ))}
        </div>
      </main>

      {showAdd && <AddItemModal onClose={() => setShowAdd(false)} onSave={addItem} />}
    </div>
  )
}
