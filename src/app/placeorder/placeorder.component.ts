import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfiguratorService } from '../configurator.service';

@Component({
  selector: 'app-placeorder',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './placeorder.component.html',
  styleUrls: ['./placeorder.component.scss']
})
export class PlaceorderComponent {
  myform: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    public configuratorService: ConfiguratorService
  ) {
    this.myform = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    });

    const savedData = localStorage.getItem('orderData');
    if (savedData) {
      this.myform.setValue(JSON.parse(savedData));
    }
  }

  onSubmit() {
    if (this.myform.valid) {
      console.log('Form Submitted', this.myform.value);

      localStorage.setItem('orderData', JSON.stringify(this.myform.value));

      this.snackBar.open('✅ Your order has been placed!', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });

      this.myform.reset();
    } else {
      console.log('Form is invalid');
    }
  }
}
