import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { SubtasksComponent } from './subtasks/subtasks.component';

const routes: Routes = [
	{ path: 'todos', component: TodosComponent },
  { path: '', redirectTo: 'todos', pathMatch: 'full' },
	{ path: 'test', component: SubtasksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
