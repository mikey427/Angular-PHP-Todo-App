import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http: HttpClient) {
	 }
	apiUrl = 'http://127.0.0.1:8000/api'

	getTodos(id:number){
		// return this._obj.get(`${this.apiUrl}/api/todos`)
		return this.http.get(`${this.apiUrl}/users/${id}/todos`);
	};

	updateTodoStatus(id:number, id2:number, value:boolean){
		return this.http.put(`${this.apiUrl}/users/${id}/todos/${id2}/status`, value)
	};

	updateTodoName(id:number, id2:number, name:string){
		return this.http.put(`${this.apiUrl}/users/${id}/todos/${id2}`, name)
	};

	createTodo(id:number, name:string, members:string, hours:number){
		return this.http.post(`${this.apiUrl}/users/${id}/todos`, {'name': name, 'members':members, 'hours':hours})
	};

	deleteTodo(id:number, id2:number){
		return this.http.delete(`${this.apiUrl}/users/${id}/todos/${id2}`);
	}
}
