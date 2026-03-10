# Assignment 11 — Implementation Evidence

## Overview

This document provides evidence of the implementation for Assignment 11: Appointments List UI and State Handling.

---

## Code Files

### 1. `src/pages/AppointmentsPage.jsx`

**Purpose**: Main appointments list page component

**Key Features**:
- Fetches appointment data from API
- Manages loading, error, and data states
- Provides provider and date filters
- Includes "Simulate Error" checkbox for testing error state

**State Variables**:
- `appointments` - Array of appointment objects
- `loading` - Boolean for loading state
- `error` - Error message string or null
- `provider` - Selected provider filter
- `date` - Selected date filter
- `simulateError` - Toggle for testing error state

**Key Functions**:
- `fetchAppointments()` - Async function using useCallback to fetch data
- `handleProviderChange()` - Updates provider filter
- `handleDateChange()` - Updates date filter
- `handleClearFilters()` - Resets all filters
- `handleSimulateErrorChange()` - Toggles error simulation

---

### 2. `src/components/LoadingState.jsx`

**Purpose**: Reusable loading state component

**Implementation**:
```jsx
function LoadingState() {
  return <p>Loading appointments...</p>;
}
```

---

### 3. `src/components/EmptyState.jsx`

**Purpose**: Reusable empty state component

**Implementation**:
```jsx
function EmptyState() {
  return <p>No appointments match your filters.</p>;
}
```

---

### 4. `src/components/ErrorState.jsx`

**Purpose**: Reusable error state component with retry capability

**Props**:
- `message` - Error message to display
- `onRetry` - Callback function to retry the failed request

**Implementation**:
```jsx
function ErrorState({ message, onRetry }) {
  return (
    <div>
      <p>Error: {message}</p>
      <button onClick={onRetry}>Retry</button>
    </div>
  );
}
```

---

### 5. `src/services/api.js`

**Purpose**: API service with mock data for testing

**Features**:
- Mock appointment data (5 sample records)
- Simulated network delay (500ms)
- Query parameter filtering (provider, date)
- Error simulation capability via `simulateError` query param

**Mock Data**:
```js
const mockAppointments = [
  { id: 1, provider: "Dr. Smith", date: "2026-03-10", time: "09:00", patient: "John Doe" },
  { id: 2, provider: "Dr. Johnson", date: "2026-03-11", time: "10:30", patient: "Jane Smith" },
  { id: 3, provider: "Dr. Smith", date: "2026-03-12", time: "14:00", patient: "Bob Wilson" },
  { id: 4, provider: "Dr. Williams", date: "2026-03-13", time: "11:00", patient: "Alice Brown" },
  { id: 5, provider: "Dr. Johnson", date: "2026-03-14", time: "15:30", patient: "Charlie Davis" },
];
```

---

### 6. `src/App.jsx`

**Purpose**: Main application with routing

**Route Added**:
```jsx
<Route path="/appointments" element={<AppointmentsPage />} />
```

---

## UI States Evidence

### Loading State
- Displayed during initial fetch and filter changes
- Shows "Loading appointments..." message
- Uses `LoadingState` component

### Data State
- Displays appointment table with columns: ID, Provider, Date, Time, Patient
- Shows filters above table
- Renders when `loading === false`, `error === null`, and `appointments.length > 0`

### Empty State
- Displayed when API returns empty array
- Shows "No appointments match your filters."
- Filters remain visible to allow adjustment

### Error State
- Displayed when API request fails
- Shows error message + Retry button
- Triggered via "Simulate Error" checkbox for testing

---

## Filter Behavior

| Filter | Type | Behavior |
|--------|------|----------|
| Provider | Dropdown | Filters by doctor name |
| Date | Date picker | Filters by specific date |
| Clear | Button | Resets all filters |
| Simulate Error | Checkbox | Triggers error state for testing |

---

## Testing Instructions

1. **Loading**: Navigate to `/appointments` - observe loading indicator briefly
2. **Data**: Default view shows all 5 appointments in table
3. **Empty**: Select "Dr. Williams" + date with no appointments
4. **Error**: Check "Simulate Error" checkbox, observe error message, click "Retry"

---

## Self-Check Answers

1. **What does user see during slow API response?**
   - Loading state component showing "Loading appointments..."

2. **How are empty and error states different?**
   - Empty = successful API response with 0 results
   - Error = failed API request with error message

3. **How are filters reset?**
   - Clicking "Clear" button sets provider and date to empty strings, triggering useEffect to refetch unfiltered data
