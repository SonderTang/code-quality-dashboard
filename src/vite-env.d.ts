/// <reference types="vite/client" />
declare module 'path' {
  import path from 'node:path'
  export default path
}

declare module '*.scss' {
  const content: Record<string, string>
  export default content
}