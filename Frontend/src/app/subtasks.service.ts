import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubtasksService {

  constructor(private http: HttpClient) {
	}
 	apiUrl = 'http://127.0.0.1:8000/api'

	 getSubtasks(id:number){
		 return this.http.get(`${this.apiUrl}/todos/${id}`);
	 };

	 updateSubtaskStatus(id:number, id2:number, value:boolean){
		return this.http.put(`${this.apiUrl}/todos/${id}/${id2}`, value);
	 };

	 createSubtask(id:number, name:string){
		return this.http.post(`${this.apiUrl}/todos/${id}`, name);
	 };

	 deleteSubtask(id:number, id2:number){
		return this.http.delete(`${this.apiUrl}/todos/${id}/${id2}`);
	 };



}
