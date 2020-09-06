import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from '../../filtro/filtro.actions';
import { limpiarTodos } from '../todo.action';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  constructor( private store: Store<AppState>) { }

  filtroActual: actions.filtrosValidos = 'todos';
  filtros: actions.filtrosValidos[] = ['todos', 'pendientes', 'completados'];

  pendientes: number = 0;

  ngOnInit() {
    this.store.subscribe((state) => {
      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter(todo => !todo.completado).length;
    });
  }

  changeFiltro(filtro: actions.filtrosValidos){
    this.store.dispatch(actions.setFiltro({filtro: filtro}));
  }

  borrarCompletados(){
    this.store.dispatch(limpiarTodos());
  }

}
