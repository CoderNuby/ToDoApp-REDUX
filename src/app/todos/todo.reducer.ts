import { createReducer, on } from '@ngrx/store';
import * as actions from './todo.action';
import { Todo } from './models/todo.model';
 
export const estadoInicial: Todo[]  = [
    new Todo('Test1'),
    new Todo('Test2'),
    new Todo('Test3'),
    new Todo('Test4')
];
 
const _todoReducer = createReducer(estadoInicial,
  on(actions.crear, (state, { texto }) => [...state, new Todo(texto)]),
  on(actions.toggle, (state, { id }) => {
    return state.map( (todo) => {
      if(todo.id == id){
        return {
          ...todo,
          completado: !todo.completado
        }
      }else{
        return todo;
      }
    });
  }),
  on(actions.editar, (state, { id, texto }) => {
    return state.map( (todo) => {
      if(todo.id == id){
        return {
          ...todo,
          texto: texto
        }
      }else{
        return todo;
      }
    });
  }),
  on(actions.borrar, (state, { id }) => state.filter(todo => todo.id != id)),
  on(actions.toggleAll, (state, { completado }) => {
    return state.map(todo => {
      return {
        ...todo,
        completado: completado
      }
    });
  }),
  on(actions.limpiarTodos, (state) => state.filter(todo => !todo.completado))
);
 
export function todoReducer(state, action) {
  return _todoReducer(state, action);
}