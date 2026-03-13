import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AppointmentForm from "../components/AppointmentForm"
import api from "../services/api"

export default function AppointmentCreate() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const handleCreate = async (data) => {
    setIsSubmitting(true)
    setErrors({})

    try {
      await api.post("/api/appointments", data)
      navigate("/appointments")
    } catch (err) {
      if (err.errors) {
        setErrors(err.errors)
      } else {
        setErrors({ general: err.message || "Failed to create appointment" })
      }
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h1>Create Appointment</h1>
      {errors.general && <p className="error">{errors.general}</p>}
      <AppointmentForm onSubmit={handleCreate} isSubmitting={isSubmitting} errors={errors} />
    </div>
  )
}
