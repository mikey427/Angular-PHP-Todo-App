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

	todoModel = new Todo('', '', 0);
	userId:any;
	todos:any;
	userName:any;
	ngOnInit(): void {
		const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
		this.userId = id;
		const name = this.route.snapshot.paramMap.get('name')
		this.userName = name;
		console.log(this.userName, 'username')
		this.http.getTodos(this.userId).subscribe((data: any) => {
			this.todos = data.todos;
		})
	}

	toSubtasks(todo:any) {
		this.router.navigate(['/todos', todo.id, {name:todo.name, userId:this.userId, userName: this.userName}]);
	}

	checkboxClick = (event:any) => {
		this.http.updateTodoStatus(this.userId, event.srcElement.id, event.srcElement.checked).subscribe();
	}

	deleteTodo = (event:any) => {
		this.http.deleteTodo(this.userId, event.srcElement.id).subscribe(data => {
			this.todos = this.todos.filter((todo:any) => todo.id != event.srcElement.id)
		})
	}

	onSubmit = () => {
		if(this.todoModel.name) {
			console.log(this.userId, this.todoModel.name);
			this.http.createTodo(this.userId, this.todoModel.name, this.todoModel.members, this.todoModel.estimatedHours).subscribe(data => {
				console.log(data, 'data');
				this.todos.push(data);
				this.todoModel.name = '';
				this.todoModel.members = '';
				this.todoModel.estimatedHours = 0;
			})
		} else {
			return
		}
	}



}
