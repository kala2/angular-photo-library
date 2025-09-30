import { Component } from '@angular/core'
import { MatProgressSpinner } from '@angular/material/progress-spinner'

@Component({
  selector: 'app-loading',
  imports: [MatProgressSpinner],
  template: `<div class="loading-container">
    <mat-spinner diameter="50"></mat-spinner>
    <p>Loading more images...</p>
  </div>`,
  styles: `
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px;
      color: #666;
      gap: 20px;

      p {
        text-align: center;
        color: #666;
        margin-bottom: 20px;
      }
    }
  `
})
export class LoadingComponent {}
