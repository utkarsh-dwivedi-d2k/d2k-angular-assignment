import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

interface VehicleOptions {
  configs: ConfigOption[];
  towHitch: boolean;
  yoke: boolean;
}

interface ConfigOption {
  id: number;
  description: string;
  range: number;
  speed: number;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component implements OnInit {
  @Input() selectedModel: string = '';

  configOptions: ConfigOption[] = [];
  selectedConfigId: number = 3;
  selectedConfig: ConfigOption | null = null;
  towHitch: boolean = false;
  yoke: boolean = false;
  vehicleOptions: VehicleOptions | null = null;
  totalPrice: number = 0;
  vehicleImage: string = ""

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const modelCode = params['model'] || this.selectedModel || 'C';
      this.loadOptions(modelCode);
    });
  }

  loadOptions(modelCode: string): void {
    this.http.get<VehicleOptions>(`options/${modelCode}`).subscribe({
      next: (data) => {
        this.vehicleOptions = data;
        this.configOptions = data.configs;

        // Set default to Cyberbeast if available, otherwise first option
        this.selectedConfigId = this.configOptions.find(cfg =>
          cfg.description.includes('Cyberbeast'))?.id ||
          (this.configOptions.length > 0 ? this.configOptions[0].id : 0);

        this.updateSelectedConfig();
      },
      error: (err) => console.error('Failed to load options:', err)
    });
  }

  updateSelectedConfig(): void {
    this.selectedConfig = this.configOptions.find(config =>
      config.id === Number(this.selectedConfigId)) || null;

    if (this.selectedConfig) {
      // Set the vehicle image directly from the selected config
      this.vehicleImage = this.selectedConfig.imageUrl;
      this.updateTotalPrice();
    }
  }

  onConfigChange(): void {
    this.updateSelectedConfig();
  }

  updateTotalPrice(): void {
    if (this.selectedConfig) {
      this.totalPrice = this.selectedConfig.price;

      // Add options if selected
      if (this.vehicleOptions?.towHitch && this.towHitch) this.totalPrice += 1000;
      if (this.vehicleOptions?.yoke && this.yoke) this.totalPrice += 1000;
    }
  }
}
