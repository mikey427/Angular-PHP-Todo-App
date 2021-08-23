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

Route::get('/users/{id}/todos', function(Request $request, $id) {
	$todos = Todo::where('userId', '=', $id)->get();
	$response = ['todos' => $todos];
	return response()->json($response, 200);
});


Route::put('/users/{id1}/todos/{id2}/status', function(Request $request, $id, $id2) {
	$todo = Todo::find($id2);
	if(!$todo) {
		return response()->json(['message' => 'Todo not found'], 404);
	};
	$todo->isDone = $request[0];
	$todo->save();
	return response()->json(['todo' => $todo], 200);
});

Route::post('/users/{id}/todos', function(Request $request, $id) {
	$name = $request->input('name');
	$members = $request->input('members');
	$hours = $request->input('hours');
	// $name = file_get_contents('php://input');
	return Todo::create([
		'name' => $name,
		'userId' => $id,
		'isDone' => false,
		'members' => $members,
		'estimated hours' => $hours
	]);
	// return response()->json(['request', $members], 200);
});

// Route::post('/users/{id}/todos', function(Request $request, $id) {
// 		$name = file_get_contents('php://input');
// 		// $name = $request->input('name');
// 		return Todo::create([
// 			'name' => $name,
// 			'userId' => (int)$id
// 		]);
// 		// return response()->json(['id' => $name], 200);
// });


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

Route::get('/users/{id}/todos/{id2}', function(Request $request, $id, $id2) {
	$subtasks = Subtask::where('todoId', '=', $id2)->get();
	$response = ['subtasks' => $subtasks];
	return response()->json($response, 200);
});


Route::put('/users/{id}/todos/{id2}/{id3}', function(Request $request, $id, $id2, $id3){
	$subtask = Subtask::find($id3);
	if(!$subtask) {
		return response()->json(['message' => 'Subtask not found'], 404);
	}
		$subtask->isDone = $request[0];
		$subtask->save();
		return response()->json(['subtask' => $subtask], 200);
});


Route::post('/users/{id}/todos/{id2}', function(Request $request, $id, $id2) {
	// $name = file_get_contents('php://input');
	// return Subtask::create([
	// 	'name' => $name,
	// 	'todoId' => $id2,
	// 	'isDone' => false
	// ]);
	$name = $request->input('name');
	$members = $request->input('members');
	$hours = $request->input('hours');
	// $name = file_get_contents('php://input');
	return Subtask::create([
		'name' => $name,
		'todoId' => $id2,
		'isDone' => false,
		'members' => $members,
		'estimated hours' => $hours
	]);
});


Route::delete('/users/{id}/todos/{id2}/{id3}', function(Request $request, $id, $id2, $id3) {
	$subtask = Subtask::find($id3);
	$subtask->delete();
	return response()->json(['message' => 'Subtask deleted'], 200);
});

///////// Users API

Route::get('/users', function(Request $request) {
	// $name = file_get_contents('php://input');
	$user = User::where('name', '=', $request->input('name'))->get();
	$response = ['user' => $user];
	return response()->json($response, 200);
});

Route::put('/users/{id}', function(Request $request, $id) {
	$user = User::find($id);
	// $user-> $request[0];
	$user->name = $request->input('name');
	$user->save();
	return response()->json(['user' => $user], 200);
});

Route::post('/users', function(Request $request){
	$name = file_get_contents('php://input');
	// $name = $request->input('name');
	return User::create([
		'name' => $name
	]);
});

Route::delete('/users/{id}', function(Request $request, $id){
	$user = User::find($id);$user->delete();
	return response()->json(['message' => 'User deleted'], 200);
});
