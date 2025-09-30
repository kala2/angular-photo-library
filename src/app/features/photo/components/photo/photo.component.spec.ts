import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LocalStorageService } from '@app/shared/services/local-storage.service'
import { PhotoComponent } from './photo.component'
import { provideRouter } from '@angular/router'
import { ImageItem } from '@features/photo/interfaces/image.interface'
import { By } from '@angular/platform-browser'

describe('PhotoComponent', () => {
  let component: PhotoComponent
  let fixture: ComponentFixture<PhotoComponent>
  let localStorageService: LocalStorageService

  const testImage: ImageItem = {
    id: 1,
    url: 'http://example.com/test.jpg'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoComponent],
      providers: [provideRouter([]), LocalStorageService]
    }).compileComponents()

    fixture = TestBed.createComponent(PhotoComponent)

    localStorageService = TestBed.inject(LocalStorageService)

    spyOn(localStorageService, 'set').and.callThrough()

    localStorageService.set('favorites', [])

    component = fixture.componentInstance

    fixture.componentRef.setInput('image', testImage)

    fixture.detectChanges()
  })

  it('should create component', () => {
    expect(component).toBeTruthy()
  })

  it('should render image with correct src and alt', () => {
    const img: HTMLImageElement = fixture.debugElement.query(By.css('img')).nativeElement
    expect(img.getAttribute('src')).toBe(testImage.url)
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
    localStorageService.set('favorites', [testImage])
    fixture.detectChanges()

    const icon = fixture.debugElement.query(By.css('mat-icon')).nativeElement
    expect(icon.textContent.trim()).toBe('favorite')
  })

  it('should call LocalStorageService.set with updated favorites when clicking favorite button', () => {
    const button = fixture.debugElement.query(By.css('button')).nativeElement
    button.click()

    expect(localStorageService.set).toHaveBeenCalledWith('favorites', [testImage])
  })

  it('should add favorite if not exists', () => {
    component.favorites.set([])
    component.onFavoriteClick({ id: 123, url: 'url' })
    expect(component.favorites()).toEqual([{ id: 123, url: 'url' }])
  })

  it('should remove favorite if exists', () => {
    component.favorites.set([{ id: 123, url: 'url' }])
    component.onFavoriteClick({ id: 123, url: 'url' })
    expect(component.favorites()).toEqual([])
  })
})
