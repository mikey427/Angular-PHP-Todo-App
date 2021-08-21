import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http: HttpClient) {
	 }
	apiUrl = 'http://127.0.0.1:8000/api'

	getTodos(){
		// return this._obj.get(`${this.apiUrl}/api/todos`)
		return this.http.get(`${this.apiUrl}/todos`);
	};

	updateTodoStatus(id:number, value:boolean){
		return this.http.put(`${this.apiUrl}/todos/${id}/status`, value)
	};

	updateTodoName(id:number, name:string){
		return this.http.put(`${this.apiUrl}/todos/${id}`, name)
	};

	createTodo(name:string){
		return this.http.post(`${this.apiUrl}/todos`, name);
	}

	deleteTodo(id:number){
		return this.http.delete(`${this.apiUrl}/todos/${id}`);
	}
}
