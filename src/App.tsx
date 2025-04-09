import { Suspense } from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import { Routes, BrowserRouter as Router, RouterProvider } from 'react-router-dom'
import { router } from './router'


function App() {

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router}>
        </RouterProvider>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
