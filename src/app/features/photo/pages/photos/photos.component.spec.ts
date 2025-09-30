import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { PhotoListComponent } from '@shared/components/photo-list/photo-list.component'
import { PhotosComponent } from './photos.component'

describe('PhotosComponent', () => {
  let fixture: ComponentFixture<PhotosComponent>
  let component: PhotosComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotosComponent, PhotoListComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(PhotosComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should render the PhotoListComponent', () => {
    const photoListEl = fixture.debugElement.query(By.css('app-photo-list'))
    expect(photoListEl).toBeTruthy()
  })
})
