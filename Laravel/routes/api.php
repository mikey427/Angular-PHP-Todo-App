<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;
use App\Models\Todo;
use App\Models\Subtask;

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


Route::get('/todos', function() {
	$todos = Todo::all();
	$response = ['todos' => $todos];
	return response()->json($response, 200);
});

Route::post('/todos', function(Request $request) {
		$name = $request->input('name');
		return Todo::create([
			'name' => $name,
			'isDone' => false
		]);
});

Route::put('/todos/{id}', function(Request $request, $id) {
	$todo = Todo::find($id);
		if(!$todo) {
			return response()->json(['message' => 'Todo not found'], 404);
		};
		$todo->name = $request->input('name');
		$todo->save();
		return response()->json(['todo' => $todo], 200);
});

Route::get('/todos/{id}', function(Request $request, $id) {
	$subtasks = Subtask::where('todoId', '=', $id)->get();
	$response = ['subtasks' => $subtasks];
	return response()->json($response, 200);
});

Route::post('/todos/{id}', function(Request $request, $id) {
	$name = $request->input('name');
		return Subtask::create([
			'name' => $name,
			'todoId' => $id,
			'isDone' => false
		]);
});

Route::put('/todos/{id}/{id2}', function(Request $request, $id, $id2){
	$subtask = Subtask::find($id2);
		$subtask->name = $request->input('name');
		$subtask->save();
		return response()->json(['subtask' => $subtask], 200);
});

Route::delete('/todos/{id}', function($id){
	$todo = Todo::find($id);
		if(!$todo) {
			return response()->json(['message' => 'Todo not found'], 404);
		};
		$todo->delete();
		return response()->json(['message' => 'Todo deleted'], 200);
	}
);

Route::delete('/todos/{id}/{id2}', function($id, $id2) {
	$subtask = Subtask::find($id2);
	$subtask->delete();
	return response()->json(['message' => 'Subtask deleted'], 200);
});
