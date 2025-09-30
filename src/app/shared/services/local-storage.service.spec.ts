import { TestBed } from '@angular/core/testing'
import { LocalStorageService } from './local-storage.service'

describe('LocalStorageService', () => {
  let service: LocalStorageService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService]
    })
    service = TestBed.inject(LocalStorageService)

    localStorage.clear()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('get', () => {
    it('should return null if key not found', () => {
      expect(service.get('missing')).toBeNull()
    })

    it('should return parsed value if key exists', () => {
      localStorage.setItem('foo', JSON.stringify({ a: 1 }))
      expect(service.get<{ a: number }>('foo')).toEqual({ a: 1 })
    })

    it('should handle invalid JSON gracefully', () => {
      localStorage.setItem('bad', 'not-json')
      const spy = spyOn(console, 'error')
      expect(service.get('bad')).toBeNull()
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('set', () => {
    it('should store value and update signal if present', () => {
      const sig = service.signal<{ b: number } | null>('bar', null)
      service.set('bar', { b: 2 })

      expect(JSON.parse(localStorage.getItem('bar')!)).toEqual({ b: 2 })
      expect(sig()).toEqual({ b: 2 })
    })

    it('should log error if localStorage fails', () => {
      spyOn(localStorage, 'setItem').and.throwError('Quota exceeded')
      const spy = spyOn(console, 'error')
      service.set('fail', { test: 1 })
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('remove', () => {
    it('should remove value and update signal', () => {
      service.set('baz', 123)
      const sig = service.signal('baz')
      service.remove('baz')

      expect(localStorage.getItem('baz')).toBeNull()
      expect(sig()).toBeNull()
    })
  })

  describe('clear', () => {
    it('should clear all storage and reset signals', () => {
      service.set('x', 1)
      service.set('y', 2)
      const sigX = service.signal('x')
      const sigY = service.signal('y')

      service.clear()

      expect(localStorage.length).toBe(0)
      expect(sigX()).toBeNull()
      expect(sigY()).toBeNull()
    })
  })

  describe('signal', () => {
    it('should initialize from existing localStorage', () => {
      localStorage.setItem('init', JSON.stringify('abc'))
      const sig = service.signal<string>('init')
      expect(sig()).toBe('abc')
    })

    it('should initialize with provided default if no localStorage', () => {
      const sig = service.signal('default', 'start')
      expect(sig()).toBe('start')
    })

    it('should react to storage events from other contexts', () => {
      const sig = service.signal('crossTab')
      const event = new StorageEvent('storage', {
        key: 'crossTab',
        newValue: JSON.stringify('updated')
      })

      window.dispatchEvent(event)
      expect(sig()).toBe('updated')
    })
  })
})
