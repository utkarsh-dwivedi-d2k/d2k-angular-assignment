import { inject, Injectable, signal, Signal, computed, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { CarModel, CarOptions, Color, Config, SelectedConfig } from './models.type';

@Injectable({
  providedIn: 'root'
})
export class ConfiguratorService {
  private http = inject(HttpClient);

  readonly allModels: Signal<CarModel[]> = toSignal(
    this.http.get<CarModel[]>('models'),
    { initialValue: [] }
  );

  readonly selectedModel = signal<CarModel| undefined>(undefined);
  readonly selectedColor = signal<Color | undefined>(undefined);
  readonly code = this.selectedModel()?.code;

  private carOptionsSubject = new BehaviorSubject<string | null>(null);

  readonly carOptions = signal<CarOptions | undefined>(undefined);
  readonly selectedConfig = signal<Config | undefined>(undefined);
  readonly yokeAvailable = signal<boolean>(false);
  readonly towHitchAvailable = signal<boolean>(false);
  readonly selectedYoke = signal<boolean>(false);
  readonly selectedTowHitch = signal<boolean>(false);

  readonly availableColors = computed(() => {
    const model = this.selectedModel();
    return model ? model.colors : [];
  });

  readonly availableConfigs = computed(() => {
    return this.carOptions()?.configs || [];
  });

  constructor() {
    effect(() => {
      const model = this.selectedModel();
      if (model) {
        this.loadCarOptions(model.code);
      } else {
        this.resetOptions();
      }
    });
  }



  loadCarOptions(modelCode: string): void {
    this.http.get<CarOptions>(`options/${modelCode}`).pipe(
      tap((options: CarOptions) => {
        this.carOptions.set(options);
        this.yokeAvailable.set(options.yoke);
        this.towHitchAvailable.set(options.towHitch);
      })
    ).subscribe();
  }

  private resetOptions(): void {
    this.carOptions.set(undefined);
    this.selectedConfig.set(undefined);
    this.yokeAvailable.set(false);
    this.towHitchAvailable.set(false);
    this.selectedYoke.set(false);
    this.selectedTowHitch.set(false);
  }


  readonly totalPrice = computed(() => {
    let total = 0;


    const color = this.selectedColor();
    if (color) {
      total += color.price;
    }


    const config = this.selectedConfig();
    if (config) {
      total += config.price;
    }

    if (this.yokeAvailable() && this.selectedYoke()) {
      total += 1000;
    }


    if (this.towHitchAvailable() && this.selectedTowHitch()) {
      total += 1000;
    }

    return total;
  });

  // Computed signal for image URL.
  readonly imageUrl = computed(() => {
    const model = this.selectedModel();
    const color = this.selectedColor();
    if (model && color) {
      return `https://interstate21.com/tesla-app/images/${model.code}/${color.code}.jpg`;
    }
    return '';
  });




  setSelectedModel(model: CarModel) {
    this.selectedModel.set(model);
    this.selectedConfig.set(undefined);
    this.selectedYoke.set(false);
    this.selectedTowHitch.set(false);
  }

  setSelectedColor(color: Color) {
    this.selectedColor.set(color);
  }

  setSelectedConfig(config: Config) {
    this.selectedConfig.set(config);
  }

  setSelectedYoke(selected: boolean) {
    this.selectedYoke.set(selected);
  }

  setSelectedTowHitch(selected: boolean) {
    this.selectedTowHitch.set(selected);
  }
}
