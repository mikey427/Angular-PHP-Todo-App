import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

	apiUrl = 'http://127.0.0.1:8000/api';

	getUser(name:string) {
		return this.http.get(`${this.apiUrl}/users`, {params: {name:name}});
	};

	updateUserName(id:number, name:string) {
		return this.http.put(`${this.apiUrl}/users/${id}`, name)
	};

	createUser(name:string) {
		return this.http.post(`${this.apiUrl}/users/`, name)
	};

	deleteUser(id:number) {
		return this.http.delete(`${this.apiUrl}/users/${id}`)
	};
}
