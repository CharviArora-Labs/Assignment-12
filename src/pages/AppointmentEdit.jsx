import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import AppointmentForm from "../components/AppointmentForm"
import LoadingState from "../components/LoadingState"
import ErrorState from "../components/ErrorState"
import api from "../services/api"

export default function AppointmentEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [appointment, setAppointment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    api.fetchAppointment(id)
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
      await api.put(`/api/appointments/${id}`, form)
      navigate("/appointments")
    } catch (err) {
      if (err.errors) {
        setErrors(err.errors)
      } else {
        setErrors({ general: err.message || "Failed to update appointment" })
      }
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
