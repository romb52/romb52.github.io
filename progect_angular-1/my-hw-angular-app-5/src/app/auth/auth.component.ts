import { Component } from '@angular/core';
import {
  NgForm  
} from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})

export class AuthComponent {
  hide = true;
  
  sumbitForm(form: NgForm) {
    console.log(form.value.email);
  }

  changeShowPass(event: Event): void {
    event.preventDefault();
    this.hide = !this.hide;
  }
  
}
