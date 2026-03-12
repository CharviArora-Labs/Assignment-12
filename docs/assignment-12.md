# Assignment 12 — Appointment Create/Edit Form

## Overview

This document provides evidence of the implementation for Assignment 12: Appointment Create/Edit Form with validation handling.

---

## Code Files

### 1. `src/components/AppointmentForm.jsx`

**Purpose**: Reusable form component for both create and edit operations

**Key Features**:
- Client-side validation with error messages
- Controlled form state
- Loading state support via `isSubmitting` prop
- Prevents duplicate submission with disabled button
- Field-specific error display with touch tracking

**State Variables**:
- `form` - Object containing provider, date, notes
- `errors` - Object containing validation error messages
- `touched` - Object tracking which fields have been interacted with

**Validation Logic**:
```jsx
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
```

---

### 2. `src/pages/AppointmentCreate.jsx`

**Purpose**: Create appointment page

**Key Features**:
- Uses shared `AppointmentForm` component
- Server-side validation error mapping
- Loading state during submission
- Success redirect to appointments list
- Duplicate submit prevention

**Error Handling**:
```jsx
if (!response.ok) {
  if (result.errors) {
    setErrors(result.errors)
  } else {
    setErrors({ general: result.error || "Failed to create appointment" })
  }
  return
}
```

---

### 3. `src/pages/AppointmentEdit.jsx`

**Purpose**: Edit appointment page

**Key Features**:
- Fetches existing appointment data on mount
- Uses shared `AppointmentForm` component with `initialData`
- Server-side validation error mapping
- Loading and error states for data fetching
- Success redirect after update

---

### 4. `src/services/api.js`

**Purpose**: API service with mock data and validation simulation

**Key Features**:
- POST handler with validation
- PUT handler with validation
- Returns 422 status with field-specific errors for validation failures

**Validation Simulation**:
```jsx
const errors = {};
if (!data.provider || !data.provider.trim()) {
  errors.provider = "Provider is required";
}
if (!data.date) {
  errors.date = "Date is required";
}
```

---

## Validation Handling Evidence

### Client-Side Validation
- **Trigger**: On blur (when user leaves a field) and on submit
- **Display**: Inline error messages below each field
- **Prevention**: Submit button disabled when `isSubmitting` is true

### Server-Side Validation
- **Trigger**: On form submission
- **Response**: 422 status with `errors` object containing field-specific messages
- **Display**: Mapped to form fields via `errors` prop

### Validation Flow
1. User fills form and clicks Submit
2. Client-side validation runs first
3. If errors exist, display inline messages and stop
4. If valid, submit to API
5. API returns validation errors (if any)
6. Errors displayed inline via error prop mapping
7. On success, redirect to appointments list

---

## Self-Check Answers

### 1. Where is shared form logic stored?
The shared form logic is stored in `src/components/AppointmentForm.jsx`. This component handles:
- Form state management
- Client-side validation
- Field error display
- Submit handling

Both `AppointmentCreate` and `AppointmentEdit` import and use this component.

### 2. How are backend validation errors displayed?
Backend validation errors are:
- Returned from API as `{ errors: { field: "message" } }`
- Caught in the page component's catch block
- Passed to `AppointmentForm` via the `errors` prop
- Displayed inline below each field via conditional rendering

### 3. How do you prevent duplicate submit?
Duplicate submit is prevented by:
- Using `isSubmitting` state in page components
- Passing `isSubmitting` prop to AppointmentForm
- Disabling the submit button when `isSubmitting` is true
- Button text changes to "Saving..." during submission

---

## Testing Instructions

### Client-Side Validation
1. Navigate to `/appointments/new`
2. Click Submit without filling any fields
3. Observe "Provider is required" and "Date is required" messages

### Server-Side Validation
1. Submit empty form (bypassing client validation via console)
2. Observe server validation errors mapped to fields

### Create Flow
1. Fill in Provider and Date
2. Click Save
3. Observe button shows "Saving..."
4. On success, redirect to `/appointments`

### Edit Flow
1. Navigate to `/appointments/1/edit`
2. Observe appointment data loaded
3. Modify fields and Save
4. On success, redirect to `/appointments`
