import { Component, OnInit } from '@angular/core';
import { SubtasksService } from '../subtasks.service';
import { Subtask } from './subtasks'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subtasks',
  templateUrl: './subtasks.component.html',
  styleUrls: ['./subtasks.component.css']
})
export class SubtasksComponent implements OnInit {

  constructor(private http: SubtasksService,
		 private route: ActivatedRoute) { }

	subtaskModel = new Subtask('');

	todoId:any;
	todoName:any;
	subtasks:any;
  ngOnInit(): void {
		const id = parseInt(this.route.snapshot.paramMap.get('id')!.toString(), 10);
		this.todoId = id
		const todoName = this.route.snapshot.paramMap.get('name');
		this.todoName = todoName;
		console.log(this.todoName, 'todoname')
		this.http.getSubtasks(this.todoId).subscribe((data: any) => {
			this.subtasks = data.subtasks;
			console.log(this.subtasks);
		})
  }

	checkboxClick = (event:any) => {
		console.log(event)
		this.http.updateSubtaskStatus(this.todoId, event.srcElement.id, event.srcElement.checked).subscribe();
	}

	deleteSubtask = (event:any) => {
		this.http.deleteSubtask(this.todoId, event.srcElement.id).subscribe(
			this.subtasks = this.subtasks.filter((subtask:any) => subtask.id != event.srcElement.id)
		);
	}

	onSubmit = () => {
		if(this.subtaskModel.name) {
			this.http.createSubtask(this.todoId, this.subtaskModel.name).subscribe(data => {
				this.subtasks.push(data);
			})
			this.subtaskModel.name = '';
		}
	}

}
