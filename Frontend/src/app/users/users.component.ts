import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User, CreateUser } from './user'
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private http: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

	// Models for forms
	userModel = new User('');
	newUserModel = new CreateUser('');

	// Gets a user tied to username entered and navigates to project page
	onSubmit = () => {
		if(this.userModel.name) {
			this.http.getUser(this.userModel.name).subscribe((data:any) => {
				console.log(data, 'data');
				this.router.navigate([`/users/${data.user[0].id}`, {name: data.user[0].name}])
			})
		}
	}

	// Creates a user with the entered username and naviagtes to project page
	createUser = () => {
		if(this.newUserModel.name) {
			console.log(this.newUserModel.name)
			this.http.createUser(this.newUserModel.name).subscribe((data:any) => {
				this.router.navigate([`/users/${data.id}`, {name:data.name}]);
			})
		}
	}
}
