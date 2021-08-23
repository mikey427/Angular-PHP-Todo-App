import { Component, OnInit } from '@angular/core';
import { SubtasksService } from '../subtasks.service';
import { Subtask } from './subtasks'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-subtasks',
  templateUrl: './subtasks.component.html',
  styleUrls: ['./subtasks.component.css']
})
export class SubtasksComponent implements OnInit {

  constructor(private http: SubtasksService,  private router: Router,
		 private route: ActivatedRoute) { }

	subtaskModel = new Subtask('', '', 0);

	todoId:any;
	userName:any;
	userId:any;
	todoName:any;
	subtasks:any;
  ngOnInit(): void {
		const id = parseInt(this.route.snapshot.paramMap.get('id')!.toString(), 10);
		this.todoId = id
		const todoName = this.route.snapshot.paramMap.get('name');
		const userId = parseInt(this.route.snapshot.paramMap.get('userId')!.toString(), 10);
		const username = this.route.snapshot.paramMap.get('userName');
		this.userName = username;
		this.todoName = todoName;
		this.userId = userId;
		this.http.getSubtasks(this.userId, this.todoId).subscribe((data: any) => {
			this.subtasks = data.subtasks;
			console.log(this.subtasks, 'subtasks');
		})
  }

	checkboxClick = (event:any) => {
		this.http.updateSubtaskStatus(this.userId, this.todoId, event.srcElement.id, event.srcElement.checked).subscribe();
	}

	deleteSubtask = (event:any) => {
		this.http.deleteSubtask(this.userId, this.todoId, event.srcElement.id).subscribe(
			this.subtasks = this.subtasks.filter((subtask:any) => subtask.id != event.srcElement.id)
		);
	}

	goBack = () => {
		this.router.navigate([`/users/${this.userId}`, {name: this.userName}]);
		console.log('button clicked');
	}

	onSubmit = () => {
		if(this.subtaskModel.name) {
			console.log(this.todoId, this.userId, 'todo,user')
			this.http.createSubtask(this.userId, this.todoId, this.subtaskModel.name, this.subtaskModel.members, this.subtaskModel.estimatedHours).subscribe(data => {
				this.subtasks.push(data);
			})
			this.subtaskModel.name = '';
			this.subtaskModel.members = '';
			this.subtaskModel.estimatedHours = 0;
		}
	}

}
