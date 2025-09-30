import { Routes } from '@angular/router'
import { PHOTO_ROUTES } from './features/photo/photo.routes'

export const routes: Routes = [
  { path: '', redirectTo: 'photos', pathMatch: 'full' },
  ...PHOTO_ROUTES,
  { path: '**', redirectTo: 'photos', pathMatch: 'full' }
]
