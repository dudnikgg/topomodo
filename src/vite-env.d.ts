/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'uniqid' {
  export default function uniqid(prefix?: string, moreEntropy?: boolean): string
}