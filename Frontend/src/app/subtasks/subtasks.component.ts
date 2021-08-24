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

	// Local data
	todoId:any;
	userName:any;
	userId:any;
	todoName:any;
	totalHours:any;
	subtasks:any;
	edit:boolean = false;
	editId:any;
	subtasksTemp:any;

  ngOnInit(): void {

		// Storing data passed through navigation, locally
		const id = parseInt(this.route.snapshot.paramMap.get('id')!.toString(), 10);
		this.todoId = id
		const todoName = this.route.snapshot.paramMap.get('name');
		const userId = parseInt(this.route.snapshot.paramMap.get('userId')!.toString(), 10);
		const username = this.route.snapshot.paramMap.get('userName');
		this.userName = username;
		this.todoName = todoName;
		this.userId = userId;

		// Getting all tasks for a given project
		this.http.getSubtasks(this.userId, this.todoId).subscribe((data: any) => {
			this.subtasks = data.subtasks;
			this.totalHours = 0;
			data.subtasks.forEach((task:any) => {
				this.totalHours += task['estimated hours'];
			})
		})
  }

	// Updates the isDone property of a task (checkbox)
	checkboxClick = (event:any) => {
		this.http.updateSubtaskStatus(this.userId, this.todoId, event.srcElement.id, event.srcElement.checked).subscribe();
	}

	// Deletes a given task and filters it out of local storage for render
	deleteSubtask =(event:any) => {
		let delHours;
		this.http.deleteSubtask(this.userId, this.todoId, event.srcElement.id).subscribe( (data:any) => {
			this.subtasks = this.subtasks.filter((task:any) => task.id != event.srcElement.id);
			this.totalHours = 0;
			this.subtasks.forEach((task:any) => {
			this.totalHours += task['estimated hours'];
		})
		});

	}

	// Goes back to project page of current user
	goBack = () => {
		this.router.navigate([`/users/${this.userId}`, {name: this.userName}]);
	}

	// Toggles the edit state and modifies the form accordingly
	editToggle = (event:any) => {
		if(!this.edit) {
			this.edit = true;
			this.editId = event.srcElement.id;
			let subtask = this.subtasks.forEach((subtask:any) => {
				if(subtask.id == this.editId) {
					this.subtaskModel.name = subtask.name;
					this.subtaskModel.members = subtask.members;
					this.subtaskModel.estimatedHours = subtask['estimated hours'];
					this.totalHours -= this.subtaskModel.estimatedHours;
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

	// Creates or modifies existing task based on this.edit state
	onSubmit = () => {
		if(this.edit) {
			this.http.updateSubtask(this.userId, this.todoId, this.editId, this.subtaskModel.name, this.subtaskModel.members, this.subtaskModel.estimatedHours).subscribe((data:any) => {
				this.subtasks = this.subtasks.filter((subtask:any) => subtask.id != this.editId);
				this.subtasks.push(data.subtask);
				this.edit = false;
				this.editId = null;
				this.totalHours += data.subtask['estimated hours'];
			})
		} else {
			if(this.subtaskModel.name) {
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
