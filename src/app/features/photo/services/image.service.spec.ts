import { fakeAsync, TestBed, tick } from '@angular/core/testing'
import { ImageService } from './image.service'
import { ImageItem } from '@features/photo/interfaces/image.interface'

describe('ImageService', () => {
  let service: ImageService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(ImageService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should initialize with empty items and not loading', () => {
    expect(service.items()).toEqual([])
    expect(service.isLoading()).toBe(true)
  })

  it('should fetch items and contain elements', fakeAsync(() => {
    let fetchedItems: ImageItem[] = []

    service['itemsSource$'].subscribe((items) => {
      fetchedItems = items
    })

    service.offset.next()

    tick(900)

    expect(fetchedItems.length).toBeGreaterThan(0)
    expect(fetchedItems[0]).toEqual({ id: 21, url: 'https://picsum.photos/300/300?random=21' })
  }))

  it('should increment page correctly', fakeAsync(() => {
    expect(service['page']()).toBe(1)

    service['itemsSource$'].subscribe()

    service.offset.next()
    tick(900)
    expect(service['page']()).toBe(2)

    service.offset.next()
    tick(900)
    expect(service['page']()).toBe(3)
  }))
})
