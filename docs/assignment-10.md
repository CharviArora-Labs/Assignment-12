# Assignment 10 — React Application Shell and Routing

Part of the **ILA Rails and React Engineering Certification – Level 1** track.

---

# Overview

This assignment focuses on building the frontend application shell and implementing a scalable routing architecture using React Router.

The project includes a shared layout, navigation, dashboard pages, and a reusable API client module.

---

# Implementation Summary

The following features were implemented:

- React Router configuration
- Shared layout component
- Dashboard list page
- Dashboard detail page
- Reusable API client module
- Fallback route handling for unknown URLs

---

# Route Architecture

The application uses **React Router** to manage navigation between pages.

### Route Map

| Route | Component | Purpose |
|------|------|------|
| `/` | DashboardList | Displays dashboard items |
| `/dashboard/:id` | DashboardDetail | Displays individual item |
| `*` | NotFound | Handles unknown routes |

Example route configuration:

```jsx
<BrowserRouter>
  <Routes>

    <Route element={<Layout />}>
      <Route path="/" element={<DashboardList />} />
      <Route path="/dashboard/:id" element={<DashboardDetail />} />
    </Route>

    <Route path="*" element={<NotFound />} />

  </Routes>
</BrowserRouter>
```

#### Application Layout

A shared layout component ensures that navigation remains consistent across all pages.

#### Layout Structure
```
Layout
 ├── Navigation
 └── Outlet (page content)
```
Example layout implementation:
````
import { Link, Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <div>
      <nav>
        <Link to="/">Dashboard</Link>
      </nav>

      <Outlet />
    </div>
  )
}
````
The Outlet component renders the currently active route inside the layout.

### Dashboard Pages
#### Dashboard List

The dashboard list page displays available dashboard items.

Example component:
```
export default function DashboardList() {
  return <h1>Dashboard List Page</h1>
}
```

#### Dashboard Detail

The dashboard detail page retrieves the ID from the URL using useParams.

Example:
```
import { useParams } from "react-router-dom"

export default function DashboardDetail() {
  const { id } = useParams()

  return <h1>Dashboard Detail: {id}</h1>
}
```

### API Client Module

A reusable API client module was implemented to centralize API requests.

Location:
```
src/services/api.js
```
Example implementation:
```
const BASE_URL = "http://localhost:3000/api"

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, options)

  if (!response.ok) {
    throw new Error("API request failed")
  }

  return response.json()
}

export default {
  get: (path) => request(path),
}
```
This approach prevents duplicated API logic and makes future changes easier.

### Routing Validation

The application was tested for the following scenarios:

| Scenario                          | Result     |
|----------------------------------|------------|
| Dashboard list loads             | Successful |
| Dashboard detail loads           | Successful |
| Navigation visible across pages  | Successful |
| Invalid routes handled           | Successful |


### Common Mistakes Avoided

> The implementation avoids several common issues:

> Hardcoding API calls in multiple components

> Missing fallback routes

> Mixing layout and page logic

> Tight coupling between navigation and page components

### Self-Check Questions
 Q) How can a new page be added cleanly? 
 A new page can be added by creating a component inside the pages directory and adding a new route in the router configuration.

 Q) Where should the API base URL live?
 The API base URL should be defined in the centralized API client module (services/api.js).

 Q) What happens on an unknown route?
 Unknown routes are handled by a wildcard route (*) which renders the NotFound component.


---
