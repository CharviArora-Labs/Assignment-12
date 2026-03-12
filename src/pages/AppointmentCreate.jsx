import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AppointmentForm from "../components/AppointmentForm"

export default function AppointmentCreate() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const handleCreate = async (data) => {
    setIsSubmitting(true)
    setErrors({})

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (!response.ok) {
        if (result.errors) {
          setErrors(result.errors)
        } else {
          setErrors({ general: result.error || "Failed to create appointment" })
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

  return (
    <div>
      <h1>Create Appointment</h1>
      {errors.general && <p className="error">{errors.general}</p>}
      <AppointmentForm onSubmit={handleCreate} isSubmitting={isSubmitting} errors={errors} />
    </div>
  )
}
