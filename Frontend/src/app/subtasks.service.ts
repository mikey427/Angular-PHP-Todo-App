import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubtasksService {

  constructor(private http: HttpClient) {
	}
 	apiUrl = 'http://127.0.0.1:8000/api'

	 getSubtasks(id:number, id2:number){
		 return this.http.get(`${this.apiUrl}/users/${id}/todos/${id2}`);
	 };

	 updateSubtaskStatus(id:number, id2:number, id3:number, value:boolean){
		return this.http.put(`${this.apiUrl}/users/${id}/todos/${id2}/${id3}`, value);
	 };

	 createSubtask(id:number, id2:number, name:string){
		return this.http.post(`${this.apiUrl}/users/${id}/todos/${id2}`, name);
	 };

	 deleteSubtask(id:number, id2:number, id3:number){
		return this.http.delete(`${this.apiUrl}/users/${id}/todos/${id2}/${id3}`);
	 };



}
