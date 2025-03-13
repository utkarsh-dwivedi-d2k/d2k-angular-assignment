import { Component, inject, OnInit, Signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { ConfiguratorService } from '../configurator.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss'
})
export class Step3Component implements OnInit {
  public configuratorService = inject(ConfiguratorService);
  private router = inject(Router);

  isOrderRoute = false;
  modelDescription = '';
  colorDescription = '';
  configDescription = '';
  configPrice = 0;
  colorPrice = 0;
  yokePrice = 1000;
  towHitchPrice = 1000;

  selectedModel: Signal<any>;
  selectedColor: Signal<any>;
  selectedConfig: Signal<any>;
  yokeAvailable: Signal<boolean>;
  towHitchAvailable: Signal<boolean>;
  selectedYoke: Signal<boolean>;
  selectedTowHitch: Signal<boolean>;
  totalPrice: Signal<number>;

  constructor() {
    this.selectedModel = this.configuratorService.selectedModel;
    this.selectedColor = this.configuratorService.selectedColor;
    this.selectedConfig = this.configuratorService.selectedConfig;
    this.yokeAvailable = this.configuratorService.yokeAvailable;
    this.towHitchAvailable = this.configuratorService.towHitchAvailable;
    this.selectedYoke = this.configuratorService.selectedYoke;
    this.selectedTowHitch = this.configuratorService.selectedTowHitch;
    this.totalPrice = this.configuratorService.totalPrice;

    effect(() => {
      this.updateDisplayValues();
    });
  }

  ngOnInit() {
    this.checkIfOrderRoute();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkIfOrderRoute();
    });
  }

  private checkIfOrderRoute() {
    this.isOrderRoute = this.router.url.includes('/step3/order');
  }

  private updateDisplayValues() {
    const model = this.selectedModel();
    const color = this.selectedColor();
    const config = this.selectedConfig();

    this.modelDescription = model ? model.description : '';
    this.colorDescription = color ? color.description : '';
    this.colorPrice = color ? color.price : 0;
    this.configDescription = config ? config.description : '';
    this.configPrice = config ? config.price : 0;
  }
}
