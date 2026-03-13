# Assignment 12 — Appointment Create/Edit Form

Part of the **ILA Rails and React Engineering Certification – Level 1**

---

## Overview

This assignment implements reusable form workflows for create and edit operations with validation feedback. It includes client-side and server-side validation, data persistence, and a responsive appointments management system.

---

## Features

### Appointments List (`/appointments`)
- Table display with ID, Provider, Date, Time, Patient, Notes columns
- Provider and date filters
- Edit links for each appointment
- Loading, empty, and error state handling

### Create Appointment (`/appointments/new`)
- Reusable form component
- Client-side validation (required provider and date)
- Server-side validation error mapping
- Loading state during submission
- Redirects to list on success

### Edit Appointment (`/appointments/:id/edit`)
- Fetches existing appointment data
- Pre-fills form with current values
- Same validation as create
- Updates persist to localStorage

### Form Component (`AppointmentForm`)
- Shared between create and edit
- Controlled inputs
- Field-specific error display
- Prevents duplicate submissions

### Data Persistence
- Mock API with localStorage
- Data survives page reloads
- Next ID auto-incrementing

---

## Running the Project

```bash
npm install
npm run dev
```

---

## Routes

| Path | Description |
|------|-------------|
| `/appointments` | Appointments list |
| `/appointments/new` | Create new appointment |
| `/appointments/:id/edit` | Edit existing appointment |

---

## Key Concepts

- Reusable form components
- Client-side and server-side validation
- Form state management
- Conditional rendering for UI states
- Data persistence with localStorage
- Async data fetching
- Error handling and mapping

---

## Testing Instructions

1. **View appointments**: Navigate to `/appointments`
2. **Create**: Go to `/appointments/new`, fill form, save
3. **Edit**: Click "Edit" on any row or visit `/appointments/1/edit`
4. **Validation**: Try submitting empty form
5. **Persistence**: Refresh page - data persists
