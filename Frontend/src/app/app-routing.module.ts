import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { SubtasksComponent } from './subtasks/subtasks.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
	{ path: 'users', component: UsersComponent },
	{ path: 'users/:id', component: TodosComponent },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
	{ path: 'todos/:id', component: SubtasksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
