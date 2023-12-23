import { Component, OnInit } from '@angular/core';
import { ToDoItem } from '../to-do-item';

@Component({
  selector: 'app-to-do-items',
  templateUrl: './to-do-items.component.html',
  styleUrls: ['./to-do-items.component.css']
})
export class ToDoItemsComponent implements OnInit {

  toDoItem: ToDoItem = {
    id: 1,
    name: "Call Joe",
    isComplete: false
  };

  constructor() { }

  ngOnInit() {
  }

}
