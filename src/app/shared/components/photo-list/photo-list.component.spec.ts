import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PhotoListComponent } from '@shared/components/photo-list/photo-list.component'
import { LocalStorageService } from '@app/shared/services/local-storage.service'

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling'
import { PhotoCardComponent } from '@app/features/photo/components/photo-card/photo-card.component'
import { LoadingComponent } from '@app/shared/components/loading/loading.component'
import { ImageItem } from '@app/features/photo/interfaces/image.interface'

describe('PhotoListComponent', () => {
  let component: PhotoListComponent
  let fixture: ComponentFixture<PhotoListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoListComponent, PhotoCardComponent, LoadingComponent, CdkVirtualScrollViewport],
      providers: [LocalStorageService]
    }).compileComponents()

    fixture = TestBed.createComponent(PhotoListComponent)

    fixture.componentRef.setInput('imageRows', [[{ id: 123, url: 'url' }]])

    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should emit reachedEndChange when scrolled to the end', () => {
    const rows: ImageItem[][] = [
      [{ id: 1, url: 'a' }],
      [{ id: 2, url: 'b' }],
      [{ id: 3, url: 'c' }]
    ]

    fixture.componentRef.setInput('imageRows', rows)

    spyOn(component.reachedEndChange, 'emit')

    component.onScrolledIndexChange(1)
    expect(component.reachedEndChange.emit).toHaveBeenCalled()
  })

  it('should not emit reachedEndChange when not near the end', () => {
    const rows: ImageItem[][] = [
      [{ id: 1, url: 'a' }],
      [{ id: 2, url: 'b' }],
      [{ id: 3, url: 'c' }]
    ]

    fixture.componentRef.setInput('imageRows', rows)
    spyOn(component.reachedEndChange, 'emit')

    component.onScrolledIndexChange(0)
    expect(component.reachedEndChange.emit).not.toHaveBeenCalled()
  })

  it('should track rows by first image id', () => {
    const row: ImageItem[] = [{ id: 1, url: 'url' }]
    expect(component.trackByRowIndex(0, row)).toBe(1)
  })

  it('should return index if row is empty in trackByRowIndex', () => {
    expect(component.trackByRowIndex(5, [])).toBe(5)
  })
})
