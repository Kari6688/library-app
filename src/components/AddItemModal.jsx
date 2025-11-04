import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function AddItemModal({ onClose, onSave }) {
  const { register, handleSubmit } = useForm({ defaultValues: { type: 'book', status: 'want_to_read' } })
  const [file, setFile] = useState(null)
  const fileRef = useRef()

  const submit = (data) => {
    const prepared = {
      ...data,
      pages: data.pages ? Number(data.pages) : null,
      pagesRead: data.pagesRead ? Number(data.pagesRead) : 0,
      rating: data.rating ? Number(data.rating) : 0,
      yearLogged: data.yearLogged ? Number(data.yearLogged) : new Date().getFullYear(),
    }
    onSave(prepared, file)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded p-4 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-2">Add Item</h2>
        <form onSubmit={handleSubmit(submit)} className="space-y-2">
          <div>
            <label className="block text-sm">Type</label>
            <select {...register('type')} className="w-full p-1 border rounded">
              <option value="book">Book</option>
              <option value="movie">Movie</option>
              <option value="object">Object</option>
            </select>
          </div>

          <div>
            <label className="block text-sm">Title</label>
            <input {...register('title', { required: true })} className="w-full p-1 border rounded" />
          </div>

          <div>
            <label className="block text-sm">Author / Creator</label>
            <input {...register('author')} className="w-full p-1 border rounded" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm">Pages</label>
              <input {...register('pages')} type="number" className="w-full p-1 border rounded" />
            </div>
            <div>
              <label className="block text-sm">Pages Read</label>
              <input {...register('pagesRead')} type="number" className="w-full p-1 border rounded" />
            </div>
          </div>

          <div>
            <label className="block text-sm">Status</label>
            <select {...register('status')} className="w-full p-1 border rounded">
              <option value="want_to_read">Want to read</option>
              <option value="read">Read</option>
            </select>
          </div>

          <div>
            <label className="block text-sm">Rating (0-5, halves allowed)</label>
            <input {...register('rating')} type="number" step="0.5" min="0" max="5" className="w-full p-1 border rounded" />
          </div>

          <div>
            <label className="block text-sm">Year Logged</label>
            <input {...register('yearLogged')} type="number" className="w-full p-1 border rounded" />
          </div>

          <div>
            <label className="block text-sm">Cover image</label>
            <input ref={fileRef} onChange={(e) => setFile(e.target.files[0])} type="file" accept="image/*" className="w-full" />
          </div>

          <div className="flex justify-end gap-2 mt-3">
            <button type="button" onClick={onClose} className="px-3 py-1 rounded border">Cancel</button>
            <button type="submit" className="px-4 py-1 bg-blue-600 text-white rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}
