import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PhotoListComponent } from '@features/photo/components/photo-list/photo-list.component'
import { LocalStorageService } from '@app/shared/services/local-storage.service'
import { ImageService } from '@features/photo/services/image.service'

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling'
import { PhotoComponent } from '@features/photo/components/photo/photo.component'
import { LoadingComponent } from '@app/shared/components/loading/loading.component'

describe('PhotoListComponent', () => {
  let component: PhotoListComponent
  let fixture: ComponentFixture<PhotoListComponent>
  let imageService: ImageService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoListComponent, PhotoComponent, LoadingComponent, CdkVirtualScrollViewport],
      providers: [LocalStorageService, ImageService]
    }).compileComponents()

    fixture = TestBed.createComponent(PhotoListComponent)

    imageService = TestBed.inject(ImageService)

    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should call offset.next when scrolled index is near end', () => {
    spyOn(imageService.offset, 'next')

    component.onScrolledIndexChange(1)
    expect(imageService.offset.next).toHaveBeenCalled()
  })

  it('should track by row index correctly', () => {
    const row = [{ id: 123, url: 'url' }]
    expect(component.trackByRowIndex(0, row)).toBe(123)
    expect(component.trackByRowIndex(0, [])).toBe(0)
  })

  it('should add favorite if not exists', () => {
    component.favorites.set([])
    component.onFavoriteClick('url1')
    expect(component.favorites()).toContain('url1')
  })

  it('should remove favorite if exists', () => {
    component.favorites.set(['url1'])
    component.onFavoriteClick('url1')
    expect(component.favorites()).not.toContain('url1')
  })
})
