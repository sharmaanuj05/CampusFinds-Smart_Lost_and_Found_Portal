import { ImagePlus, Trash2, UploadCloud, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { cn, readImageFile } from '../../lib/utils'

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE = 5 * 1024 * 1024

export default function ImageUploader({ value, onChange }) {
  const inputRef = useRef(null)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState('')

  function handleFile(file) {
    if (!file) return
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Only JPG, PNG or WebP images are accepted.')
      return
    }
    if (file.size > MAX_SIZE) {
      setError('The image must be smaller than 5 MB.')
      return
    }
    setError('')
    readImageFile(file).then((dataUrl) => onChange(dataUrl))
  }

  function openPicker() {
    inputRef.current?.click()
  }

  if (value) {
    return (
      <div className="relative overflow-hidden rounded-xl border border-gray-300 bg-gray-50">
        <img
          src={value}
          alt="Preview of the item photo"
          className="h-56 w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/70 to-transparent p-3">
          <button
            type="button"
            onClick={openPicker}
            className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-100"
          >
            <UploadCloud className="size-4" aria-hidden="true" />
            Replace
          </button>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50"
          >
            <Trash2 className="size-4" aria-hidden="true" />
            Remove
          </button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          onChange={(event) => handleFile(event.target.files?.[0])}
        />
      </div>
    )
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        onChange={(event) => handleFile(event.target.files?.[0])}
      />
      <button
        type="button"
        onClick={openPicker}
        onDragOver={(event) => {
          event.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(event) => {
          event.preventDefault()
          setDragOver(false)
          handleFile(event.dataTransfer.files?.[0])
        }}
        className={cn(
          'flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-12 text-center transition-colors',
          dragOver
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100',
        )}
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-white text-indigo-600 shadow-sm">
          <ImagePlus className="size-6" aria-hidden="true" />
        </span>
        <span className="text-sm font-medium text-gray-900">
          {dragOver ? 'Drop to upload' : 'Drag & drop an image'}
        </span>
        <span className="text-xs text-gray-500">
          or <span className="font-medium text-indigo-600">click to browse</span>
          {' '}· JPG, PNG or WebP · up to 5 MB
        </span>
      </button>
      {error && (
        <p className="mt-2 flex items-center gap-1.5 text-sm text-red-600" role="alert">
          <X className="size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}