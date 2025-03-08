import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ConfiguratorService } from './configurator.service';

export const Step3Guard: CanActivateFn = () => {
  const configuratorService = inject(ConfiguratorService);
  const router = inject(Router);

  const modelSelected = !!configuratorService.selectedModel();
  const colorSelected = !!configuratorService.selectedColor();
  const configSelected = !!configuratorService.selectedConfig();

  if (modelSelected && colorSelected && configSelected) {
    return true;
  } else {
    if (!modelSelected || !colorSelected) {
      router.navigate(['/step1']);
    }
    else if (!configSelected) {
      router.navigate(['/step2']);
    }
    return false;
  }
};
