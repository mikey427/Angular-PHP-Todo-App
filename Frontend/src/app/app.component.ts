import { Component } from '@angular/core';
import { TodosService } from './todos.service';
import { TodosComponent } from './todos/todos.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor(private _obj:TodosService) {
		_obj.getTodos().subscribe((todos:any) => {
			console.log(todos);
		})
	}

  title = 'todo-app';
	variable = 'michael';
}
