import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-foooter',
  standalone: true,
  imports: [],
  templateUrl: './foooter.component.html',
  styleUrl: './foooter.component.css'
})
export class FoooterComponent {
  @Input () themeFooter: string = 'light';
}
