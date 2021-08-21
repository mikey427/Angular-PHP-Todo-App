import { Component, OnInit} from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodosService } from '../todos.service'
@Component({
  selector: 'app-home',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})


export class TodosComponent implements OnInit {

  constructor(private _obj:TodosService) {
		_obj.getTodos().subscribe((todos: any) => {
			this.data = todos;
		})
	 }
	data = {};
	ngOnInit(): void {
	}
}
