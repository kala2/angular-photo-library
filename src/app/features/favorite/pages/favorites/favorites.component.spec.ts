import { WritableSignal } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ImageItem } from '@app/features/photo/interfaces/image.interface'
import { LocalStorageService } from '@shared/services/local-storage.service'
import { FavoritesComponent } from './favorites.component'
import { PhotoListComponent } from '@shared/components/photo-list/photo-list.component'
import { By } from '@angular/platform-browser'
import { provideRouter } from '@angular/router'

describe('FavoritesComponent', () => {
  let component: FavoritesComponent
  let fixture: ComponentFixture<FavoritesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesComponent, PhotoListComponent],
      providers: [LocalStorageService, provideRouter([])]
    }).compileComponents()

    fixture = TestBed.createComponent(FavoritesComponent)
    component = fixture.componentInstance

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should slice favorites into rows of 5', () => {
    const favorites: ImageItem[] = [
      { id: 1, url: 'a' },
      { id: 2, url: 'b' },
      { id: 3, url: 'c' },
      { id: 4, url: 'd' },
      { id: 5, url: 'e' },
      { id: 6, url: 'f' }
    ]

    ;(component.favorites as WritableSignal<ImageItem[]>).set(favorites)

    const rows = component.imageRows()
    expect(rows.length).toBe(2)
    expect(rows[0].map((i) => i.id)).toEqual([1, 2, 3, 4, 5])
    expect(rows[1].map((i) => i.id)).toEqual([6])
  })

  it('should pass computed imageRows to PhotoListComponent', () => {
    const favorites: ImageItem[] = [
      { id: 1, url: 'a' },
      { id: 2, url: 'b' },
      { id: 3, url: 'c' },
      { id: 4, url: 'd' },
      { id: 5, url: 'e' }
    ]

    ;(component.favorites as WritableSignal<ImageItem[]>).set(favorites)

    fixture.detectChanges()

    const photoElements = fixture.debugElement.queryAll(By.css('app-photo'))

    expect(photoElements.length).toEqual(favorites.length)
  })
})
