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
  constructor(private http: TodosService, private router: Router, private route: ActivatedRoute) {}

	todoModel = new Todo('', '', 0);

	// Local data
	userId:any;
	todos:any;
	userName:any;
	edit:boolean = false;
	editId:any;

	ngOnInit(): void {

		// Storing data passed through navigation onto component
		const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
		this.userId = id;
		const name = this.route.snapshot.paramMap.get('name')
		this.userName = name;

		// Retrieving all the projects tied to the signed in user
		this.http.getTodos(this.userId).subscribe((data: any) => {
			this.todos = data.todos;
		})
	}
	// Gets all tasks for a project and navigates to the tasks page of given project
	toSubtasks(todo:any) {
		this.router.navigate(['/todos', todo.id, {name:todo.name, userId:this.userId, userName: this.userName}]);
	}
	// Toggles isDone status (checkbox)
	checkboxClick = (event:any) => {
		this.http.updateTodoStatus(this.userId, event.srcElement.id, event.srcElement.checked).subscribe();
	}

	// Deletes Project and all associated tasks
	deleteTodo = (event:any) => {
		this.http.deleteTodo(this.userId, event.srcElement.id).subscribe(data => {
			this.todos = this.todos.filter((todo:any) => todo.id != event.srcElement.id)
		})
	}

		// Toggles the edit state and modifies the form accordingly
	editToggle = (event:any) => {
		if(!this.edit) {
			this.edit = true;
			this.editId = event.srcElement.id;
			let todo = this.todos.forEach((todo:any) => {
				if(todo.id == this.editId) {
					this.todoModel.name = todo.name;
					this.todoModel.members = todo.members;
					this.todoModel.estimatedHours = todo['estimated hours'];
				}
			});
		} else {
			this.edit = false;
			this.editId = null;
			this.todoModel.name = '';
			this.todoModel.members = '';
			this.todoModel.estimatedHours = 0;
		}
}

	// Submits data and creates or edits an existing project based on this.edit boolean
	onSubmit = () => {
		if(this.edit) {
			this.http.updateTodo(this.userId, this.editId, this.todoModel.name, this.todoModel.members, this.todoModel.estimatedHours).subscribe((data:any) => {
				this.todos = this.todos.filter((todo:any) => todo.id != this.editId);
				this.todos.push(data.todo);
				this.edit = false;
				this.editId = null;
			})
		} else {
			if(this.todoModel.name) {
				this.http.createTodo(this.userId, this.todoModel.name, this.todoModel.members, this.todoModel.estimatedHours).subscribe(data => {
					this.todos.push(data);
				})
			}
		}
		this.todoModel.name = '';
		this.todoModel.members = '';
		this.todoModel.estimatedHours = 0;
	}
}
