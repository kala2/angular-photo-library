import { Component, inject } from '@angular/core'
import { MatToolbar } from '@angular/material/toolbar'
import { MatButton } from '@angular/material/button'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { LocalStorageService } from '@app/shared/services/local-storage.service'
import { MatBadge } from '@angular/material/badge'

@Component({
  selector: 'app-navigation',
  template: `<mat-toolbar color="primary" class="top-nav">
    <span class="app-title">Angular photo library</span>

    <div class="nav-links">
      <a mat-button routerLink="/photos" routerLinkActive="active-link" class="nav-link">
        Photos
      </a>

      <a
        mat-button
        matBadgeSize="large"
        matBadge="{{ favorites().length > 0 ? favorites().length : '' }}"
        routerLink="/favorites"
        routerLinkActive="active-link"
        class="nav-link">
        Favorites
      </a>
    </div>

    <span></span>
  </mat-toolbar>`,
  styles: `
    .top-nav {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
    }

    .app-title {
      justify-self: start;
    }

    .nav-links {
      justify-self: center;
      display: flex;
      gap: 1rem;

      a {
        padding: 0 20px;
      }

      .nav-link.active-link {
        color: rgb(85, 85, 85);
        background-color: #e6ecf8;
      }
    }
  `,

  imports: [RouterLink, RouterLinkActive, MatToolbar, MatButton, MatBadge]
})
export class NavigationComponent {
  localStorageService = inject(LocalStorageService)

  favorites = this.localStorageService.signal<number[]>('favorites', [])
}
