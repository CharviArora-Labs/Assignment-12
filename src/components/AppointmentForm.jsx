import { useState } from "react"

export default function AppointmentForm({ initialData = {}, onSubmit, isSubmitting = false, errors = {} }) {
  const [form, setForm] = useState({
    provider: initialData.provider || "",
    date: initialData.date || "",
    notes: initialData.notes || ""
  })

  const [touched, setTouched] = useState({})

  const validate = (values) => {
    const newErrors = {}
    if (!values.provider.trim()) {
      newErrors.provider = "Provider is required"
    }
    if (!values.date) {
      newErrors.date = "Date is required"
    }
    return newErrors
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate(form)
    setTouched({ provider: true, date: true })
    
    if (Object.keys(validationErrors).length > 0) {
      return
    }
    
    onSubmit(form)
  }

  const getFieldError = (field) => {
    return touched[field] && errors[field] ? errors[field] : null
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="provider">Provider</label>
        <input
          id="provider"
          name="provider"
          value={form.provider}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {getFieldError("provider") && <p className="error">{getFieldError("provider")}</p>}
      </div>

      <div>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {getFieldError("date") && <p className="error">{getFieldError("date")}</p>}
      </div>

      <div>
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={form.notes}
          onChange={handleChange}
        />
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </button>
    </form>
  )
}
