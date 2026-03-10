# Assignment 11 — Appointments List UI and State Handling

Part of the **ILA Rails and React Engineering Certification – Level 1**

---

## Overview

This assignment implements an appointments list page with explicit UI states for loading, empty results, and errors. It demonstrates handling async data fetching and building resilient user interfaces.

---

## Features

- Appointments list with table display
- Provider and date filters
- Loading state component
- Empty state component  
- Error state with retry button

---

## Running the Project

```bash
npm install
npm run dev
```

Navigate to: `http://localhost:5173/appointments`

---

## Testing All States

1. **Loading** - Wait for initial data fetch (500ms simulated delay)
2. **Data** - View appointment table with filters
3. **Empty** - Filter by provider/date with no matches (e.g., Dr. Williams + 2026-03-20)
4. **Error** - Check "Simulate Error" checkbox, then click "Retry"

---

## Key Concepts

- Conditional rendering
- Async data fetching with useEffect/useCallback
- Separate UI state components
- Filter-driven state transitions
