import { useState } from 'react'
import { CATEGORIES, ITEM_LOCATIONS } from '../../data/mockItems'
import { cn } from '../../lib/utils'
import Button from '../ui/Button'
import Field from '../ui/Field'
import { inputClass, selectClass, textareaClass } from '../../lib/fieldStyles'
import ImageUploader from './ImageUploader'

const initialState = {
  type: '',
  name: '',
  category: '',
  description: '',
  image: null,
  location: '',
  customLocation: '',
  date: '',
  time: '',
  extraDetails: '',
}

export default function ItemForm({ onSubmit, submitting, initialValues }) {
  const [form, setForm] = useState(() => {
    const base = { ...initialState, ...(initialValues || {}) }
    const location = initialValues?.location || ''
    return {
      ...base,
      location: ITEM_LOCATIONS.includes(location) ? location : location ? 'Other' : '',
      customLocation: ITEM_LOCATIONS.includes(location) ? '' : location,
    }
  })
  const [errors, setErrors] = useState({})

  const update = (patch) => setForm((current) => ({ ...current, ...patch }))
  const location = form.location === 'Other' ? form.customLocation : form.location

  function validate() {
    const next = {}
    if (!form.type) next.type = 'Choose whether you lost or found an item.'
    if (!form.name.trim()) next.name = 'Enter the item name.'
    if (!form.category) next.category = 'Choose a category.'
    if (!form.description.trim())
      next.description = 'Describe the item so it can be matched.'
    if (!location.trim()) next.location = 'Enter where this happened.'
    if (!form.date) next.date = 'Pick the date.'
    if (!form.time) next.time = 'Pick an approximate time.'
    return next
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      const first = document.querySelector('[aria-invalid="true"]')
      first?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    onSubmit({
      type: form.type,
      name: form.name.trim(),
      category: form.category,
      description: form.description.trim(),
      image: form.image,
      location: location.trim(),
      date: form.date,
      time: form.time,
      extraDetails: form.extraDetails.trim(),
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      <fieldset>
        <legend className="mb-3 text-sm font-medium text-gray-700">
          Report type <span className="text-red-600">*</span>
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { value: 'lost', label: 'I Lost Something', hint: 'Describe what you lost and where' },
            { value: 'found', label: 'I Found Something', hint: 'Describe the item you found' },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={form.type === option.value}
              onClick={() => {
                update({ type: option.value })
                setErrors((current) => ({ ...current, type: '' }))
              }}
              className={cn(
                'rounded-xl border-2 p-4 text-left transition-colors',
                form.type === option.value
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 bg-white hover:border-gray-300',
              )}
            >
              <span className="block font-medium text-gray-900">{option.label}</span>
              <span className="mt-0.5 block text-xs text-gray-500">{option.hint}</span>
            </button>
          ))}
        </div>
        {errors.type && (
          <p className="mt-2 text-sm text-red-600" role="alert">{errors.type}</p>
        )}
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Item name"
          htmlFor="item-name"
          required
          error={errors.name}
        >
          <input
            id="item-name"
            className={inputClass}
            value={form.name}
            onChange={(event) => update({ name: event.target.value })}
            placeholder="e.g. Black Lenovo backpack"
            aria-invalid={Boolean(errors.name)}
          />
        </Field>

        <Field
          label="Category"
          htmlFor="item-category"
          required
          error={errors.category}
        >
          <select
            id="item-category"
            className={selectClass}
            value={form.category}
            onChange={(event) => update({ category: event.target.value })}
            aria-invalid={Boolean(errors.category)}
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label="Description"
        htmlFor="item-description"
        required
        error={errors.description}
        hint="Mention colour, brand, condition or anything helpful for matching."
      >
        <textarea
          id="item-description"
          rows={4}
          className={textareaClass}
          value={form.description}
          onChange={(event) => update({ description: event.target.value })}
          placeholder="e.g. Black backpack with a grey laptop sleeve…"
          aria-invalid={Boolean(errors.description)}
        />
      </Field>

      <Field
        label="Photo"
        hint="Photos help the matching system rank similar reports."
      >
        <ImageUploader
          value={form.image}
          onChange={(image) => update({ image })}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Location"
          htmlFor="item-location"
          required
          error={errors.location}
        >
          <select
            id="item-location"
            className={selectClass}
            value={form.location}
            onChange={(event) => update({ location: event.target.value })}
            aria-invalid={Boolean(errors.location)}
          >
            <option value="">Select a location</option>
            {ITEM_LOCATIONS.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
            <option value="Other">Other location…</option>
          </select>
        </Field>

        {form.location === 'Other' && (
          <Field
            label="Custom location"
            htmlFor="custom-location"
            required
            error={errors.customLocation}
          >
            <input
              id="custom-location"
              className={inputClass}
              value={form.customLocation}
              onChange={(event) => update({ customLocation: event.target.value })}
              placeholder="e.g. Hall 4 staircase"
              aria-invalid={Boolean(errors.customLocation)}
            />
          </Field>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Date" htmlFor="item-date" required error={errors.date}>
          <input
            id="item-date"
            type="date"
            className={inputClass}
            value={form.date}
            max={new Date().toISOString().slice(0, 10)}
            onChange={(event) => update({ date: event.target.value })}
            aria-invalid={Boolean(errors.date)}
          />
        </Field>

        <Field label="Approximate time" htmlFor="item-time" required error={errors.time}>
          <input
            id="item-time"
            type="time"
            className={inputClass}
            value={form.time}
            onChange={(event) => update({ time: event.target.value })}
            aria-invalid={Boolean(errors.time)}
          />
        </Field>
      </div>

      <Field
        label="Additional details (optional)"
        htmlFor="item-extra"
        hint="Anything you are comfortable sharing publicly."
      >
        <textarea
          id="item-extra"
          rows={3}
          className={textareaClass}
          value={form.extraDetails}
          onChange={(event) => update({ extraDetails: event.target.value })}
          placeholder="e.g. Inside pocket of my backpack…"
        />
      </Field>

      <div className="flex flex-col-reverse items-stretch gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">
        <Button type="submit" size="lg" disabled={submitting}>
          {submitting ? 'Submitting report…' : 'Submit Report'}
        </Button>
      </div>
    </form>
  )
}