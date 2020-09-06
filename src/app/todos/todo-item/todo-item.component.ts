import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from '../todo.action';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todoItem: Todo;
  @ViewChild('txtEditor') textEditor: ElementRef;

  checkCompletado: FormControl;
  txtInput: FormControl;

  editando: boolean = false;

  constructor( private store: Store<AppState>) { }

  ngOnInit() {
    this.checkCompletado = new FormControl(this.todoItem.completado);
    this.txtInput = new FormControl(this.todoItem.texto, Validators.required);

    this.checkCompletado.valueChanges.subscribe((valor) => {
      this.store.dispatch(actions.toggle({ id: this.todoItem.id }));
    });
  }

  editar(){
    this.editando = true;

    setTimeout(() => {
      this.textEditor.nativeElement.select();
    },10);
  }

  guardarEdicion(){

    if(this.txtInput.invalid)return;

    this.store.dispatch(actions.editar({ id: this.todoItem.id, texto: this.txtInput.value}));

    this.editando = false;
  }

  salirEdicion(){
    this.txtInput.setValue(this.todoItem.texto);

    this.editando = false;
  }

  borrar(){
    this.store.dispatch(actions.borrar({id: this.todoItem.id}));
  }

}
