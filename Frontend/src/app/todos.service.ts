import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private _obj:HttpClient) { }
	apiUrl = 'http://127.0.0.1:8000'

	getTodos(){
		// return this._obj.get(`${this.apiUrl}/api/todos`)
		return this._obj.get('http://127.0.0.1:8000/api/todos')
	}
}
