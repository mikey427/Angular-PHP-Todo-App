<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;
use App\Models\Todo;
use App\Models\Subtask;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

///////// TODO API

// Gets all projects for a user
Route::get('/users/{id}/todos', function(Request $request, $id) {
	$todos = Todo::where('userId', '=', $id)->get();
	$response = ['todos' => $todos];
	return response()->json($response, 200);
});

// Changes the isDone status for a project (checkbox)
Route::put('/users/{id1}/todos/{id2}/status', function(Request $request, $id, $id2) {
	$todo = Todo::find($id2);
	if(!$todo) {
		return response()->json(['message' => 'Todo not found'], 404);
	};
	$todo->isDone = $request[0];
	$todo->save();
	return response()->json(['todo' => $todo], 200);
});
// Editing an existing project
Route::put('/users/{id}/todos/{id2}', function(Request $request, $id, $id2){
	$todo = Todo::find($id2);
	if(!$todo) {
		return response()->json(['message' => 'Todo not found'], 404);
	}
		$todo->name = $request->input('name');
		$todo->members = $request->input('members');
		$todo->{'estimated hours'} = $request->input('hours');
	$todo->save();
	return response()->json(['todo' => $todo], 200);
});

// Creating an existing project
Route::post('/users/{id}/todos', function(Request $request, $id) {
	$name = $request->input('name');
	$members = $request->input('members');
	$hours = $request->input('hours');
	return Todo::create([
		'name' => $name,
		'userId' => $id,
		'isDone' => false,
		'members' => $members,
		'estimated hours' => $hours
	]);
});

// Delete a project and all related tasks
Route::delete('/users/{id}/todos/{id2}', function(Request $request, $id, $id2){
	$todo = Todo::find($id2);
		if(!$todo) {
			return response()->json(['message' => 'Todo not found'], 404);
		} else {
			$todo->delete();
			Subtask::where('todoId', '=', $id2)->delete();
			return response()->json(['message' => 'Todo deleted'], 200);
		}
});

///////// SUBTASK API

// Gets all tasks for a given project
Route::get('/users/{id}/todos/{id2}', function(Request $request, $id, $id2) {
	$subtasks = Subtask::where('todoId', '=', $id2)->get();
	$response = ['subtasks' => $subtasks];
	return response()->json($response, 200);
});

// Changes the isDone attribute of a given subtask (checkbox)
Route::put('/users/{id}/todos/{id2}/{id3}/status', function(Request $request, $id, $id2, $id3){
	$subtask = Subtask::find($id3);
	if(!$subtask) {
		return response()->json(['message' => 'Subtask not found'], 404);
	}
		$subtask->isDone = $request[0];
		$subtask->save();
		return response()->json(['subtask' => $subtask], 200);
});

// Edit an existing task
Route::put('/users/{id}/todos/{id2}/{id3}', function(Request $request, $id, $id2, $id3){
	$subtask = Subtask::find($id3);
	if(!$subtask) {
		return response()->json(['message' => 'Subtask not found'], 404);
	}
		$subtask->name = $request->input('name');
		$subtask->members = $request->input('members');
		$subtask->{'estimated hours'} = $request->input('hours');
	$subtask->save();
	return response()->json(['subtask' => $subtask], 200);
});

// Creates a new task for a given project
Route::post('/users/{id}/todos/{id2}', function(Request $request, $id, $id2) {
	$name = $request->input('name');
	$members = $request->input('members');
	$hours = $request->input('hours');
	return Subtask::create([
		'name' => $name,
		'todoId' => $id2,
		'isDone' => false,
		'members' => $members,
		'estimated hours' => $hours
	]);
});

// Deletes a given task
Route::delete('/users/{id}/todos/{id2}/{id3}', function(Request $request, $id, $id2, $id3) {
	$subtask = Subtask::find($id3);
	$subtask->delete();
	return response()->json(['message' => 'Subtask deleted'], 200);
});

///////// Users API

// Retrieves the user tied to the name entered at login screen
Route::get('/users', function(Request $request) {
	$user = User::where('name', '=', $request->input('name'))->get();
	$response = ['user' => $user];
	return response()->json($response, 200);
});

// Modify a user's name *NOT IMPLEMENTED*
Route::put('/users/{id}', function(Request $request, $id) {
	$user = User::find($id);
	$user->name = $request->input('name');
	$user->save();
	return response()->json(['user' => $user], 200);
});

// Create a new user
Route::post('/users', function(Request $request){
	$name = file_get_contents('php://input');
	return User::create([
		'name' => $name
	]);
});

// Deletes a given user *NOT IMPLEMENTED*
Route::delete('/users/{id}', function(Request $request, $id){
	$user = User::find($id);$user->delete();
	return response()->json(['message' => 'User deleted'], 200);
});
