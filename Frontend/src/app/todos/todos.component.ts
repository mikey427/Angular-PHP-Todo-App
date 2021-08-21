import { Component, OnInit} from '@angular/core'
import { TodosService } from '../todos.service'
import { Todo } from './todo'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})


export class TodosComponent implements OnInit {
  constructor(private http: TodosService, private router: Router) {

	 }

	todoModel = new Todo('');

	todos:any;
	ngOnInit(): void {
		this.http.getTodos().subscribe((data: any) => {
			this.todos = data.todos;
		})
	}

	toSubtasks(todo:any) {
		this.router.navigate(['/todos', todo.id, {name:todo.name}]);
	}

	checkboxClick = (event:any) => {
		this.http.updateTodoStatus(event.srcElement.id, event.srcElement.checked).subscribe();
	}

	deleteTodo = (event:any) => {
		this.http.deleteTodo(event.srcElement.id).subscribe(data => {
			this.todos = this.todos.filter((todo:any) => todo.id != event.srcElement.id)
		})
	}

	onSubmit = () => {
		if(this.todoModel.name) {
			this.http.createTodo(this.todoModel.name).subscribe(data => {
				this.todos.push(data);
			})
		} else {
			return
		}
	}



}
