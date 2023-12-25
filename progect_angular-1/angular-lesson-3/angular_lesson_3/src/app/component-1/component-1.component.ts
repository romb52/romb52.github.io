import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-component-1',
  standalone: true,
  imports: [],
  templateUrl: './component-1.component.html',
  styleUrl: './component-1.component.css'
})
export class Component1Component {
@Input() title: string = '';
}
