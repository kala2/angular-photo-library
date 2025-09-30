import { Routes } from '@angular/router'
import { PHOTO_ROUTES } from './features/photo/photo.routes'
import { FAVORITE_ROUTES } from './features/favorite/favorite.routes'

export const routes: Routes = [
  { path: '', redirectTo: 'photos', pathMatch: 'full' },
  ...PHOTO_ROUTES,
  ...FAVORITE_ROUTES,
  { path: '**', redirectTo: 'photos', pathMatch: 'full' }
]
