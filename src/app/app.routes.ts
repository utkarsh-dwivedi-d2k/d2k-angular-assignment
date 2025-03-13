import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { Step2Guard } from './model-color.guard';
import { Step3Guard } from './guard';
import { PlaceorderComponent } from './placeorder/placeorder.component';
import { LoginComponent } from './login/login.component';
import { EcomerceCarComponent } from './ecomerce-car/ecomerce-car.component';

export const routes: Routes = [
  { path: 'Ecomerce-car', title: 'Ecomerce Car', component: EcomerceCarComponent },
  { path: 'login', title: 'Login', component: LoginComponent },
  { path: 'placeorder', title: 'Place Order', component: PlaceorderComponent },
  { path: 'step1', title: 'Step 1: Model & Color', component: Step1Component },
  { path: 'step2', title: 'Step 2: Configuration', component: Step2Component, canActivate: [Step2Guard] },
  { path: 'step3', title: 'Step 3: Order Summary', component: Step3Component, canActivate: [Step3Guard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
