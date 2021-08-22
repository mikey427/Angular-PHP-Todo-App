import { Component, OnInit} from '@angular/core'
import { TodosService } from '../todos.service'
import { Todo } from './todo'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})


export class TodosComponent implements OnInit {
  constructor(private http: TodosService, private router: Router, private route: ActivatedRoute) {

	 }

	todoModel = new Todo('');
	userId:any;
	todos:any;
	ngOnInit(): void {
		const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
		this.userId = id;
		this.http.getTodos(this.userId).subscribe((data: any) => {
			this.todos = data.todos;
		})
	}

	toSubtasks(todo:any) {
		this.router.navigate(['/todos', todo.id, {name:todo.name}]);
	}

	checkboxClick = (event:any) => {
		this.http.updateTodoStatus(this.userId, event.srcElement.id, event.srcElement.checked).subscribe();
	}

	deleteTodo = (event:any) => {
		this.http.deleteTodo(event.srcElement.id).subscribe(data => {
			this.todos = this.todos.filter((todo:any) => todo.id != event.srcElement.id)
		})
	}

	onSubmit = () => {
		if(this.todoModel.name) {
			console.log(this.userId, this.todoModel.name);
			this.http.createTodo(this.userId, this.todoModel.name).subscribe(data => {
				console.log(data, 'data');
				this.todos.push(data);
			})
		} else {
			return
		}
	}



}
