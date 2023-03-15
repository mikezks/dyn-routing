import { tap } from 'rxjs';
import { inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { PushModule } from '@ngrx/component';
import { DynamicUiWidgetComponent } from '../../../shared/ui/dynmic-ui-widget.component';
import { CustomizingService } from '@flight42/dyn-routes';
import { map } from 'rxjs';


@Component({
  selector: 'app-sidebar-cmp',
  standalone: true,
  templateUrl: 'sidebar.component.html',
  imports: [
    NgFor, PushModule,
    RouterLinkWithHref, RouterLinkActive,
    DynamicUiWidgetComponent
  ]
})
export class SidebarComponent {
  #config = inject(CustomizingService);
  #flightSearchArgs: ['routes', string, string] = ['routes', 'booking/flight', 'search'];
  title = 'Config';
  toggles = [
    this.#config.getState$(...this.#flightSearchArgs).pipe(
      map(routeConfig => ({
        key: routeConfig.source[0],
        label: routeConfig.active ? 'Search: default' : 'Search: custom',
        active: routeConfig.active
      }))
    )
  ];

  #routerSelfNav = ((
    router = inject(Router),
    route = inject(ActivatedRoute)
  ) => () => router.navigate(route.snapshot.url))();

  toggle(key: string): void {
    this.#config.toggleActiveState(...this.#flightSearchArgs);
    this.#routerSelfNav();
  }
}
