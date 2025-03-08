import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfiguratorService } from './configurator.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  configurator = inject(ConfiguratorService);
}
