import { Injectable, signal, computed } from '@angular/core';
import { CarModel, Color, CarOptions, Config, SelectedConfig } from './models.type';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ConfiguratorService {
  constructor(private http: HttpClient) {}

  car = signal<CarModel | null>(null);
  color = signal<Color | null>(null);

  config = signal<Config | null>(null);
  yoke = signal<boolean>(false);
  towHitch = signal<boolean>(false);

  availableConfigs = signal<Config[]>([]);
  availableYoke = signal<boolean>(false);
  availableTowHitch = signal<boolean>(false);

  totalPrice = computed(() => {
    let price = this.config()?.price || 0;
    price += this.color()?.price || 0;
    if (this.yoke()) price += 1000;
    if (this.towHitch()) price += 1000;
    return price;
  });

  selectCar(car: CarModel) {
    this.car.set(car);
    this.color.set(null);
    this.config.set(null);
    this.yoke.set(false);
    this.towHitch.set(false);
  }

  selectColor(color: Color | null = null) {
    this.color.set(color);
  }

  selectConfig(config: Config | null) {
    this.config.set(config);
  }

  toggleYoke() {
    this.yoke.set(!this.yoke());
  }

  toggleTowHitch() {
    this.towHitch.set(!this.towHitch());
  }

  fetchOptionsForModel(modelCode: string) {
    this.http.get<CarOptions>(`/options/${modelCode}`).subscribe({
      next: (response) => {
        this.availableConfigs.set(response.configs);
        this.availableYoke.set(response.yoke);
        this.availableTowHitch.set(response.towHitch);
        this.config.set(null);
        this.yoke.set(false);
        this.towHitch.set(false);
      },
      error: (err) => console.error('Error fetching options:', err)
    });
  }

  getSelectedConfig(): SelectedConfig {
    return {
      car: this.car() || { code: '', description: '', colors: [] },
      color: this.color() || { code: '', description: '', price: 0 },
      config: this.config() || { id: 0, description: '', range: 0, speed: 0, price: 0 },
      yoke: this.yoke(),
      towHitch: this.towHitch()
    };
  }
}
