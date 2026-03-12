import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import AppointmentForm from "../components/AppointmentForm"
import LoadingState from "../components/LoadingState"
import ErrorState from "../components/ErrorState"

export default function AppointmentEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [appointment, setAppointment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    fetch(`/api/appointments/${id}`)
      .then(r => {
        if (!r.ok) throw new Error("Failed to load appointment")
        return r.json()
      })
      .then(data => {
        setAppointment(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  const handleUpdate = async (form) => {
    setIsSubmitting(true)
    setErrors({})

    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })

      const result = await response.json()

      if (!response.ok) {
        if (result.errors) {
          setErrors(result.errors)
        } else {
          setErrors({ general: result.error || "Failed to update appointment" })
        }
        setIsSubmitting(false)
        return
      }

      navigate("/appointments")
    } catch {
      setErrors({ general: "Network error. Please try again." })
      setIsSubmitting(false)
    }
  }

  if (loading) return <LoadingState />
  if (error) return <ErrorState message={error} onRetry={() => window.location.reload()} />

  return (
    <div>
      <h1>Edit Appointment</h1>
      {errors.general && <p className="error">{errors.general}</p>}
      <AppointmentForm 
        initialData={appointment} 
        onSubmit={handleUpdate} 
        isSubmitting={isSubmitting}
        errors={errors}
      />
    </div>
  )
}
