import { Component } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  hide = true;
  loginForm: FormGroup;
  isEmailInputInFocus: boolean = false;
  isPassInputInFocus: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submitForm() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value.email);     
    } else {
      console.log('Form is ', this.loginForm.status);
    }
  }

  changeShowPass(event: Event): void {
    event.preventDefault();
    this.hide = !this.hide;
  }

  onEmailInputFocus(): void {
    this.isEmailInputInFocus = true;
  }

  onEmailInputBlur(): void {
    this.isEmailInputInFocus = false;
  }

  onPassInputFocus(): void {
    this.isPassInputInFocus = true;
  }

  onPassInputBlur(): void {
    this.isPassInputInFocus = false;
  }
}