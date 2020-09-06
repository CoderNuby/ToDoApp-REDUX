import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filtrosValidos } from 'src/app/filtro/filtro.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Todo[] = [];
  filter: filtrosValidos;

  constructor( private store: Store<AppState> ) {
    this.store.subscribe((res: datos) => {
      this.todos = res.todos;
      this.filter = res.filtro;
    });
  }

  ngOnInit() {
  }

}

interface datos{
  filtro: filtrosValidos;
  todos: Todo[];
}
