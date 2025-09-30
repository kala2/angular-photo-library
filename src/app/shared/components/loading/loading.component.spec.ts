import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LoadingComponent } from './loading.component'
import { By } from '@angular/platform-browser'
import { MatProgressSpinner } from '@angular/material/progress-spinner'

describe('LoadingComponent', () => {
  let component: LoadingComponent
  let fixture: ComponentFixture<LoadingComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(LoadingComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should render the progress spinner', () => {
    const spinner = fixture.debugElement.query(By.directive(MatProgressSpinner))
    expect(spinner).toBeTruthy()
  })

  it('should display the loading text', () => {
    const textElement: HTMLElement = fixture.debugElement.query(By.css('p')).nativeElement
    expect(textElement.textContent).toContain('Loading more images...')
  })

  it('should apply the loading-container class', () => {
    const container = fixture.debugElement.query(By.css('.loading-container'))
    expect(container).toBeTruthy()
  })
})
