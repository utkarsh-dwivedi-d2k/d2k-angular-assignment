import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';

export const routes: Routes = [
  { path: '', redirectTo: 'getstarted', pathMatch: 'full' }, // Default route to Home
  { path: 'step1', component: Step1Component },
  { path: 'options/:car', component: Step2Component },
  { path: 'step3', component: Step3Component },
  { path: '**', redirectTo: 'getstarted', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
