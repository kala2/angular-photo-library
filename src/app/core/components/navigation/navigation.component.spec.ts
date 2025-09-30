import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NavigationComponent } from './navigation.component'
import { provideRouter } from '@angular/router'
import { LocalStorageService } from '@app/shared/services/local-storage.service'
import { By } from '@angular/platform-browser'

describe('NavigationComponent', () => {
  let component: NavigationComponent
  let fixture: ComponentFixture<NavigationComponent>
  let localStorageService: LocalStorageService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationComponent],
      providers: [provideRouter([]), LocalStorageService]
    }).compileComponents()

    fixture = TestBed.createComponent(NavigationComponent)

    localStorageService = TestBed.inject(LocalStorageService)

    localStorageService.set('favorites', [])

    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should render app title', () => {
    const title = fixture.debugElement.query(By.css('.app-title')).nativeElement
    expect(title.textContent).toContain('Angular photo library')
  })

  it('should have Photos and Favorites links', () => {
    const links = fixture.debugElement.queryAll(By.css('.nav-link'))
    const texts = links.map((el) => el.nativeElement.textContent.trim())

    expect(texts).toContain('Photos')
    expect(texts).toContain('Favorites')
  })

  it('should not show badge when favorites is empty', () => {
    const badgeElement: HTMLElement | null =
      fixture.nativeElement.querySelector('.mat-badge-content')

    expect(badgeElement).toBeNull()
  })

  it('should show badge count when favorites exist', () => {
    localStorageService.set('favorites', [1, 2, 3])
    fixture.detectChanges()

    const badgeElement: HTMLElement | null =
      fixture.nativeElement.querySelector('.mat-badge-content')

    expect(badgeElement).not.toBeNull()
    expect(badgeElement!.textContent).toBe('3')
  })
})
