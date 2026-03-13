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
- Supports provider, date, and notes fields

**Props**:
- `initialData` - Pre-filled values (for edit mode)
- `onSubmit` - Callback function to handle form submission
- `isSubmitting` - Boolean to disable button during submission
- `errors` - Server-side validation errors object

**State Variables**:
- `form` - Object containing provider, date, notes
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
- Uses api.js for data persistence

---

### 3. `src/pages/AppointmentEdit.jsx`

**Purpose**: Edit appointment page

**Key Features**:
- Fetches existing appointment data on mount
- Uses shared `AppointmentForm` component with `initialData`
- Server-side validation error mapping
- Loading and error states for data fetching
- Success redirect after update
- Uses api.js for data persistence

---

### 4. `src/services/api.js`

**Purpose**: API service with mock data and validation simulation

**Key Features**:
- POST handler with validation
- PUT handler with validation
- Returns 422 status with field-specific errors for validation failures
- localStorage persistence - data survives page reloads
- Next ID tracking for new appointments

**Data Persistence**:
```jsx
const STORAGE_KEY = 'appointments';

function loadAppointments() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return [...defaultAppointments];
}

function saveAppointments(appointments) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
}
```

---

### 5. `src/pages/AppointmentsPage.jsx`

**Purpose**: Appointments list page

**Updates Made**:
- Added Notes column to table
- Added Edit links to each row
- Uses api.js for data fetching

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

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/appointments` | AppointmentsPage | List all appointments |
| `/appointments/new` | AppointmentCreate | Create new appointment |
| `/appointments/:id/edit` | AppointmentEdit | Edit existing appointment |

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
1. Navigate to `/appointments/new`
2. Fill in Provider, Date, and Notes
3. Click Save
4. Observe button shows "Saving..."
5. On success, redirect to `/appointments`
6. New appointment appears in list with Notes column

### Edit Flow
1. Navigate to `/appointments/1/edit` or click Edit link in list
2. Observe appointment data loaded in form
3. Modify fields and Notes
4. Click Save
5. On success, redirect to `/appointments`
6. Updated appointment appears in list

### Data Persistence
1. Create a new appointment
2. Refresh the browser page
3. Navigate to `/appointments`
4. Observe the new appointment is still there (saved in localStorage)
