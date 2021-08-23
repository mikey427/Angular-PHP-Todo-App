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
	totalHours:any;
	subtasks:any;
	edit:boolean = false;
	editId:any;
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
			this.totalHours = 0;
			data.subtasks.forEach((task:any) => {
				this.totalHours += task['estimated hours'];
			})
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

	editToggle = (event:any) => {
		if(!this.edit) {
			this.edit = true;
			this.editId = event.srcElement.id;
			console.log(this.editId, 'toggle')
			console.log(this.subtasks);
			let subtask = this.subtasks.forEach((subtask:any) => {
				if(subtask.id == this.editId) {
					this.subtaskModel.name = subtask.name;
					this.subtaskModel.members = subtask.members;
					this.subtaskModel.estimatedHours = subtask['estimated hours'];
				}
			});
		} else {
			this.edit = false;
			this.editId = null;
			this.subtaskModel.name = '';
			this.subtaskModel.members = '';
			this.subtaskModel.estimatedHours = 0;
		}

	}

	onSubmit = () => {
		if(this.edit) {
			console.log(this.edit, this.editId, 'editid')
			this.http.updateSubtask(this.userId, this.todoId, this.editId, this.subtaskModel.name, this.subtaskModel.members, this.subtaskModel.estimatedHours).subscribe((data:any) => {
				this.subtasks = this.subtasks.filter((subtask:any) => subtask.id != this.editId);
				console.log(data)
				this.subtasks.push(data.subtask);
				this.edit = false;
				this.editId = null;
			})
		} else {
			if(this.subtaskModel.name) {
				console.log(this.todoId, this.userId, 'todo,user')
				this.http.createSubtask(this.userId, this.todoId, this.subtaskModel.name, this.subtaskModel.members, this.subtaskModel.estimatedHours).subscribe((data:any) => {
					this.subtasks.push(data);
					this.totalHours += data['estimated hours'];
				})
			}
		}
		this.subtaskModel.name = '';
		this.subtaskModel.members = '';
		this.subtaskModel.estimatedHours = 0;
	}

}
