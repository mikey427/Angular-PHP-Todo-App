import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubtasksComponent } from './subtasks/subtasks.component';
import { TodosComponent } from './todos/todos.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    SubtasksComponent,
    TodosComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
		HttpClientModule,
		FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
