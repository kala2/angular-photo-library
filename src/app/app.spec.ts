import { ComponentFixture, TestBed } from '@angular/core/testing'
import { App } from './app'
import { NavigationComponent } from '@core/components/navigation/navigation.component'
import { provideRouter, RouterOutlet } from '@angular/router'
import { LocalStorageService } from '@shared/services/local-storage.service'

describe('AppComponent', () => {
  let component: App
  let fixture: ComponentFixture<App>
  let localStorageService: LocalStorageService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, RouterOutlet, NavigationComponent],
      providers: [provideRouter([]), LocalStorageService]
    }).compileComponents()

    fixture = TestBed.createComponent(App)

    localStorageService = TestBed.inject(LocalStorageService)

    localStorageService.set('favorites', [])

    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the app', () => {
    expect(component).toBeTruthy()
  })

  it('should have app-navigation component', () => {
    const navigationElement = fixture.nativeElement.querySelector('app-navigation')
    expect(navigationElement).toBeTruthy()
  })

  it('should have router-outlet component', () => {
    const routerOutletElement = fixture.nativeElement.querySelector('router-outlet')
    expect(routerOutletElement).toBeTruthy()
  })
})
