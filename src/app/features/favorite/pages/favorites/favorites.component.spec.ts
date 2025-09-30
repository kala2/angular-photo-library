import { ComponentFixture, TestBed } from '@angular/core/testing'
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
    const favorites: number[] = [1]

    component.favorites.set(favorites)

    const rows = component.imageRows()
    expect(rows.length).toBe(1)
    expect(rows[0]).toEqual([
      {
        id: 1,
        url: `https://picsum.photos/id/1/300/300`
      }
    ])
  })

  it('should pass computed imageRows to PhotoListComponent', () => {
    const favorites: number[] = [1, 2, 3, 4, 5]

    component.favorites.set(favorites)

    fixture.detectChanges()

    const photoElements = fixture.debugElement.queryAll(By.css('app-photo-card'))

    expect(photoElements.length).toEqual(favorites.length)
  })
})
