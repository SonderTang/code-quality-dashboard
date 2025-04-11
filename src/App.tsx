import { Suspense } from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import { Routes, BrowserRouter as Router, RouterProvider } from 'react-router-dom'
import { router } from './router'
import LoadingSpinner from './components/LoadingSpinner'


function App() {

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <RouterProvider router={router}>
        </RouterProvider>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
