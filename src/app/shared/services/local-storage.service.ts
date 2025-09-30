import { Injectable, signal, WritableSignal } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private signals = new Map<string, WritableSignal<any>>()

  get<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : null
    } catch {
      console.error(`Error parsing LocalStorage key "${key}"`)
      return null
    }
  }

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      this.updateSignal(key, value)
    } catch (err) {
      console.error(`Error setting LocalStorage key "${key}":`, err)
    }
  }

  remove(key: string): void {
    localStorage.removeItem(key)
    this.updateSignal(key, null)
  }

  clear() {
    localStorage.clear()
    this.signals.forEach((sig) => sig.set(null))
  }

  signal<T>(key: string, initial?: T): WritableSignal<T> {
    if (!this.signals.has(key)) {
      const initValue = this.get<T>(key) ?? initial ?? null
      const sig = signal<T | null>(initValue)
      this.signals.set(key, sig)

      window.addEventListener('storage', (event) => {
        if (event.key === key) {
          const newVal = event.newValue ? JSON.parse(event.newValue) : null
          sig.set(newVal)
        }
      })
    }

    return this.signals.get(key)!
  }

  private updateSignal<T>(key: string, value: T | null) {
    const sig = this.signals.get(key)
    if (sig) {
      sig.set(value)
    }
  }
}
