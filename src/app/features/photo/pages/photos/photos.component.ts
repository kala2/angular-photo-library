import { Component } from '@angular/core'
import { PhotoListComponent } from '@features/photo/components/photo-list/photo-list.component'

@Component({
  selector: 'app-photos',
  imports: [PhotoListComponent],
  template: `<app-photo-list></app-photo-list>`
})
export class PhotosComponent {}
