import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LocalStorageService } from '@app/shared/services/local-storage.service'
import { PhotoCardComponent } from './photo-card.component'
import { provideRouter } from '@angular/router'
import { By } from '@angular/platform-browser'

describe('PhotoCardComponent', () => {
  let component: PhotoCardComponent
  let fixture: ComponentFixture<PhotoCardComponent>
  let localStorageService: LocalStorageService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoCardComponent],
      providers: [provideRouter([]), LocalStorageService]
    }).compileComponents()

    fixture = TestBed.createComponent(PhotoCardComponent)

    localStorageService = TestBed.inject(LocalStorageService)

    spyOn(localStorageService, 'set').and.callThrough()

    localStorageService.set('favorites', [])

    component = fixture.componentInstance

    fixture.componentRef.setInput('id', 1)

    fixture.detectChanges()
  })

  it('should create component', () => {
    expect(component).toBeTruthy()
  })

  it('should render image with correct src and alt', () => {
    const img: HTMLImageElement = fixture.debugElement.query(By.css('img')).nativeElement
    expect(img.getAttribute('src')).toBe('https://picsum.photos/id/1/300/300')
    expect(img.alt).toBe('Image 1')
  })

  it('should render image id in overlay', () => {
    const idSpan = fixture.debugElement.query(By.css('.image-id')).nativeElement
    expect(idSpan.textContent).toContain('#1')
  })

  it('should show favorite_border icon when not in favorites', () => {
    const icon = fixture.debugElement.query(By.css('mat-icon')).nativeElement
    expect(icon.textContent.trim()).toBe('favorite_border')
  })

  it('should show favorite icon when image url is in favorites', () => {
    localStorageService.set('favorites', [1])
    fixture.detectChanges()

    const icon = fixture.debugElement.query(By.css('mat-icon')).nativeElement
    expect(icon.textContent.trim()).toBe('favorite')
  })

  it('should call LocalStorageService.set with updated favorites when clicking favorite button', () => {
    const button = fixture.debugElement.query(By.css('button')).nativeElement
    button.click()

    expect(localStorageService.set).toHaveBeenCalledWith('favorites', [1])
  })

  it('should add favorite if not exists', () => {
    component.favorites.set([])
    component.onFavoriteClick()
    expect(component.favorites()).toEqual([1])
  })

  it('should remove favorite if exists', () => {
    component.favorites.set([1])
    component.onFavoriteClick()
    expect(component.favorites()).toEqual([])
  })
})
