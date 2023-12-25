import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FoooterComponent } from './foooter/foooter.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { Component1Component } from './component-1/component-1.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports:
    [CommonModule,
      RouterOutlet,
      HeaderComponent,
      FoooterComponent,
      MatSlideToggleModule,
      MatTabsModule,
      Component1Component
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  themeUp: string = localStorage.getItem('theme') || "light";
  counter: number = 0;

  titleComp1 = 'Comp1';
  titleComp2 = 'Comp2';
  titleComp3 = 'Comp3';

  changeCounter(event: Event): void {
    console.log(event.target);

    this.counter += 1;
  }
  changeTheme(theme: string): void {
    this.themeUp = theme;
  }
}
