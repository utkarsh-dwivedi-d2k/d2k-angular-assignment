import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfiguratorService } from '../configurator.service';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component {
//   private router = inject(Router);
//   public configurator = inject(ConfiguratorService);

//   // Breakdown of selected configuration
//   get selectedConfiguration() {
//     const config = this.configurator.getSelectedConfig();
//     return {
//       car: config.car.description,
//       color: config.color.description,
//       colorPrice: config.color.price,
//       configDescription: config.config.description,
//       configPrice: config.config.price,
//       range: config.config.range,
//       speed: config.config.speed,
//       yoke: config.yoke,
//       towHitch: config.towHitch
//     };
//   }

//   constructor() {
//     // Redirect to step 1 if configuration is incomplete
//     if (!this.configurator.isConfigurationComplete()) {
//       this.router.navigate(['/step1']);
//     }
//   }

//   goBack() {
//     this.router.navigate(['/step2']);
//   }

//   completeOrder() {
//     // Clear configuration and navigate to confirmation
//     this.router.navigate(['/confirmation']);
//   }

//   // Format price with USD currency, no decimal places
//   formatPrice(price: number): string {
//     return price.toLocaleString('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0
//     });
//   }

//   // Calculate additional option prices
//   getOptionsPrices(): { yoke: number; towHitch: number } {
//     return {
//       yoke: this.selectedConfiguration.yoke ? 1000 : 0,
//       towHitch: this.selectedConfiguration.towHitch ? 1000 : 0
//     };
//   }

//   // Total price calculation matching service's computed signal
//   get totalPrice(): number {
//     return this.configurator.totalPrice();
//   }
}
