import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatSlideToggleModule, MatIconModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() theme: string =  "";
  @Output() dataTheme = new EventEmitter<string>();
  ngOnInit(): void {
    this.theme = localStorage.getItem('theme') || "light";
    this.dataTheme.emit(this.theme);
  }
  changeTheme(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.dataTheme.emit(this.theme);
    localStorage.setItem('theme', this.theme);
  }
}
