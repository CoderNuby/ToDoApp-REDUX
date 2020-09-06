import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from './models/todo.model';
import { filtrosValidos } from '../filtro/filtro.actions';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(todos: Todo[], filter: filtrosValidos): any {
    switch (filter) {
      case "completados":
        return todos.filter(d => d.completado);
      case "pendientes":
        return todos.filter(d => !d.completado);
      default:
        return todos;
    }
  }

}