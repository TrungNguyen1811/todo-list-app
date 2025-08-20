import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

// Lazy load component


const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<div>Loading layout...</div>}>
        {/* <HomeLayout /> */}
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading page...</div>}>
            {/* <HomePage /> */}
          </Suspense>
        ),
      },
    ],
  },
])

export default router