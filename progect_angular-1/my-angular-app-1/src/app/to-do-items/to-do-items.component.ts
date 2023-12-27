import { Component } from '@angular/core';
import { ITEMS, ToDoItem } from '../mock-todo-items';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-to-do-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './to-do-items.component.html',
  styleUrl: './to-do-items.component.css'
})
export class ToDoItemsComponent {
  items = ITEMS;
  // todoItems: ToDoItem[] = ITEMS;
}
