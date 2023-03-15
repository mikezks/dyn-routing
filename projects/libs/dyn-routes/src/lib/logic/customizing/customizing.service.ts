import { APP_INITIALIZER, inject, Injectable, Provider } from "@angular/core";
import { BehaviorSubject, distinctUntilChanged, filter, map, Observable, tap } from "rxjs";
import { CUSTOMIZING_CONFIG_LOADER, CustomizingConfig, CustomizingConfigType, DynRouteConfig } from "./customizing-loader.config";


@Injectable({
  providedIn: 'root'
})
export class CustomizingService {
  #config = new BehaviorSubject<CustomizingConfig>({
    routes: {}
  });
  #configLoader = inject(CUSTOMIZING_CONFIG_LOADER);

  reloadConfig(): void {
    this.#configLoader.subscribe(
      config => this.setConfig(config)
    );
  }

  setConfig(config: CustomizingConfig) {
    this.#config.next(config);
  }

  toggleActiveState(configType: CustomizingConfigType, key: string, path = ''): boolean {
    const active = !this.#config.value[configType][key][path].active;
    this.#config.value[configType][key][path] = {
      ...this.#config.value[configType][key][path],
      active
    };
    this.#config.next(this.#config.value);

    return active;
  };

  getState(configType: CustomizingConfigType, key: string, path: string): DynRouteConfig {
    return this.#config.value?.[configType]?.[key]?.[path];
  }

  getState$(configType: CustomizingConfigType, key: string, path: string): Observable<DynRouteConfig> {
    return this.#config.pipe(
      map(config => config?.[configType]?.[key]?.[path] as DynRouteConfig),
      filter(config => !!config),
      distinctUntilChanged()
    );
  }
}

let customizingService = {} as CustomizingService;
function setCustomizingService(service: CustomizingService) {
  customizingService = service;
}
export function getCustomizingService(): CustomizingService {
  return customizingService;
}

export function provideCustomizingInitConfig(): Provider {
  return {
    provide: APP_INITIALIZER,
    useFactory: () => {
      const configLoader = inject(CUSTOMIZING_CONFIG_LOADER);
      const customizingService = inject(CustomizingService);
      setCustomizingService(customizingService);
      return () => configLoader.pipe(
        tap(config => customizingService.setConfig(config))
      );
    },
    multi: true
  };
}
