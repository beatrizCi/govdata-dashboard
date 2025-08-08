// src/frontend/main.ts
import { createApp } from 'vue'
import App from './App.vue'

type Row = { departmentName: string; numberOfDatasets: number }

async function getInitialData(): Promise<Row[]> {
  const el = document.getElementById('departments-data')
  if (el) {
    try {
      return JSON.parse(el.textContent || '[]')
    } catch {
      return []
    }
  }

  // Fallback for Vite dev: fetch from backend JSON API
  try {
    const res = await fetch('/data') // see proxy note below
    if (!res.ok) throw new Error(String(res.status))
    return (await res.json()) as Row[]
  } catch {
    return []
  }
}

;(async () => {
  const departments = await getInitialData()
  createApp(App, { departments }).mount('#app')
})()
