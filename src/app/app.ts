import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { NavigationComponent } from '@core/components/navigation/navigation.component'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent],
  template: `<app-navigation></app-navigation> <router-outlet></router-outlet>`
})
export class App {}
