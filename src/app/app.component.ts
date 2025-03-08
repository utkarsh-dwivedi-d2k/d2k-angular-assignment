
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfiguratorService } from './configurator.service';

// import { FooterComponent } from './main-app/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  configurator = inject(ConfiguratorService);
}




// import { Component } from '@angular/core';
// import { Step1Component } from './step1/step1.component';
// import { Step2Component } from './step2/step2.component';
// import { Step3Component } from './step3/step3.component';






// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [Step1Component, Step2Component, Step3Component],
//   templateUrl: "app.component.html",

// })
// export class AppComponent {
//   name = 'Angular';
// }
