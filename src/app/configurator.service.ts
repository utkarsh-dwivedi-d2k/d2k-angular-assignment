import { Injectable, inject, signal, Signal, computed, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { CarModel, CarOptions, Color, Config } from './models.type';

@Injectable({
  providedIn: 'root'
})
export class ConfiguratorService {
  private http = inject(HttpClient);

  readonly allModels: Signal<CarModel[]> = toSignal(
    this.http.get<CarModel[]>('models'),
    { initialValue: [] }
  );

  readonly selectedModel = signal<CarModel | undefined>(this.loadFromLocalStorage<CarModel>('selectedModel'));
  readonly selectedColor = signal<Color | undefined>(this.loadFromLocalStorage<Color>('selectedColor'));

  readonly carOptions = signal<CarOptions | undefined>(undefined);
  readonly selectedConfig = signal<Config | undefined>(undefined);
  readonly yokeAvailable = signal<boolean>(false);
  readonly towHitchAvailable = signal<boolean>(false);
  readonly selectedYoke = signal<boolean>(false);
  readonly selectedTowHitch = signal<boolean>(false);

  readonly availableColors = computed(() => {
    return this.selectedModel()?.colors || [];
  });

  readonly availableConfigs = computed(() => {
    return this.carOptions()?.configs || [];
  });

  readonly totalPrice = computed(() => {
    let total = 0;
    const color = this.selectedColor();
    if (color) total += color.price;
    const config = this.selectedConfig();
    if (config) total += config.price;
    if (this.yokeAvailable() && this.selectedYoke()) total += 1000;
    if (this.towHitchAvailable() && this.selectedTowHitch()) total += 1000;
    return total;
  });

  readonly imageUrl = computed(() => {
    const model = this.selectedModel();
    const color = this.selectedColor();
    if (model && color) {
      return `https://interstate21.com/tesla-app/images/${model.code}/${color.code}.jpg`;
    }
    return '';
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

  private loadCarOptions(modelCode: string): void {
    this.http.get<CarOptions>(`options/${modelCode}`).subscribe(options => {
      this.carOptions.set(options);
      this.yokeAvailable.set(options.yoke);
      this.towHitchAvailable.set(options.towHitch);
    });
  }

  private resetOptions(): void {
    this.carOptions.set(undefined);
    this.selectedConfig.set(undefined);
    this.yokeAvailable.set(false);
    this.towHitchAvailable.set(false);
    this.selectedYoke.set(false);
    this.selectedTowHitch.set(false);
  }

  setSelectedModel(model: CarModel) {
    this.selectedModel.set(model);
    localStorage.setItem('selectedModel', JSON.stringify(model));
    this.selectedConfig.set(undefined);
    this.selectedYoke.set(false);
    this.selectedTowHitch.set(false);
  }

  setSelectedColor(color: Color) {
    this.selectedColor.set(color);
    localStorage.setItem('selectedColor', JSON.stringify(color));
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

  private loadFromLocalStorage<T>(key: string): T | undefined {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  }
}
