import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LocalStorageService } from '@app/shared/services/local-storage.service'
import { PhotoComponent } from './photo.component'
import { ActivatedRoute, provideRouter, Router } from '@angular/router'

describe('PhotoComponent', () => {
  let component: PhotoComponent
  let fixture: ComponentFixture<PhotoComponent>
  let localStorageService: LocalStorageService

  const paramMap = new Map([['id', '1']])

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
              paramMap: {
                get: (key: string) => paramMap.get(key)
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

    localStorageService.set('favorites', [])

    spyOn(localStorageService, 'set').and.callThrough()

    fixture.detectChanges()
  })

  it('should initialize id from params', () => {
    expect(component.id).toBe(1)
  })

  it('should add item to favorites if not already present', () => {
    expect(component.favorites().length).toBe(0)

    component.toggleFavorite()

    expect(component.favorites().length).toBe(1)
    expect(component.favorites()[0]).toEqual(1)
    expect(localStorageService.get('favorites')).toEqual([1])
  })

  it('should remove item from favorites if already present', () => {
    localStorageService.set('favorites', [1])

    component.favorites.set([1])

    expect(component.favorites().length).toBe(1)

    component.toggleFavorite()
    expect(component.favorites().length).toBe(0)
  })
})
