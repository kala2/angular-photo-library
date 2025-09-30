import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LocalStorageService } from '@app/shared/services/local-storage.service'
import { PhotoComponent } from './photo.component'
import { ActivatedRoute, provideRouter, Router } from '@angular/router'

describe('PhotoComponent', () => {
  let component: PhotoComponent
  let fixture: ComponentFixture<PhotoComponent>
  let localStorageService: LocalStorageService

  const queryParams = new Map([
    ['id', '1'],
    ['url', 'https://example.com/image-300.jpg']
  ])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoComponent],
      providers: [
        provideRouter([]),
        LocalStorageService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: {
                get: (key: string) => queryParams.get(key)
              }
            }
          }
        },
        { provide: Router, useValue: {} }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(PhotoComponent)

    component = fixture.componentInstance

    localStorageService = TestBed.inject(LocalStorageService)

    spyOn(localStorageService, 'set').and.callThrough()

    fixture.detectChanges()
  })

  it('should initialize id and url from query params', () => {
    expect(component.id).toBe(1)
    expect(component.url).toBe('https://example.com/image-600.jpg')
  })

  it('should add item to favorites if not already present', () => {
    localStorageService.set('favorites', [])

    expect(component.favorites().length).toBe(0)

    component.toggleFavorite()

    expect(component.favorites().length).toBe(1)
    expect(component.favorites()[0]).toEqual({
      id: 1,
      url: 'https://example.com/image-600.jpg'
    })
    expect(localStorageService.get('favorites')).toEqual([
      { id: 1, url: 'https://example.com/image-600.jpg' }
    ])
  })

  it('should remove item from favorites if already present', () => {
    localStorageService.set('favorites', [{ id: 1, url: 'https://example.com/image-300.jpg' }])

    component.favorites.set([{ id: 1, url: 'https://example.com/image-300.jpg' }])

    expect(component.favorites().length).toBe(1)

    component.toggleFavorite()
    expect(component.favorites().length).toBe(0)
  })
})
